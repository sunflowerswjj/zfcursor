var utils = (function () {
    /**
     * ������ת��������
     * @param likeAry
     */
    function listToArray(likeAry) {
        var ary = [];
        try {
            ary = [].slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    /**
     * ��JSON��ʽ���ַ���ת����JSON��ʽ�Ķ���
     * @param str JSON��ʽ���ַ���
     */
    function toJSON(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")")
    }

    /**
     * ��ȡĳ��Ԫ�ص�body����ƫ�ƺ���ƫ��
     * @param ele ��ǰ��Ԫ��
     */
    function offset(ele) {
        var l = ele.offsetLeft;//ƫ�Ƶľ���:ele����߿򵽲�������ڱ߿�
        var t = ele.offsetTop;
        var p = ele.offsetParent;
        while (p != document.body && p) {//��ele.offsetParent��body���˳�while ,����ele����bodyҲ���˳�while
            if (!/MSIE 8\.0/.test(navigator.userAgent)) {
                //����ie8�ðѲ�����ı߿��ۼ�����
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;

        }

        return {
            l: l,
            t: t
        }
    }

    /**
     * ��ȡ����css��ʽ
     * @param ele ��ǰԪ��
     * @param attr css����
     */
    function getCss(ele,attr){
        var res = null;
        if(typeof getComputedStyle =="function"){
            res = window.getComputedStyle(ele,null)[attr];
        }else{
            //opacity:0.5;
            //filter:alpha(opacity = 50);
            if(attr =="opacity"){
                res = ele.currentStyle.filter;//"alpha(opacity = 50)"
                var reg = /^alpha\(opacity\s*=\s*(\d+(?:\.\d+)?)\)$/;
                //reg.exec(res)[1] RegExp.$1
                res = reg.test(res)?RegExp.$1/100:1;
            }else{
                res = ele.currentStyle[attr];
            }
        }
        //1.�Ե�λ�Ĵ���
        //����ȡֵ��->�������ֵ,�ұ��ǵ�λ,��ѵ�λȥ����ת����������
        var reg = /^[+-]?(?:\d+(?:\.\d+)?)(?:px|rem|pt|em)?$/i;
        return reg.test(res)?parseFloat(res):res;
    }

    /**
     *
     * @param ele ��ǰԪ��
     * @param attr css����
     * @param value css����ֵ
     */
    function setCss(ele,attr,value){
         //1.�Ը�������
         if(attr =="float"){
             ele.style.cssFloat = value;
             ele.style.styleFloat = value;
             return;
         }

        //2,��͸���ȴ���
        if(attr =="opacity"){
            ele.style.opacity = value;
            ele.style.filter = "alpha(opacity ="+value*100+")";
            return;
        }

        //3.���õ�λ-��û�����õ�λ����ӵ�λ

        var reg = /^(width|height|((margin|padding)?(right|bottom|top|left)?))$/i;
        if(reg.test(attr)){
            if(!isNaN(value)){
                value +="px";
            }
        }

        ele.style[attr] = value;
    }

    /**
     * ��������css��ʽ
     * @param ele ��ǰԪ��
     * @param opt �������� -ÿһ����css���Ժ�css����ֵ
     */
    function setGroup(ele,opt){
        //�ȼ��opt����������
        if(Object.prototype.toString.call(opt)!="[object Object]") return;
        for(var attr in opt){
            setCss(ele,attr,opt[attr]);
        }
    }

    /**
     *ͨ������ȷ���ǵ����ĸ�����(getCss,setCss,setGroup)
     */
    //function css(){
    //    var arg = arguments;
    //    var argTwo = arg[1];
    //    if(typeof argTwo =="string"){
    //        var argThree = arg[2];
    //        if(typeof argThree =="undefined"){
    //           return getCss(arg[0],argTwo);
    //        }else{
    //            setCss(arg[0],argTwo,argThree);
    //        }
    //    }
    //    if(typeof argTwo =="object"){
    //        setGroup(arg[0],argTwo);
    //    }
    //}
    function css(){
        var arg = arguments,
            fn = getCss;
        if(arg.length==3) fn = setCss;
        if(arg.length==2&&typeof  arg[1]=="object") fn = setGroup;
        return fn.apply(null,arg);
    }



    /**
     * ��ȡclientϵ��,offsetϵ��,scrollϵ�е�ֵ
     * ��ǰ���Ԫ�����ĵ�(body)ĳ������ֵ->document.documentElement[xxx]||document.body[xxx];
     * @param attr ������,����:clientHeight,scrollHeight
     * @param value ����ֵ->scrollLeft��scrollTop  11�������ǿɶ��� ,����������д
     */
    function win(attr,value){
       if(typeof value =="undefined"){
           return document.documentElement[attr]||document.body[attr];
       }else{
           document.documentElement[attr]  = value;
           document.body[attr] = value;
       }
    }

    /**
     * ��ȡĳ������(n-m)֮��������
     * @param n
     * @param m
     */
    function rnd(n,m){
        //1.�Դ������Ĳ���������,����������ֵ
        n = Number(n);
        m = Number(m);
        if(isNaN(n)||isNaN(m)){
            return Math.random();
        }
        //2.��n>m,������������λ��
        if(n>m){
            //var temp = n;
            //n = m;
            //m = temp;
            n = n+m;
            m = n - m;
            n = n - m;
        }
        return Math.round(Math.random()*(m-n)+n);
    }

    /**
     * ͨ����������Ԫ��
     * @param strClass һ����������
     * @param context ������ ��Χ(��ѡ) Ĭ����document
     */

    function getByClass(strClass,context){
	context = context||document;
        if(document.getElementsByClassName){
           return listToArray(context.getElementsByClassName(strClass));
        }
        var eles = context.getElementsByTagName("*");
        var aryClass = strClass.replace(/(^ +)|( +$)/g,"").split(/ +/g);
        for(var i = 0;i<aryClass.length;i++){
            var curClass  = aryClass[i];
            var reg = new RegExp("(^| +)"+curClass+"( +|$)");
            var ary = [];
            for(var k = 0;k<eles.length;k++){
                var ele = eles[k];
                if(reg.test(ele.className)){
                    ary.push(ele);
                }
            }
            eles = ary;//�´��������ϴβ��ҵ���Ԫ���м�������,����ÿ�β�����Ľ���ñ�������
        }
        return eles;

    }

    /**
     *
     * @param ele ��ǰԪ��
     * @param strClass  ��������
     * @return true|false
     */
    function hasClass(ele,strClass){
        var reg = new RegExp("(^| +)"+strClass+"( +|$)");
        return reg.test(ele.className)
    }

    /**
     * �������
     * @param ele  ��ǰ��Ԫ��
     * @param strClass һ��������������
     */
    function addClass(ele,strClass){
       var aryClass =  strClass.replace(/(^\s+|\s+$)/g,"").split(/\s+/g);
        for(var i = 0;i<aryClass.length;i++){
            var curClass =aryClass[i];
            if(!hasClass(ele,curClass)){//��û���������,�����
                ele.className += " "+curClass;
            }
        }
    }

    /**
     * ɾ������
     * @param ele  ��ǰԪ��
     * @param strClass һ��������������
     */
    function removeClass(ele,strClass){
        //���strClass,��ÿ�������õ�
        var aryClass = strClass.replace(/^ +| +$/g,"").split(/ +/g);
        for(var i = 0;i<aryClass.length;i++){
            var curClass =aryClass[i];//ÿ������
            //�ж��Ƿ����������,�����������,����������ɾ��
            var reg = new RegExp("(^| +)"+curClass+"( +|$)","g");
            if(hasClass(ele,curClass)){
                ele.className = ele.className.replace(reg," ");
            }
        }

    }

    /**
     * ��ȡ��ָ���������Ԫ��
     * @param context ������
     * @param tagName ����� (�ַ���)
     */
    function getChildren(context,tagName){
        var eles = context.getElementsByTagName("*");
        var ary = [];
        if(typeof tagName =="string"){
            for(var i = 0;i<eles.length;i++){
                var ele = eles[i];
                if(ele.nodeName.toLowerCase() == tagName.toLowerCase()){
                    ary.push(ele);
                }
            }
        }else{
           for(var i = 0;i<eles.length;i++){
               ary.push(eles[i])
           }
        }
        return ary;
    }

    return {
        listToArray: listToArray,
        toJSON: toJSON,
        offset:offset,
        getCss:getCss,
        win:win,
        rnd:rnd,
        getByClass:getByClass,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        getChildren:getChildren,
        setCss:setCss,
        setGroup:setGroup,
        css:css
    }

})();
