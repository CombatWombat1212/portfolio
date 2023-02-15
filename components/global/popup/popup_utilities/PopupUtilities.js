import toggle from "@/scripts/AnimationTools";
import { popupGroup, seekHandler } from "./LightboxUtilities";

var setPopupGlobal;



function throwLoadErrors(img){
  if(typeof img.src === "undefined") throw new Error("No src attribute found on img element");
  if(typeof img.alt === "undefined") throw new Error("No alt attribute found on img element");
  if(typeof img.width === "undefined") throw new Error("No width attribute found on img element");
  if(typeof img.height === "undefined") throw new Error("No height attribute found on img element");

}



function loadImgExternally(img){

  var elem;

  throwLoadErrors(img);


  elem = document.createElement("img");
  elem.src = "." + img.src;
  elem.width = img.width;
  elem.height = img.height;
  elem.alt = img.alt;
  // elem.setAttribute("loading", "lazy"); // Use lazy loading to improve performance
  elem.setAttribute("decoding", "async"); // Use async decoding to improve performance


  return elem;

}





function setSetPopupGlobal(setPopup) {
    setPopupGlobal = setPopup;
}

function catchKeys(e) {
    if (e.keyCode == 27 || e.key == "Escape") {
      closePopup(setPopupGlobal);
    }
  
    if (popupGroup) {
      if (e.keyCode == 37 || e.key == "ArrowLeft") {
        seekHandler(e, setPopupGlobal);
      }
  
      if (e.keyCode == 39 || e.key == "ArrowRight") {
        seekHandler(e, setPopupGlobal);
      }
    }
  }
  
  function closePopup(setPopup) {
    var trans = Number(window.getComputedStyle(document.querySelector(".popup--wrapper")).transitionDuration.split("s")[0]) * 1000;
    toggle(document.querySelector(".popup--wrapper"), "popup--wrapper", "transition", "animated", "");
    setTimeout(() => setPopup(false), trans);
  }

  
  export {catchKeys, closePopup, setSetPopupGlobal, loadImgExternally}