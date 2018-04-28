window.onload = function(){
    imgLocation("container","box");
}

function imgLocation(parent,content){
    //将parent下多有的content全部取出
    var cparent = document.getElementById(parent);

}

 //由于控件较多，选择写一个方法用函数存储起来
function getChildElement(parent,content){
    var contentArr = [];
    var allContent = parent.getElementByTagName("*");
    for(var i = 0;i<allContent.length;i++){
        if(allContent[i].className ==content){
            contentArr.push(allContent[i]);
        }
    }
}