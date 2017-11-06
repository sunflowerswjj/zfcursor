var utils = (function () {
    function listToArray(arg) {
        var ary = [];
        try {
            //��׼�����
            ary = [].slice.call(arg);
        } catch (e) {
            //IE�����
            for (var i = 0; i < arg.length; i++) {
                ary[ary.length] = arg[i];
            }
        }
        return ary;
    }

    /**
     *
     * @param str json��ʽ���ַ���
     * @return  json��ʽ�Ķ���
     */
    function toJSON(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }

    return {
        listToArray: listToArray,
        toJSON: toJSON
    }
})()
