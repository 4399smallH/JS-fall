window.onload = function(){
    imgLocation("container","box");
}

function imgLocation(parent,content){
    //将parent下所有的content全部取出
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent,content);
    var imgWidth = ccontent[0].offsetWidth;
    var num = Math.floor(document.documentElement.clientWidth / imgWidth);//一行可以存放图片的个数
    cparent.style.cssText = "width:"+imgWidth*num+"px;margin: 0 auto;";

    var boxHeightArr = [];//承载盒子高度
    for(var i =0;i<ccontent.length;i++){
        if(i<num){
            boxHeightArr[i] = ccontent[i].offsetHeight; 
        }
        else{
            var minHeight = Math.min.apply(null,boxHeightArr);
            var minIndex = getMinHeight(boxHeightArr,minHeight);
            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = minHeight + "px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
            boxHeightArr[minIndex] = boxHeightArr[minIndex]+ ccontent[i].offsetHeight;
        }
    }
}
//得到当前的位置
function getMinHeight(boxHeightArr,minHeight){
    for(var i in boxHeightArr){
        if(boxHeightArr[i] == minHeight){
            return i;
        }
    }
}

 //由于控件较多，选择写一个方法用函数存储起来
function getChildElement(parent,content){
    var contentArr = [];
    var allContent = parent.getElementsByTagName("*");
    for(var i = 0;i<allContent.length;i++){
        if(allContent[i].className ==content){
            contentArr.push(allContent[i]);
        }
    }
    return contentArr;
}