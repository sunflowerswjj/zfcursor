(function(){
    //1.��ȡ����
    var resData = null;
    var xhr = new XMLHttpRequest();
    xhr.open('get',"json/banner.json",false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
            resData=utils.toJSON(xhr.responseText);
        }

    }
    xhr.send(null);

    //��ȡ����
    var oBanner = document.getElementById("bannerBox");
    var oUl = utils.children(oBanner,"ul")[0];
    var oLis = oUl.getElementsByTagName("li");
    var oImgs = oUl.getElementsByTagName("img");
    var bannerTip = utils.children(oBanner,"div")[0];
    var tipAs = bannerTip.getElementsByTagName("a");
    var btnLeft = utils.getByClass("btnLeft",oBanner)[0];
    var btnRight = utils.getByClass("btnRight",oBanner)[0];

    //2.������
    var strLi = "";
    var strTip = "";
    for(var i = 0;i<resData.length;i++){
        strLi+="<li>";
        strLi+="<img src='' realImg='"+resData[i].img+"'>";
        strLi+="</li>" ;
        strTip+= i==0?"<a href='javascript:void(0)' class='bg'></a>":"<a href='javascript:void(0)'></a>"
    }
    oUl.innerHTML = strLi;
    bannerTip.innerHTML = strTip;

    //�ӳټ���
    //�ı�ͼƬ��͸���Ⱥ�li�Ĳ㼶��ϵ
    window.setTimeout(showImg,1000);
    function showImg(){
        for(var i = 0;i<oImgs.length;i++){
            ~(function(i){
                var oImg = oImgs[i];
                var tempImg = new Image();
                tempImg.src = oImg.getAttribute("realImg");
                tempImg.onload = function(){
                    oImg.src = this.src;
                    if(i==0){
                        utils.css(oImg.parentNode,"z-index",1)
                        animate(oImg,{opacity:1},1000);
                    }

                }
            })(i)
        }
    }

    //�Զ��ֲ�
    var step = -1,autoTimer = null;
    autoTimer = window.setInterval(autoMove,2000);
    function autoMove(){
        step++;
        if(step==oLis.length){
            step = 0;
        }
        setBanner();
    }

    function setBanner(){
        //�õ�ǰli��z-indexֵ���1,������z-index���0,��ǰ��img͸������0-1,����img��͸���ȱ��0
        for(var i = 0;i<oLis.length;i++){
            ~(function(i){//�ж�ʱ�����첽��,����ÿ��ѭ��Ҳ�ô������հ�
                var oLi = oLis[i];
                if(step ==i){//��ǰ��ʾ��banner
                    utils.css(oLi,"z-index",1);
                    animate(oImgs[i],
                        {opacity:1},
                        500,function(){
                            //���������е�ͼƬ͸���ȱ��0
                            var sLis = utils.siblings(oLi);
                            for(var k = 0;k<sLis.length;k++){
                                var oImg = utils.children(sLis[k],"img")[0];
                                utils.css(oImg,"opacity",0);
                            }
                        });
                }else{
                    utils.css(oLi,"z-index",0);
                }
            })(i)
        }
        changeTip();
    }

    function changeTip(){
        for(var i = 0;i<tipAs.length;i++){
            step==i?utils.addClass(tipAs[i],"bg"):utils.removeClass(tipAs[i],"bg");
        }
    }

    //ֹͣ��������ʱ��
    oBanner.onmouseover = function(){
        window.clearInterval(autoTimer);
        btnLeft.style.display = btnRight.style.display = "block";
    }
    oBanner.onmouseout = function(){
        autoTimer = window.setInterval(autoMove,2000);
        btnLeft.style.display = btnRight.style.display = "none";
    }

    //��������л�banner
    for(var i = 0;i<tipAs.length;i++){
        tipAs[i].index = i;
        tipAs[i].onclick = function(){
            step = this.index;//��ǰ�������������step,bannerҪ�л�������step�����banner
            setBanner();
        }
    }
    //������Ҽ�ͷ�л�
    btnLeft.onclick =function(){
        step--;
        if(step<0){
            step = oLis.length-1;
        }
        setBanner();
    };
    btnRight.onclick = autoMove;
})();
