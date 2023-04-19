import { AnimatePresence, motion, useAnimation, useIsPresent, wrap } from "framer-motion";

import Tag from "@/components/elements/Tag";
import { createUpdateConditions, splitPx, splitRem } from "@/scripts/GlobalUtilities";
import React, { Fragment, useEffect, useRef, useState } from "react";
import AnimPres from "../../AnimPres";
import popAnims, { popLayoutTransition } from "../popup_utilities/PopupAnimations";
import useDelayedProps from "@/scripts/hooks/useDelayedProps";
import { Close } from "../Popup";
import useHasScrollbar from "@/scripts/hooks/useHasScrollbar";
import Button from "@/components/elements/Buttons";
import useFlexWrapped from "@/scripts/hooks/useFlexWrapped";
import useElementHeight from "@/scripts/hooks/useElementHeight";
import useFlexRows from "@/scripts/hooks/useFlexRows";
import useHoverAndFocus from "@/scripts/hooks/useHoverAndFocus";
import useHasOverflow from "@/scripts/hooks/useHasOverflow";
import useElementStyle from "@/scripts/hooks/useElementStyle";
import useOffsetTop from "@/scripts/hooks/useOffsetTop";
import { STUDY_LINKS } from "@/data/CASE_STUDIES";

function GalInfoMotionWrapper({ elems, scrollbar, children, styles, type = "default" }) {
  const scroll = type != "above" && scrollbar.info.classes ? scrollbar.info.classes : "";
  
  return (
    // <motion.div
    <div
      // layout="position"
      // transition={{
      //   layout: { duration: popLayoutTransition },
      // }}
      className={`popup--info ${scroll} popup--info__${type}`}

      // ref={elems.info.ref}

      {...(type != "above" ? { ref:elems.info.ref  } : {})}

      style={styles.description}>
      {children}
    </div>
  );
}

function GalInfoAnimPres({ elems, pop, styles, state, popclass, scrollbar, children, type = "default" }) {

  return (
    <>
      {(pop.firstImgDrawn || state.mobileGallery) && (
        <AnimPres
          mode="wait"
          fragment
          animation={popAnims.slideFade}
          // delay={0.25}
          condition={true}
          reference={elems.desc.ref}
          className={`popup--description ${popclass.desc} ${scrollbar.desc.classes} popup--description__${type}`}
          style={styles.description}
          onAnimationComplete={() => {
            pop.setInfoDrawn(true);
          }}>
          {children}
        </AnimPres>
      )}
    </>
  );
}

function GalHeading({ title, subheading, state }) {
  // const TitleTag = state.desktop ? "h3" : "h5";
  const TitleTag = "h3";
  const SubheadingTag = state.desktop ? "h5" : "h4";
  return (
    <>
      {title && <TitleTag type="h3" className="gallery--title" dangerouslySetInnerHTML={{ __html: title }} />}
      {subheading && <SubheadingTag className="gallery--subheading">{subheading}</SubheadingTag>}
    </>
  );
}

const GalInfo = React.memo(function GalInfo({ pop, popclass, elems, nav, handles, state, children }) {
  var title, subheading;
  if (pop.img.project) {
    title = pop.img.project;
    subheading = pop.img.title;
  } else if (pop.img.title) {
    title = pop.img.title;
  } else {
    title = false;
  }




  const galInfoHeight = (() => {
    if (state.desktop) {
      if (elems.img.height != 0) return elems.img.height;
    } else {
      if (!elems.info.ref.current) return 0;
      if (!elems.popup.ref.current) return 0;

      var infoElem = elems.info.ref.current;
      var popupElem = elems.popup.ref.current;

      var contentChildren = Array.from(infoElem.parentElement.children).filter((elem) => {
        return getComputedStyle(elem).position !== "absolute";
      });
      var contentRows = contentChildren.length;

      var gapWidth = splitRem(window.getComputedStyle(popupElem).getPropertyValue("--popup-gap"));
      gapWidth = gapWidth * (contentRows - 1);

      var notMe = contentChildren.filter((elem) => {
        return elem != infoElem;
      });

      var result = 0;
      for (var i = 0; i < notMe.length; i++) {
        result +=
          splitPx(window.getComputedStyle(notMe[i]).height) +
          splitPx(window.getComputedStyle(notMe[i]).paddingTop) +
          splitPx(window.getComputedStyle(notMe[i]).paddingBottom);
      }

      return popupElem.offsetHeight - result - gapWidth;
    }
  })();


  const galDescHeight = (() => {
    if (state.desktop) return 0;
    if (!elems.info.ref.current) return 0;
    if (!elems.popup.ref.current) return 0;
    if (!elems.info.ref.current.querySelector(".gallery--info")) return 0;

    var infoElem = elems.info.ref.current;
    var popupElem = elems.popup.ref.current;
    var galInfo = infoElem.querySelector(".gallery--info");

    var descHeight =
      splitPx(window.getComputedStyle(galInfo).height) +
      splitPx(window.getComputedStyle(galInfo).paddingTop) +
      splitPx(window.getComputedStyle(galInfo).paddingBottom);

    return descHeight;
  })();





  const styles = {
    description: {
      "--gallery-info-height": `${galInfoHeight}px`,
      "--gallery-info-max-height": `${elems.img.maxHeight != 0 && elems.img.maxHeight}px`,
      "--gallery-description-height": `${galDescHeight}px`,
    },
  };

  var hasDesc = pop.img.description || (pop.group.description && pop.group.description[pop.index]);
  var hasTitle = title ? true : false;

  const descScrollbar = useHasScrollbar(elems.desc.ref, {
    observer: true,
    debounceTime: 10,
    repeatChecks: 10,
    repeatChecksDebounceTime: 4,
  });

  const infoScrollbar = useHasScrollbar(elems.info.ref, {
    debounceTime: 100,
    repeatChecks: 10,
    repeatChecksDebounceTime: 10,
  });

  const scrollbar = {
    desc: {
      has: descScrollbar,
      classes: true ? "popup--description__gallery-scrollbar scrollbar" : "",
    },
    info: {
      has: infoScrollbar,
      classes: true ? "popup--info__gallery-scrollbar scrollbar" : "",
    },
  };

  const [catData, setCatData] = useState({});

  const handleCatDataChange = (key, value) => {
    const keyParts = key.split(".");
    setCatData((prevCatData) => {
      if (keyParts.length === 2) {
        const [parentKey, childKey] = keyParts;
        return {
          ...prevCatData,
          [parentKey]: {
            ...prevCatData[parentKey],
            [childKey]: value,
          },
        };
      } else {
        return {
          ...prevCatData,
          [key]: value,
        };
      }
    });
  };

  const wrapperProps = { elems: elems, pop: pop, styles: styles, state: state, popclass: popclass, scrollbar: scrollbar, handles: handles };


  return (
    <>
      {state.mobile && (
        <GalInfoMotionWrapper {...wrapperProps} type="above">
          <GalInfoAnimPres {...wrapperProps} type="above">
            <GalHeading title={title} subheading={subheading} {...wrapperProps} />
            {state.mobileGallery && <Close pop={pop} nav={nav} handles={handles} popclass={popclass} type="gallery" />}
          </GalInfoAnimPres>
        </GalInfoMotionWrapper>
      )}

      {children}

      <GalInfoMotionWrapper {...wrapperProps}>
        <GalInfoAnimPres {...wrapperProps}>
          {state.desktop && <GalHeading title={title} subheading={subheading} {...wrapperProps} />}

          <div className="gallery--info">
            {(pop.img.disciplines || pop.img.tools) && state.desktop && (
              <GalCategories pop={pop} hasDesc={hasDesc} hasTitle={hasTitle} onCatDataChange={handleCatDataChange} state={state} />
            )}

            {pop.img.study && (
              <Button
                icon={["arrow_right", "right", "mask"]}
                color={"background-tertiary"}
                animation={"pulse-right"}
                className="gallery--button"
                href={STUDY_LINKS.find((link) => link.toLowerCase().includes(pop.img.study.toLowerCase()))}
                onClick={handles.close}>
                View Study
              </Button>
            )}
            {hasDesc && <GalDescription pop={pop} />}

            {(pop.img.disciplines || pop.img.tools) && state.mobile && (
              <GalCategories pop={pop} hasDesc={hasDesc} hasTitle={hasTitle} onCatDataChange={handleCatDataChange} state={state} />
            )}
          </div>
        </GalInfoAnimPres>

        {pop.firstImgDrawn && pop.infoDrawn && !state.mobileGallery && (
          <Close pop={pop} nav={nav} handles={handles} popclass={popclass} type="gallery" />
        )}

        {(pop.img.disciplines || pop.img.tools) && (
          <div
            className={`gallery--categories-background
        ${scrollbar.desc.has ? "gallery--categories-background__scrollbar" : ""}
        ${catData?.hovered || catData.ellipse?.hovered ? "gallery--categories-background__hovered" : ""}
        `}
            style={{
              "--categories-top": `${catData.wrapper?.top}px`,
              "--tag-height": `${catData.tag?.height}px`,
            }}></div>
        )}
      </GalInfoMotionWrapper>
    </>
  );
}, createUpdateConditions(["pop.index", "pop.img", "elems.img.height", "pop.firstImgDrawn", "pop.infoDrawn", "state.mobile", "state.desktop"]));
// }, createUpdateConditions(["pop.index", "pop.img", "elems.img.height"]));

const GalCategories = React.memo(function GalCategories({ pop, hasDesc, hasTitle, onCatDataChange, state }) {
  const catRef = useRef(null);
  const wrapperRef = useRef(null);
  const firstTagRef = useRef(null);
  const ellipseRef = useRef(null);
  const catRefHovered = useHoverAndFocus(catRef);
  const ellipseHovered = useHoverAndFocus(ellipseRef);

  const cat = {
    ref: catRef,
    hovered: catRefHovered,
    wrapper: {
      ref: wrapperRef,
      overflow: useHasOverflow(wrapperRef, { observer: true, repeatChecks: 4, repeatCheckDebounceTime: 10 }),
      top: useOffsetTop(wrapperRef, { observer: true, repeatChecks: 4, repeatCheckDebounceTime: 10 }),
    },
    tag: {
      ref: firstTagRef,
      height: useElementHeight(firstTagRef, { border: true }),
    },
    ellipse: {
      ref: ellipseRef,
      hovered: ellipseHovered,
    },
  };

  useEffect(() => {
    if (onCatDataChange) {
      onCatDataChange("wrapper.top", cat.wrapper.top);
    }
  }, [cat.wrapper.top]);

  useEffect(() => {
    if (onCatDataChange) {
      onCatDataChange("tag.height", cat.tag.height);
    }
  }, [cat.tag.height]);
  useEffect(() => {
    if (onCatDataChange) {
      onCatDataChange("hovered", cat.hovered);
    }
  }, [cat.hovered]);
  useEffect(() => {
    if (onCatDataChange) {
      onCatDataChange("ellipse.hovered", cat.ellipse.hovered);
    }
  }, [cat.ellipse.hovered]);

  const controls = useAnimation();

  const [animationCompleted, setAnimationCompleted] = useState(true);
  const [calculatedX, setCalculatedX] = useState(null);

  const getScrollDetails = (cat) => {
    const width = cat.ref.current.offsetWidth;
    const scrollWidth = cat.ref.current.scrollWidth;
    const scrollPosition = (() => {
      var trans = window.getComputedStyle(cat.ref.current).getPropertyValue("transform");
      if (trans == "none" || trans == "matrix(1, 0, 0, 1, 0, 0)" || trans == "" || trans == undefined) {
        return 0;
      }
      if (trans.includes("matrix")) {
        trans = Math.abs(parseFloat(trans.split(",")[4].trim()));
        return trans;
      }
      return 0;
    })();

    const remainingScroll = scrollWidth - width - scrollPosition;

    return {
      width,
      scrollWidth,
      scrollPosition,
      remainingScroll,
    };
  };

  const handleMouseEnter = () => {
    setAnimationCompleted(false);

    const { width, scrollWidth, scrollPosition, remainingScroll } = getScrollDetails(cat);

    const duration = remainingScroll * 0.0075; // Adjust the multiplier to control speed

    let updatedCalculatedX = calculatedX;
    if (animationCompleted || calculatedX === null) {
      updatedCalculatedX = -scrollWidth + width - scrollPosition;
      setCalculatedX(updatedCalculatedX);
    }

    controls.start({
      x: updatedCalculatedX,
      transition: { duration, ease: "linear" },
    });
  };

  const handleMouseLeave = () => {
    const width = cat.ref.current.offsetWidth;
    const scrollWidth = cat.ref.current.scrollWidth;
    const duration = (scrollWidth - width) * 0.0075 * 0.5; // Adjust the multiplier to control speed

    controls.start({
      x: 0,
      transition: {
        duration: duration,
        ease: "easeOut",
        onComplete: () => setAnimationCompleted(true),
      }, // Adjust the duration for the transition
    });
  };

  var catclasses = [];

  if (hasDesc) {
  } else {
    catclasses.push("gallery--categories-wrapper__no-desc");
  }

  if (hasTitle) {
  } else {
    catclasses.push("gallery--categories-wrapper__no-title");
  }

  catclasses = catclasses.join(" ");

  useEffect(() => {
    return () => {
      setLockedOverflow(false);
    };
  }, []);

  const [lockedOverflow, setLockedOverflow] = useState(false);

  useEffect(() => {
    if (cat.ellipse.hovered || cat.hovered) {
      setLockedOverflow(cat.ellipse.hovered || cat.hovered);
    }
  }, [cat.ellipse.hovered, cat.hovered]);

  var j = 0;




  const renderTags = ({ isSimple } = {}) => {
    const tagProps = (item, index, isSimple) => {
      return {
        ...(index === 0 && !isSimple ? { reference: cat.tag.ref } : {}),
        ...(!isSimple ? { color: "inverted" } : {}),
        ...(!isSimple ? { variant: "tool" } : {}),
        key: `${item.key} ${index}`,
      };
    };
  
    const inner = (item) => {
      if (isSimple) {
        return j !== pop.img.disciplines.length + pop.img.tools.length ?  `${item}, ` : `${item}.`;
      }
      return item;
    };
  
    const renderItems = (items) => {
      return items.map((item, i) => {
        const TagComponent = isSimple ? Fragment : Tag;
        j++;
        return (
          <TagComponent {...tagProps(item, i, isSimple)}>{inner(item)}</TagComponent>
        );
      });
    };
  
    return (
      <>
        {renderItems(pop.img.disciplines)}
        {renderItems(pop.img.tools)}
      </>
    );
  };


  
  return (
    <div
      className={`gallery--categories-wrapper ${catclasses}
      ${cat.wrapper.overflow || lockedOverflow ? "gallery--categories-wrapper__overflow" : "gallery--categories-wrapper__no-overflow"}
      `}
      ref={cat.wrapper.ref}
      style={{
        "--categories-top": `${cat.wrapper.top}px`,
        "--tag-height": `${cat.tag.height}px`,
      }}>
      {state.desktop || !hasDesc ? (
        <>
          <motion.div
            className={`gallery--categories`}
            ref={cat.ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animate={controls}>
            <div
              className={`gallery--categories-inner 
              ${cat.wrapper.overflow || lockedOverflow ? "gallery--categories-inner__overflow" : "gallery--categories-inner__no-overflow"}`}>
              {renderTags({ isSimple: false })}
            </div>
          </motion.div>
          {(cat.wrapper.overflow || lockedOverflow) && (
            <div className={`gallery--ellipse`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={ellipseRef}>
              <span>...</span>
            </div>
          )}
        </>
      ) : (
        <p>{renderTags({ isSimple: true })} </p>
      )}
    </div>
  );
}, createUpdateConditions(["pop.index", "pop.img"]));

const GalDescription = React.memo(function GalDescription({ pop }) {
  var descs = pop.img.description ? pop.img.description : pop.group.description[pop.index];
  return (
    <>
      <div className="gallery--description">
        {descs.map((d, i) => {
          return (
            <p key={i} className="gallery--paragraph">
              {d}
            </p>
          );
        })}
      </div>
    </>
  );
}, createUpdateConditions(["pop.img", "pop.index"]));


export { GalInfo, GalCategories, GalDescription };
