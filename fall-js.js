window.onload = function(){
    imgLocation("container","box");
    var imgData = {"data":[{"src":"1.jpg"} , {"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},
    {"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},]} //JS模拟JSON字符串数据
    //监听滚动条
    window.onscroll = function(){
        if(checkFlag()){
            //alert(imgData.length);
            var cparent = document.getElementById("container");
            for(var i = 0;i< imgData.data.length;i++){
                var ccontent = document.createElement("div");
                ccontent.className ="box";
                cparent.appendChild(ccontent);
                var boxImg = document.createElement("div");
                boxImg.className = "box_img";
                ccontent.appendChild(boxImg);
                var img = document.createElement("img");
                img.src = "img/"+imgData.data[i].src;
                boxImg.appendChild(img);
            }
            imgLocation("container","box");
        }
    }
}

function checkFlag(){
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent,"box");
    var lastContentHeight = ccontent[ccontent.length-1].offsetTop; //得到最后个图片的距离顶部高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//滑动距离
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;//console.log(lastContentHeight+":"+scrollTop+":"+pageHeight);当scrollTop+pageHeight>lastContentHeight的时候，加载 
    if(lastContentHeight<(scrollTop+pageHeight)){
        return true ;
    }
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