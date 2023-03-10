import { MADE_IMGS } from "@/data/MADE_IMGS";
import { SHIRT_COMPONENTS, SHIRT_COMPONENTS_GROUPS } from "@/data/SHIRT_COMPONENTS";
import { RESIZE_TIMEOUT } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { setConfig } from "next/config";
import React, { Fragment, useRef } from "react";
import { useEffect, useState } from "react";
import Graphic from "../sections/Graphic";
import Heading from "../sections/Heading";

// TODO: keyboard input support for tab navigation

const order = ["base", "placket", "collar", "cuff"];
const supportedMaterials = ["canvas_5", "755039", "755032", "755027"];
const defaultConfig = {
  base: "base",
  placket: "regular",
  collar: "wide",
  cuff: "regular",
  material: "canvas_5",
};

const components = ["base_shirt", "collar_band", "collar_mini_wide", "collar_wide", "cuff_regular", "cuff_french", "placket_hidden", "placket_regular", "placket_tuxedo"];

function updateActiveState(index, length) {
  return Array.from({ length }, (_, i) => i === index);
}
function updateConfigState(config, component, value) {
  const updatedConfig = { ...config, [component]: value };
  return updatedConfig;
}

function configHandleClick(e, config, setConfig, active, setActive) {
  var target = e.target.closest(".assets--panel, .material");
  var component = target.getAttribute("data-component");
  var type = target.getAttribute("data-type");
  var material = target.getAttribute("data-material");

  if (component && type) {
    var group = Array.from(target.closest(".assets--inner").children);
    var index = group.indexOf(target);

    setConfig(updateConfigState(config, component, type));
    setActive(updateActiveState(index, active.length));
  } else if (material) {
    var group = Array.from(target.closest(".material--group").children);
    var index = group.indexOf(target);

    setConfig(updateConfigState(config, "material", material));
    setActive(updateActiveState(index, active.length));
  }

  setTimeout(() => {
    target.blur();
  }, 200);
}

function imageParseName(img) {
  var component = img.name.split("_")[1];
  var type = img.name.split(`${component}_`)[1];
  if (component == "base") type = "base";
  return { component, type };
}

function Options({ imgs, config, setConfig }) {
  var init = [];
  for (var i = 0; i < imgs.length; i++) {
    var { component, type } = imageParseName(imgs[i]);
    var isActive = config[component] === type ? true : false;
    if (component == "base") isActive = true;
    init.push(isActive);
  }

  const [active, setActive] = useState(init);

  return (
    <>
      {imgs.map((img, index) => {
        var pref = "assets--panel";
        var { component, type } = imageParseName(img);

        return (
          <Fragment key={index}>
            <Graphic
              type="mask"
              img={img}
              background="background darker"
              className={`${pref} ${pref}__${active[index] ? "on" : "off"}`}
              tabIndex={0}
              data-component={component}
              data-type={type}
              onClick={(e) => {
                configHandleClick(e, config, setConfig, active, setActive);
              }}
            />
          </Fragment>
        );
      })}
    </>
  );
}

function Configurator() {
  const [config, setConfig] = useState(defaultConfig);

  var materials = [];
  for (var key in SHIRT_COMPONENTS_GROUPS) {
    materials.push(key);
  }

  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    var images = configGetProcessedImages(config);
    setImgs(images);
  }, [config]);

  return (
    <>
      <div className="configurator">
        <div className="configurator--panel assets">
          <div className="assets--row">
            <div className="assets--category">
              <Heading type="h3" className="configurator--title asset--heading">
                <b>Collars</b>
              </Heading>
              <div className="assets--inner">
                <Options imgs={[MADE_IMGS.component_collar_wide, MADE_IMGS.component_collar_mini_wide, MADE_IMGS.component_collar_band]} config={config} setConfig={setConfig} />
              </div>
            </div>
          </div>

          <div className="assets--row">
            <div className="assets--category">
              <Heading type="h3" className="configurator--title asset--heading">
                <b>Plackets</b>
              </Heading>
              <div className="assets--inner">
                <Options imgs={[MADE_IMGS.component_placket_regular, MADE_IMGS.component_placket_tuxedo, MADE_IMGS.component_placket_hidden]} config={config} setConfig={setConfig} />
              </div>
            </div>
          </div>

          <div className="assets--row">
            <div className="assets--category">
              <Heading type="h3" className="configurator--title asset--heading">
                <b>Cuffs</b>
              </Heading>
              <div className="assets--inner">
                <Options imgs={[MADE_IMGS.component_cuff_regular, MADE_IMGS.component_cuff_french]} config={config} setConfig={setConfig} />
              </div>
            </div>
            <div className="assets--category">
              <Heading type="h3" className="configurator--title asset--heading">
                <b>Base</b>
              </Heading>
              <div className="assets--inner ">
                <Options imgs={[MADE_IMGS.component_base]} config={config} setConfig={setConfig} />
              </div>
            </div>
          </div>
        </div>

        <div className="configurator--panel viewer">
          <Heading type="h3" className="configurator--title viewer--heading">
            <b>Preview</b>
          </Heading>
          <div className="viewer--inner">
            <div className="viewer--preview">
              <Preview imgs={imgs} />
            </div>

            <div className="viewer--materials">
              <div className="material--group">
                <Materials materials={supportedMaterials} config={config} setConfig={setConfig} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Preview({ imgs }) {
  var reference = useRef(null);

  useMountEffect(() => {
    var preview = reference.current;
    function previewCheck() {
      if (preview.querySelector(".preview--component")) {
        previewInit(preview);
      } else if (new Date().getTime() - startTime < 5000) {
        setTimeout(previewCheck, 100);
      }
    }
    var startTime = new Date().getTime();
    previewCheck();
  });

  return (
    <div className="preview preview__loading" ref={reference}>
      {Object.entries(imgs).map(([key, value]) => {
        return (
          <React.Fragment key={key}>
            {value.map((img, index) => {
              var pref = "preview--component";
              var imgStyle = {
                "--preview-img-order": img.order,
              };
              var active = img.active ? "on" : "off";

              return <Graphic key={index} img={img} className={`${pref} ${pref}__${active}`} style={imgStyle} />;
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function previewSetDimensions(preview) {
  preview.elem.style.setProperty("--image-width", preview.width + "px");
  preview.elem.style.setProperty("--image-height", preview.height + "px");
}

function previewGetDimensions(preview) {
  var width, height;
  var firstImage = preview.elem.querySelector(".preview--component");
  width = firstImage.offsetWidth;
  height = firstImage.offsetHeight;
  preview.width = width;
  preview.height = height;
}

function previewInit(preview) {
  preview = {
    elem: preview,
    height: 0,
    width: 0,
  };

  preview.elem.classList.remove("preview__loading");
  run();

  function run() {
    previewGetDimensions(preview);
    previewSetDimensions(preview);
  }

  function ran() {
    window.clearTimeout(isResizing);
    isResizing = setTimeout(function () {
      run();
    }, RESIZE_TIMEOUT);
  }

  var isResizing;
  window.removeEventListener("resize", ran);
  window.addEventListener("resize", ran);
}

function configGetProcessedImages(config) {
  var images = [];
  var processed = {};
  configGetImgs(images, config, components);
  processed = configOrderImages(images, processed, order);
  processed = configGetImgActives(processed, config);
  return processed;
}

function configGetImgs(images, config, components) {
  for (var i = 0; i < components.length; i++) {
    var img = SHIRT_COMPONENTS[`${components[i]}_${config.material}`];
    if (!images.some((image) => image.src === img.src)) {
      images.push(img);
    }
  }
}

function configOrderImages(images, processed, order) {
  for (var i = 0; i < order.length; i++) {
    var matchingImages = images.filter((img) => img.name.includes(order[i]));
    matchingImages.forEach((img) => {
      img.order = i;
      images.filter((image) => image.name.includes(img.name))[0].order = i;
    });
  }

  // turn images into an object of arrays, with the key being the shirt component name, base, placket, collar, cuff
  processed = {
    base: images.filter((img) => img.name.includes("base")),
    placket: images.filter((img) => img.name.includes("placket")),
    collar: images.filter((img) => img.name.includes("collar")),
    cuff: images.filter((img) => img.name.includes("cuff")),
  };
  return processed;
}

function configGetImgActives(processed, config) {
  for (var key in processed) {
    var images = processed[key];
    if (images.length > 0) {
      images.forEach((img) => {
        img.active = img.name.includes(config[key]);
      });
    }
  }
  return processed;
}


function Materials({ materials, config, setConfig }) {
  var init = [];
  for (var i = 0; i < materials.length; i++) {
    var isActive = config.material === materials[i] ? true : false;
    init.push(isActive);
  }

  const [active, setActive] = useState(init);

  return (
    <>
      {materials.map((material, index) => {
        var name = `thumbnail_${material}`.toLowerCase();
        var image = SHIRT_COMPONENTS[name];

        var pref = "material";
        var on = active[index] ? "on" : "off";

        return (
          <a
            className={`${pref} ${pref}__${on}`}
            tabIndex={0}
            key={index}
            onClick={(e) => {
              configHandleClick(e, config, setConfig, active, setActive);
            }}
            data-material={material}>
            <Graphic type="image" className={`material--graphic`} img={image} />
          </a>
        );
      })}
    </>
  );
}

export default Configurator;
