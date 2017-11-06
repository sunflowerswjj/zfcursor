function MyTab(id,url) {
    //��ȡ��Ԫ�ض���˽�е�,����ʵ�ֵĹ���,������߼�,����ǹ���
    this.bannerBox = document.getElementById(id);
    this.bannerUl = utils.children(this.bannerBox, "ul")[0];
    this.oLis = this.bannerUl.getElementsByTagName("li");
    this.oImgs = this.bannerUl.getElementsByTagName("img");
    this.bannerTip = utils.children(this.bannerBox, "div")[0];
    this.tipAs = this.bannerTip.getElementsByTagName("a");
    this.btnLeft = utils.getByClass("btnLeft", this.bannerBox)[0];
    this.btnRight = utils.getByClass("btnRight", this.bannerBox)[0];
    this.resData = null;
    this.autoTimer  = null;
    this.step = 0;
    this.url = url;
    this.init();//��ʼ������
}
MyTab.prototype = {
    constructor: MyTab,
    init: function () {
        //1.��ȡ����
        this.getData();//ʵ��
        //2.������
        this.bindData();
        //3.�ӳټ���
        var that = this;
        //��ʱ��������������ʱ,�������this�ؼ�����window
        window.setTimeout(function(){that.showImg()},1000);

        //4.�Զ��ֲ�
       this.autoTimer = window.setInterval(function(){that.autoMove()},2000);

        //5.ֹͣ�������ֲ�
        this.overout();

        //6.�������ʵ��banner�л�
        this.changeBanner();

        //7.������Ҽ�ͷ
        this.handleArrow()
    },
    getData: function () {
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.url, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                that.resData = utils.toJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    },
    bindData: function () {
        var strLi = "";
        var strTip = "";
        for (var i = 0; i < this.resData.length; i++) {
            strLi += "<li>";
            strLi += "<img src='' realImg='" + this.resData[i].img + "'>";
            strLi += "</li>";
            strTip += i == 0 ? "<a href='javascript:void(0)' class='bg'></a>" : "<a href='javascript:void(0)'></a>"
        }
        strLi+="<li><img src='' realImg='" + this.resData[0].img + "'></li>"
        this.bannerUl.innerHTML = strLi;
        this.bannerUl.style.width = this.oLis.length*this.oLis[0].offsetWidth+"px";
        this.bannerTip.innerHTML  = strTip;
    },
    showImg: function () {
        var that = this;
        for(var i = 0;i<this.oImgs.length;i++){
            (function(i){
                var oImg = that.oImgs[i];
                var tempImg = new Image();
                tempImg.src = oImg.getAttribute("realImg");
                tempImg.onload = function(){
                    oImg.src = this.src;
                    tempImg = null;
                    animate(oImg,{opacity:1},1000);
                }
            })(i)
        }
    },
    autoMove : function(){
        this.step++;
        if(this.step==this.oLis.length){
            this.bannerUl.style.left = 0;
            this.step = 1;
        }
        animate(this.bannerUl,{left:-this.step*1000},1000);
        this.btnTip();
    },
    btnTip:function(){
        var tempTip = this.step==this.oLis.length-1?0:this.step;
        for(var i = 0;i<this.tipAs.length;i++){
            i==tempTip?utils.addClass(this.tipAs[i],"bg"):utils.removeClass(this.tipAs[i],"bg");
        }
    },
    overout : function(){
        var that = this;
        this.bannerBox.onmouseover = function(){
            clearInterval(that.autoTimer);
            that.btnLeft.style.display = that.btnRight.style.display = "block";
        }
        this.bannerBox.onmouseout = function(){
            that.autoTimer = window.setInterval(function(){that.autoMove()},2000);
            that.btnLeft.style.display = that.btnRight.style.display = "none";
        }

    },
    changeBanner : function(){
        var that  = this;
        for(var i = 0;i<this.tipAs.length;i++){
            var oA = this.tipAs[i];
            oA.index = i;
            oA.onclick = function(){
                that.step = this.index;
                animate(that.bannerUl,{left:-that.step*1000},1000);
                that.btnTip();
            }
        }
    },
    handleArrow:function(){
        var that = this;
        this.btnLeft.onclick = function(){
            that.step--;
            if(that.step<0){
                that.bannerUl.style.left = -(that.oLis.length-1)*that.oLis[0].offsetWidth+"px";
                that.step =that.oLis.length-2;
            }
            animate(that.bannerUl,{left:-that.step*1000},1000);
            that.btnTip();
        };
        this.btnRight.onclick = function(){that.autoMove()};
    }
}
