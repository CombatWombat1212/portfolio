import toggle from "@/scripts/AnimationTools";

var forceHiddenUIOn = false;
const HIDDEN_UI = [
    { type: "interactive", area: ".popup--canvas", target: ".popup--footer" },
    { type: "lightbox", area: ".popup--content", target: ".popup--header" },
  ];
var activeHiddenUI;



function setActiveHiddenUI(type){
    // activeHiddenUI = HIDDEN_UI.filter((ui) => ui.type == "lightbox")[0]);
    activeHiddenUI = HIDDEN_UI.filter((ui) => ui.type == type)[0];
}
  

function hiddenUIToggle() {
    var target = document.querySelector(activeHiddenUI.target);
    if (!target) return;
    var on = target.classList.contains("popup--nav__on");
    var tran = Number(window.getComputedStyle(target).getPropertyValue("transition-duration").split("s")[0]) * 1000;
  
    if (on) {
      if (forceHiddenUIOn) return;
      toggle(target, "popup--nav", tran, "animated", "");
    } else {
      toggle(target, "popup--nav", tran, "animated", "");
    }
  }
  

function forceHiddenUI(e) {
  forceHiddenUIOn = true;
  hiddenUIToggle();
}

function stopForceHiddenUI() {
  if (forceHiddenUIOn) {
    forceHiddenUIOn = false;
    mouseMoveRan = true;
  }
}


function hiddenUIInit() {
    var area = document.querySelector(activeHiddenUI.area);
    var target = document.querySelector(activeHiddenUI.target);
  
    area.addEventListener("mousemove", showUIOnMouseMove, false);
    area.addEventListener("wheel", showUIOnMouseMove, false);
    target.addEventListener("mouseenter", forceHiddenUI, false);
    target.addEventListener("mouseleave", stopForceHiddenUI, false);
  
    if (activeHiddenUI.type == "interactive") target.classList.remove("popup--nav__on");
    if (activeHiddenUI.type == "interactive") target.classList.add("popup--nav__off");
  
    forceHiddenUIOn = false;
  }
  

  
var isMouseMoving;
var mouseMoveTimeout = 1000;
var mouseMoveRan = false;
function showUIOnMouseMove() {
  if (!mouseMoveRan) {
    hiddenUIToggle();
    mouseMoveRan = true;
  }
  window.clearTimeout(isMouseMoving);
  isMouseMoving = setTimeout(isMouseMovingFunctions, mouseMoveTimeout);
}

function isMouseMovingFunctions() {
  mouseMoveRan = false;
  hiddenUIToggle();
}




export { hiddenUIToggle, forceHiddenUI, stopForceHiddenUI, hiddenUIInit, setActiveHiddenUI, showUIOnMouseMove };