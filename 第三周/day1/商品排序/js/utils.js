
var utils = (function(){
    function listToAry(likeAry){
        var ary = [];
        try{
            ary = [].slice.call(likeAry,0);
        }catch(e){
            for(var i = 0;i<likeAry.length;i++){
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    function toJSON(str){
       return  "JSON" in window ? JSON.parse(str):eval("("+str+")");
    }
    return {
       listToAry: listToAry,
        toJSON:toJSON
    }
})()