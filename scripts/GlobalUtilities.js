const RESIZE_TIMEOUT = 200;

function semicolonSuffix(str) {
  if (str[str.length - 1] != ";") {
    str = str + ";";
  }
  return str;
}

function RemoveSemicolonSuffix(str) {
  if (str[str.length - 1] == ";") {
    str = str.slice(0, -1);
  }
  return str;
}

function sepSuffix(str, sep) {
  if (str[str.length - 1] != sep) {
    str = str + sep;
  }
  return str;
}

function splitPx(str) {
  str = Number(str.split("px")[0]);
  return str;
}

function splitRem(str) {
  str = Number(str.split("rem")[0]) * 16;
  return str;
}

function splitS(str) {
  if (str.includes("s")) {
    str = Number(str.split("s")[0]) * 1000;
  } else if (str.includes("ms")) {
    str = Number(str.split("ms")[0]);
  }
  return str;
}

function addStyleNonDestructive(elem, prop, val) {
  var existingStyle = elem.getAttribute("style");
  if (!existingStyle) {
    elem.style.setProperty(prop, val);
  } else {
    existingStyle = semicolonSuffix(existingStyle);
    existingStyle = existingStyle.replace(/\s/g, "");
    var styleStr = "";
    if (existingStyle.includes(prop)) {
      var existingVal = existingStyle.split(prop + ":")[1].split(";")[0];
      existingStyle = existingStyle.replace(prop + ":" + existingVal, prop + ":" + val);
    } else {
      existingStyle += prop + ":" + val + ";";
    }
    elem.setAttribute("style", existingStyle);
  }
}

function addAttrNonDestructive(elem, prop, val, sep) {
  var overlapping = false;
  var overlappingAttrVal = 0;
  for (var i = 0; i < elem.getAttributeNames().length; i++) {
    if (elem.getAttributeNames()[i] == prop) {
      overlapping = true;
      overlappingAttrVal = i;
    }
  }

  if (!overlapping) {
    elem.setAttribute(prop, val);
  } else {
    var existingAttrVal = elem.getAttribute(prop);
    // existingAttrVal = existingAttrVal.replace(/\s/g, '');
    existingAttrVal = sepSuffix(existingAttrVal, sep);
    val = sepSuffix(val, sep);
    if (existingAttrVal.includes(val)) {
      elem.setAttribute(prop, val);
    } else {
      var newAttr = existingAttrVal.replace(existingAttrVal, existingAttrVal + val);
      elem.setAttribute(prop, newAttr);
    }
  }
}

function postScreenSizeToRoot() {
  if (typeof window == "undefined") return;
  var width;
  var height;

  function getScreenSize() {
    width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    window.document.documentElement.style.setProperty("--screen-width", width + "px");
    window.document.documentElement.style.setProperty("--screen-height", height + "px");
  }

  getScreenSize();

  var isResizing;
  window.addEventListener(
    "resize",
    function (event) {
      window.clearTimeout(isResizing);
      isResizing = setTimeout(function () {
        getScreenSize();
      }, RESIZE_TIMEOUT);
    },
    false
  );
}

function overflowEllipsis() {
  function run() {
    var overflowEllipsisElems = document.getElementsByClassName("overflow__ellipsis");
    for (var i = 0; i < overflowEllipsisElems.length; i++) {
      var elem = overflowEllipsisElems[i];
      var elemLineHeight = splitPx(window.getComputedStyle(elem, null).lineHeight);
      var elemHeight = splitPx(window.getComputedStyle(elem.parentElement, null).height) - splitPx(window.getComputedStyle(elem.parentElement, null).paddingTop) - splitPx(window.getComputedStyle(elem.parentElement, null).paddingBottom);
      var lines = Math.round(elemHeight / elemLineHeight);

      addStyleNonDestructive(elem, "--rounded-height", lines * elemLineHeight + "px");
      addStyleNonDestructive(elem, "--visible-lines", lines);
      addStyleNonDestructive(elem, "--line-height", elemLineHeight + "px");
    }
  }

  run();
  var isResizing;
  window.addEventListener(
    "resize",
    function (event) {
      window.clearTimeout(isResizing);
      isResizing = setTimeout(function () {
        run();
      }, RESIZE_TIMEOUT);
    },
    false
  );
}





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

function getSiblingStyle(property, elem1, elem2 = null) {
  const elems = Array.from(elem1.parentElement.children);
  const startIndex = elems.indexOf(elem1);
  const endIndex = elem2 ? elems.indexOf(elem2) : elems.length;

  const beforeElemStyle = elems.slice(0, startIndex).reduce((acc, elem) => {
    const value = splitPx(getComputedStyle(elem).getPropertyValue(property));
    return acc + value;
  }, 0);

  let afterElemStyle = 0;
  if (elem2) {
    afterElemStyle = elems.slice(endIndex + 1).reduce((acc, elem) => {
      const value = splitPx(getComputedStyle(elem).getPropertyValue(property));
      return acc + value;
    }, 0);
  } else {
    afterElemStyle = elems.slice(startIndex + 1).reduce((acc, elem) => {
      const value = splitPx(getComputedStyle(elem).getPropertyValue(property));
      return acc + value;
    }, 0);
  }

  return [beforeElemStyle, afterElemStyle];
}


function clamp(input, min, max) {
  return input < min ? min : input > max ? max : input;
}

function map(current, in_min, in_max, out_min, out_max) {
  const mapped = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  return clamp(mapped, out_min, out_max);
}



function arrayItemDoesExist(arr) {
  return arr != null && arr != undefined && arr != [] && arr != "" && arr.length > 0;
}

function capFirstRemovePeriod(val) {
  if (typeof val == "array") {
    val = val.map((str) => {
      str.trim();
      str = str.charAt(0).toUpperCase() + str.slice(1);
      str = str[str.length - 1] === "." ? str.slice(0, -1) : str;
      return str;
    });
  } else if (typeof val == "string") {
    val.trim();
    val = val.charAt(0).toUpperCase() + val.slice(1);
    val = val[val.length - 1] === "." ? val.slice(0, -1) : val;
  }
  return val;
}

function getElemWidth(elem) {
  return splitPx(getComputedStyle(elem).getPropertyValue("width")) + splitPx(getComputedStyle(elem).getPropertyValue("margin-left")) + splitPx(getComputedStyle(elem).getPropertyValue("margin-right"));
}


function getColors() {
  // return new Promise((resolve) => {
  //   if (document.readyState === "complete") {
  //     resolve();
  //   } else {
  //     window.addEventListener("load", resolve);
  //   }
  // }).then(() => {
    var rootStyles = getComputedStyle(document.documentElement);
    var colorsList = rootStyles.getPropertyValue("--colors").trim();
    var colorNames = colorsList.split(",");
    var colors = {};

    for (let i = 0; i < colorNames.length; i++) {
      var colorName = colorNames[i].trim();
      var colorValue = rootStyles.getPropertyValue(colorName).trim();
      colors[colorName] = { name: colorName, value: colorValue };
    }
    return colors;
  // });
}

export { addStyleNonDestructive, addAttrNonDestructive, postScreenSizeToRoot, overflowEllipsis, splitPx, splitRem, splitS,loadImgExternally, getSiblingStyle, clamp, map, arrayItemDoesExist,capFirstRemovePeriod, getElemWidth, getColors, RESIZE_TIMEOUT };
