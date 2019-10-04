const mainHeaderTopCollapsed = -105;
const mainHeaderTopExpanded = 0;
const mainNodePaddingOnHeaderCollapsed = 25;
const mainNodePaddingOnHeaderExpanded = 130;
const scrollMaxOffset = mainNodePaddingOnHeaderExpanded;

let lastScrollY = 0;
let mainHeaderNode = document.querySelector("#main-header");
let mainNode = document.querySelector("main");

function expandOrCollapseHeader(shouldExpand)
{
    if(document.documentElement.offsetHeight - window.innerHeight <= window.innerHeight / 2)
        shouldExpand = true;

    mainHeaderNode.style.top = shouldExpand ? mainHeaderTopExpanded : mainHeaderTopCollapsed;
    mainNode.style.paddingTop = shouldExpand ? mainNodePaddingOnHeaderExpanded : mainNodePaddingOnHeaderCollapsed;
}

function onScroll(event)
{
    let deltaY = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    let maxScrollHeight = document.documentElement.offsetHeight - window.innerHeight - scrollMaxOffset;
    
    if(lastScrollY >= maxScrollHeight)
        expandOrCollapseHeader(lastScrollY <= 0);
    else
        expandOrCollapseHeader(deltaY < 0);
}

window.addEventListener("scroll", onScroll);
mainHeaderNode.addEventListener("mouseenter", function(event) {expandOrCollapseHeader(true)});
mainHeaderNode.addEventListener("mouseleave", function(event) {expandOrCollapseHeader(window.scrollY <= 0)});