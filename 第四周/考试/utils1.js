var utils = (function () {
    /**
     * ������ת��������
     * @param likeAry
     */
    function listToArray(likeAry) {

    }

    /**
     * ��JSON��ʽ���ַ���ת����JSON��ʽ�Ķ���
     * @param str JSON��ʽ���ַ���
     */
    function toJSON(str) {

    }

    /**
     * ��ȡĳ��Ԫ�ص�body����ƫ�ƺ���ƫ��
     * @param ele ��ǰ��Ԫ��
     */
    function offset(ele) {

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

            if(attr =="opacity"){
                res = ele.currentStyle.filter;//"alpha(opacity = 50)"
                var reg = /^alpha\(opacity\s*=\s*(\d+(?:\.\d+)?)\)$/;
                res = reg.test(res)?RegExp.$1/100:1;
            }else{
                res = ele.currentStyle[attr];
            }
        }

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

    }

    /**
     * ��������css��ʽ
     * @param ele ��ǰԪ��
     * @param opt �������� -ÿһ����css���Ժ�css����ֵ
     */
    function setGroup(ele,opt){

    }

    /**
     *ͨ������ȷ���ǵ����ĸ�����(getCss,setCss,setGroup)
     */

    function css(){

    }



    /**
     * ��ȡclientϵ��,offsetϵ��,scrollϵ�е�ֵ
     * ��ǰ���Ԫ�����ĵ�(body)ĳ������ֵ->document.documentElement[xxx]||document.body[xxx];
     * @param attr ������,����:clientHeight,scrollHeight
     * @param value ����ֵ->scrollLeft��scrollTop  11�������ǿɶ��� ,����������д
     */
    function win(attr,value){

    }

    /**
     * ��ȡĳ������(n-m)֮��������
     * @param n
     * @param m
     */
    function rnd(n,m){

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
            eles = ary;
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

    }

    /**
     * �������
     * @param ele  ��ǰ��Ԫ��
     * @param strClass һ��������������
     */
    function addClass(ele,strClass){

    }

    /**
     * ɾ������
     * @param ele  ��ǰԪ��
     * @param strClass һ��������������
     */
    function removeClass(ele,strClass){


    }

    /**
     * ��ȡ��ָ�����������Ԫ��
     * @param context ������
     * @param tagName ����� (�ַ���)
     */
    function children(context,tagName){

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
        children:children,
        setCss:setCss,
        setGroup:setGroup,
        css:css
    }

})();
