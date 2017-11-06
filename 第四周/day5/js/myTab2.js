function MyTab() {
    //�����е�Ԫ�����ó�˽��,���еķ������óɹ��е�,��ʼ������init()���ڹ��캯����ִ��
    this.$bannerBox = $("#bannerBox");
    this.$oUl = this.$bannerBox.children("ul");
    this.$oLis = null;//jquery�в�����ӳ���ϵ
    this.$oImgs = null;
    this.$bannerTip = $('.bannerTip');
    this.$tipAs = null;
    this.$btnLeft = $(".btnLeft");
    this.$btnRight = $(".btnRight");
    this.resData = null;
    this.step = 0;
    this.autoTimer = null;
    this.init();
}
MyTab.prototype = {
    constructor: MyTab,
    init: function () {
        //1.��ȡ����
        this.getData();
        //2.������
        this.bindData();
        //3.�ӳټ���
        this.showImg();
        //4.�Զ��ֲ�
        var _this = this;
        this.autoTimer = window.setInterval(function () {
            _this.autoMove()
        }, 2000);

        //5.ֹͣ�������ֲ�ͼ
        this.overOut();

        //6.��������л�
        this.clickTip();

        //7.�����л�
        this.handleChange()

    },
    getData: function () {
        var _this = this;
        $.ajax({
            type: "get",
            url: "json/banner.json",
            async: false,
            dataType: "json",
            success: function (res) {
                _this.resData = res;
            }
        });
    },
    bindData: function () {
        var strLi = "";
        var strTip = "";
        $.each(this.resData, function (index, item) {
            strLi += "<li>";
            strLi += "<img src='' realImg = '" + item.img + "'>";
            strLi += "</li>";
            strTip += index == 0 ? "<a href='javascript:void(0)' class='bg'></a>" : "<a href='javascript:void(0)' ></a>"
        });
        this.$oUl.html(strLi);
        this.$bannerTip.html(strTip);
    },
    showImg: function () {
        this.$oLis = this.$oUl.children("li");
        this.$oImgs = this.$oUl.find("img");
        this.$oImgs.each(function (index, item) {
            var tempImg = new Image();
            tempImg.src = $(item).attr("realImg");
            tempImg.onload = function () {
                item.src = this.src;
                if (index == 0) {
                    $(item).parent().css("zIndex", 1);
                    $(item).animate({opacity: 1}, 1000);
                }
            }
        })
    },
    autoMove: function () {
        this.step++;
        if (this.step == this.$oLis.length) {
            this.step = 0;
        }
        this.setBanner();
    },
    setBanner: function () {
        //�õ�ǰbanner��li ->z-index:1 ������banner->z-index:0
        //�õ�ǰbanner��img->opacity:1,����ͼƬ��ʾ��֮��,��������ͼƬ��opacityΪ0
        var _this = this;
        this.$oLis.each(function (index, item) {
            if (_this.step == index) {
                $(item).css("zIndex", 1).siblings("li").css("zIndex", 0);
                $(item).children("img").animate({opacity: 1}, 1000, function () {
                    $(this).parent().siblings("li").children("img").css("opacity", 0);
                })
            }
        });
        this.changeTip();
    },
    changeTip: function () {
        var _this = this;
        this.$tipAs = this.$bannerTip.children("a");
        this.$tipAs.each(function (index, item) {
            _this.step == index ? $(item).addClass("bg") : $(item).removeClass("bg");
        })
    },
    overOut:function(){
        var _this = this;
        this.$bannerBox.on("mouseover",function(){
            clearInterval(_this.autoTimer);
            _this.$btnLeft.show();
            _this.$btnRight.show();
        });
        this.$bannerBox.on("mouseout",function(){
            _this.autoTimer = window.setInterval(function(){
                _this.autoMove();
            },2000);
            _this.$btnLeft.hide();
            _this.$btnRight.hide();
        })
    },
    clickTip:function(){
        var _this  = this;
        this.$tipAs = this.$bannerTip.children("a");
        this.$tipAs.on("click",function(){
            var index = $(this).index();//��ǰ���Ԫ�ص�����
            _this.step = index;
            _this.setBanner();
        })
    },
    handleChange : function(){
        var _this = this;
        this.$btnRight.on("click",function(){
            _this.autoMove();
        });
        this.$btnLeft.on("click",function(){
            _this.step--;
            if(_this.step<0){
                _this.step = _this.$oLis.length-1;
            }
            _this.setBanner();
        })
    }
};
