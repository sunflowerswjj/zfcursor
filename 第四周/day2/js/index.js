//1.��ȡ����
var resData = null;
var xhr = new XMLHttpRequest();
xhr.open("get", 'json/banner.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
        resData = utils.toJSON(xhr.responseText)
    }
}
xhr.send(null);

//��ȡԪ��
var bannerBox = document.getElementById('bannerBox');
var bannerUl = utils.children(bannerBox, "ul")[0];
var btnTip = utils.children(bannerBox, "div")[0];
var btnLeft = utils.getByClass("btnLeft", bannerBox)[0];
var btnRight = utils.getByClass("btnRight", bannerBox)[0];
var oLis = bannerUl.getElementsByTagName("li");
var oImgs = bannerUl.getElementsByTagName("img");
var btnAs = btnTip.getElementsByTagName("a");

//2.������
var strLi = "";
var strTip = "";
for (var i = 0; i < resData.length; i++) {
    strLi += "<li>";
    strLi += "<img src ='' realImg='" + resData[i].img + "'>";
    strLi += "</li>";
    strTip += i == 0 ? "<a href='javascript:void(0)' class='bg'></a>" : "<a href='javascript:void(0)' ></a>";
}
strLi += "<li><img src ='' realImg='" + resData[0].img + "'></li>";
bannerUl.innerHTML = strLi;
bannerUl.style.width = oLis.length * oLis[0].offsetWidth + "px";
btnTip.innerHTML = strTip;

//3.�ӳټ���
window.setTimeout(showImg, 1000);
function showImg() {
    for (var i = 0; i < oImgs.length; i++) {
        ~(function (i) {
            var oImg = oImgs[i];
            var tempImg = new Image();
            tempImg.src = oImg.getAttribute("realImg");
            tempImg.onload = function () {
                oImg.src = this.src;
                tempImg = null;
                animate(oImg, {opacity: 1}, 1000);
            }
        })(i)
    }
}

//4.�Զ��ֲ�
var step = 0, autoTimer = null;
function autoMove() {
    step++;
    if (step == oLis.length) {
        bannerUl.style.left = 0;//���۷�
        step = 1;
    }
    animate(bannerUl, {left: -step * 1000}, 1000);
    bannerTip();
}
autoTimer = window.setInterval(autoMove, 2000);

//5����ѡ��Ч��
function bannerTip() {
    var aIndex = step == oLis.length - 1 ? 0 : step;
    for (i = 0; i < btnAs.length; i++) {
        aIndex == i ? utils.addClass(btnAs[i], "bg") : utils.removeClass(btnAs[i], "bg");
    }
}
//6.������ֹͣ�ֲ�ͼ
bannerBox.onmouseover = function(){
    clearInterval(autoTimer);
    btnLeft.style.display = btnRight.style.display ="block";
};
bannerBox.onmouseout = function(){
    autoTimer = setInterval(autoMove,2000);
    btnLeft.style.display = btnRight.style.display ="none";
};

//7.�������ʵ��banner�л�Ч��
for(var  i = 0;i<btnAs.length;i++){
    var oA = btnAs[i];
    oA.index = i;
    oA.onclick = function(){
        step = this.index;
        animate(bannerUl,{left:-step*1000},1000);
        bannerTip();
    }
}

//8.������Ҽ�ͷ,ʵ�������л�
btnRight.onclick  = autoMove; //��һ��
btnLeft.onclick  = function(){//��һ��
    step--;
    if(step<0){
        bannerUl.style.left = -(oLis.length-1)*oLis[0].offsetWidth+"px";
        step=oLis.length-2;
    }
    animate(bannerUl,{left:-step*1000},1000);
    bannerTip();
};







