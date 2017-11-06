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
    return {
        listToArray: listToArray,
        toJSON: toJSON,
        offset:offset,
        getCss:getCss,
        win:win,
        rnd:rnd
    }

})()
