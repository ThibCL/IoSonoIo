var scrolled = false;
var element = document.getElementById("lines");

function updateScroll(){
    console.log("the function is working");
    if (!scrolled){
        console.log("started");
        element.scrollTop = element.scrollHeight;
    }
    scrolled = false;
}

element.addEventListener('scroll', function(){
    console.log("scrolled");    
    scrolled = true;
});

setInterval(updateScroll, 1000);