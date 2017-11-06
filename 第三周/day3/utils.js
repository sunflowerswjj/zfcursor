var utils = (function(){
    /**
     *
     * @param likeAry  ������
     * @returns {Array} ����
     */
    function listToArray(likeAry){
        var ary = [];
        try{
            ary = [].slice.call(likeAry);
        }catch(e){
            for(var i = 0;i<likeAry.length;i++){
               ary[ary.length]=likeAry[i];
            }
        }
        return ary;
    }

    /**
     *
     * @param str JSON��ʽ���ַ���
     * @returns {Object}  JSON��ʽ�Ķ���
     */
    function toJSON(str){
       return "JSON" in window?JSON.parse(str) :eval("("+str+")");
    }

    /**
     *
     * @param ele  ��ǰԪ��
     * @returns {{l:l,t:t}} ����body����ƫ�ƺ;���body����ƫ��
     */
    function offset(ele){
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var p = ele.offsetParent;
        while(p!=document.body&&p){//1.ele����body 2.p������body
          //p��ǩ�����Ĳ������ƫ��
            if(navigator.userAgent.indexOf("MSIE 8.0")==-1){
                l+= p.clientLeft;
                t+= p.clientTop;
            }
            l+= p.offsetLeft;
            t+= p.offsetTop;
            p = p.offsetParent;
        }
        return {
            l:l,t:t
        }
    }

    /**
     *
     * @param ele ��ǰԪ��
     * @param attr css����
     * @returns  css����ֵ
     */
    function getCss(ele,attr){
        var res = null;
        if(typeof getComputedStyle =="function"){
            res = window.getComputedStyle(ele,null)[attr];
        }else{
            if(attr=="opacity"){
                res = ele.currentStyle.filter;
                var reg = /^alpha\(opacity\s*=\s*(\d+(?:\.\d+)?)\)$/;
                res = reg.test(res) ? RegExp.$1/100 : 1;

            }else{
                res =  ele.currentStyle[attr];
            }
        }
        var reg = /^[+-]?(?:\d+(?:\.\d+)?)(?:px|pt|rem|em)?$/i;
        return  reg.test(res)?parseFloat(res):res;
    }

    /**
     *
     * @param attr  10������
     * @param value ����scrollLeft��scrollTopֵ
     *
     */
    function win(attr,value){
        if(typeof  value =="undefined"){
            //�ڶ�������û���ͻ�ȡ��ֵ
            return document.documentElement[attr]||document.body[attr]
        }else{
            //�ڶ���������,����Ҫ����
            document.documentElement[attr] =value;
            document.body[attr] = value;
        }
    }
    return {
        listToArray:listToArray,
        toJSON:toJSON,
        getCss:getCss,
        offset:offset,
        win:win
    }
})()
