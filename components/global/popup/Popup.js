import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Button from "../../elements/Buttons";
import { loading_white } from "@/data/ICONS";
import { RESIZE_TIMEOUT, createUpdateConditions, splitPx, splitRem } from "@/scripts/GlobalUtilities";
import { canvasInit, canvasOnResize, canvasZoom, setCanvasImageLoaded } from "./popup_utilities/CanvasUtilities";
import { galleryInit, lightboxInit, seekHandler, setPopupGroup, updatePopupNav } from "./popup_utilities/LightboxUtilities";
import { Graphic, Heading } from "@/components/sections/Sections";
import useBodyClass from "@/scripts/hooks/useBodyClass";
import useListener from "@/scripts/hooks/useListener";
import { AnimatePresence, motion, useAnimation, useIsPresent } from "framer-motion";
import useMouseMoving from "@/scripts/hooks/useMouseMoving";
import useHoverAndFocus from "@/scripts/hooks/useHoverAndFocus";
import useInputDown from "@/scripts/hooks/useInputDown";
import useElementWidth from "@/scripts/hooks/useElementWidth";
import useElementHeight from "@/scripts/hooks/useElementHeight";
import AnimPres from "../AnimPres";
import { GalInfo } from "./popup_components/GalleryInfo";
import popAnims, { popLayoutTransition, popSeekDuration } from "./popup_utilities/PopupAnimations";
import { useResponsiveUtils } from "@/scripts/hooks/useBreakpoint";
import swipeEventsInit from "@/scripts/SwipeEvents";
import { useRouter } from "next/router";

// TODO: update controls so that the seek buttons have a dedicated state for when they're overflowing.  or like a max number of them
// TODO: Stop calculations that don't need to run on mobile
// TODO: different max heights of image based on description height?  or at least just whether or not there is a description

//no more than 2 decimals
const startZoom = 0.95;
const minZoom = 0.95;
const maxZoom = 7.5;

const classAnims = {
  hideBtns: {
    in: "popup--seek__on",
    out: "popup--seek__off",
  },
};

function getPopupClasses(pop) {
  // Initialize arrays for class names

  var popclass = {
    header: [],
    content: [],
    media: [],
    mediaWrapper: [],
    container: [],
    desc: [],
    inner: [],
    background: [],
    close: [],
    containerStyle: {},
  };

  // Case 1: type is "lightbox"
  if (pop.type === "lightbox") {
    popclass.header.push("popup--header__condensed", "popup--nav__on");
    popclass.close.push("popup--close__lightbox");

    // Nested Case 1.1: zoom is true
    if (pop.zoom) {
      popclass.media.push("popup--media__lightbox-zoom");
      popclass.content.push("popup--content__lightbox-zoom");
      popclass.container.push("popup__lightbox-zoom");
      popclass.header.push("popup--header__lightbox-zoom");
    }
    // Nested Case 1.2: zoom is false
    if (!pop.zoom) {
      popclass.content.push("popup--content__lightbox");
      popclass.container.push("popup__lightbox");
    }

    // Nested Case 1.3: group is true
    if (pop.group) {
      popclass.container.push("popup__lightbox-group");
      popclass.content.push("popup--content__lightbox-group");
      popclass.header.push("popup--header__lightbox-group");
    }
    // Nested Case 1.4: group is false
    if (!pop.group) {
      popclass.header.push("popup--header__lightbox");
    }

    // Update popclass.containerStyle for type "lightbox"
    popclass.containerStyle = { "--img-aspect-width": pop.img.width, "--img-aspect-height": pop.img.height };
  }

  if (pop.type === "gallery") {
    popclass.content.push("popup--content__gallery");
    popclass.container.push("popup__gallery");
    popclass.desc.push("popup--description__gallery");
    popclass.background.push("popup--background__gallery");
    popclass.inner.push("popup--inner__gallery");
    popclass.close.push("popup--close__gallery");

    // Nested Case 2.1: zoom is true
    if (pop.zoom) {
      popclass.media.push("popup--media__gallery-zoom");
      popclass.mediaWrapper.push("popup--media-wrapper__gallery-zoom");
    }
    // Nested Case 2.2: zoom is false
    if (!pop.zoom) {
      popclass.mediaWrapper.push("popup--media-wrapper__gallery");
      popclass.media.push("popup--media__gallery");
      // popclass.container.push("popup__lightbox");
    }
    // Nested Case 2.3: group is true
    if (pop.group) {
      popclass.content.push("popup--content__gallery-group");
      popclass.mediaWrapper.push("popup--media-wrapper__gallery-group");
    }
    // Nested Case 2.4: group is false
    if (!pop.group) {
    }
    // // Update popclass.containerStyle for type "lightbox"
    // popclass.containerStyle = { "--img-aspect-width": pop.img.width, "--img-aspect-height": pop.img.height };
  }

  // Case 2: type is "interactive"
  else if (pop.type == "interactive") {
    popclass.header.push("popup--header__full");

    popclass.content.push("popup--content__interactive");
    popclass.container.push("popup__interactive");
  }

  // Join the arrays to form final class strings
  for (var key in popclass) {
    if (Array.isArray(popclass[key])) {
      popclass[key] = popclass[key].join(" ");
    }
  }

  return popclass;
}

function Popup({ pop }) {
  const poptransition = 0.15;

  useEffect(() => {
    pop.onRef.current = pop.on; // Update the ref value whenever pop.on changes
  }, [pop.on]);

  const popAnimCompleteHandler = useCallback(() => {
    pop.setDrawn(pop.onRef.current ? true : false);
  }, []);

  const bp = useResponsiveUtils();

  return (
    <>
      <AnimPres
        animation={popAnims.fade}
        duration={poptransition}
        condition={pop.on}
        className={"popup--wrapper"}
        onAnimationComplete={popAnimCompleteHandler}>
        <Wrapper pop={pop} bp={bp} />
      </AnimPres>
    </>
  );
}

function Wrapper({ pop, bp }) {
  var popclass = getPopupClasses(pop);

  useBodyClass("noscroll", pop.on);
  useListener("resize", popupResize, {enabled: pop.on});
  useListener("keydown", seekHandlerWithKeydown, {enabled: pop.on});
  useListener("keydown", closeHandlerWithKeydown, {enabled: pop.on});

  const nav = useNavControls();
  const mouseMoving = useMouseMoving(null, 1000);
  const closeHovered = useHoverAndFocus(nav.close.ref);
  const input = useInputDown(["ArrowRight", "ArrowLeft", "LeftMouse", "RightMouse", "Scroll"]);

  const interaction = useMemo(() => {
    return mouseMoving || closeHovered || input;
  }, [mouseMoving, closeHovered, input]);

  useEffect(() => {
    if (interaction) {
      pop.ui.setVisible(true);
    } else {
      const timeoutId = setTimeout(() => {
        pop.ui.setVisible(false);
      }, 100000);
      return () => clearTimeout(timeoutId);
    }
  }, [interaction]);

  useEffect(() => {
    if (pop.on) {
      if (pop.type == "interactive") canvasInit(pop);
      if (pop.type == "lightbox") lightboxInit(pop);
      if (pop.type == "gallery") galleryInit(pop);
    } else {
      setCanvasImageLoaded(false);
      pop.setGroup(false);
      pop.setIndex(false);
      pop.setImgLoaded(false);
    }
  }, [pop.on]);

  useEffect(() => {
    updatePopupNav(pop, nav);
  }, [pop.img, pop.group, pop.index]);

  const imgRef = useRef(null);
  const imgHeight = useElementHeight(imgRef, { observer: true });
  const popRef = useRef(null);
  const popHeight = useElementHeight(popRef);
  const popWidth = useElementWidth(popRef);
  const descRef = useRef(null);
  const infoRef = useRef(null);

  const [lightboxImgMaxHeight, setLightboxImgMaxHeight] = useState(false);
  const [lightboxImgMaxWidth, setLightboxImgMaxWidth] = useState(false);
  const [lightboxImgAvailHeight, setLightboxImgAvailHeight] = useState(false);
  const [lightboxImgAvailWidth, setLightboxImgAvailWidth] = useState(false);

  const elems = {
    img: {
      ref: imgRef,
      height: imgHeight,
      setMaxHeight: setLightboxImgMaxHeight,
      setMaxWidth: setLightboxImgMaxWidth,
      maxHeight: lightboxImgMaxHeight,
      maxWidth: lightboxImgMaxWidth,
      setAvailHeight: setLightboxImgAvailHeight,
      setAvailWidth: setLightboxImgAvailWidth,
      availHeight: lightboxImgAvailHeight,
      availWidth: lightboxImgAvailWidth,
    },
    popup: {
      ref: popRef,
      height: popHeight,
      width: popWidth,
    },
    desc: {
      ref: descRef,
    },
    info: {
      ref: infoRef,
    },
  };

  const canInteract = useRef(true);

  const debounceInteraction = () => {
    if (!canInteract.current) return false;

    canInteract.current = false;
    setTimeout(() => {
      canInteract.current = true;
    }, popSeekDuration * 1000 * 2 * 1.15);

    return true;
  };

  const closeHandler = useCallback(() => {
    if (!debounceInteraction()) return;

    pop.setOn(false);
    pop.setImgLoaded(false);
    pop.setDrawn(false);
    pop.setImgDrawn(false);
    pop.setInfoDrawn(false);
    pop.setImgReady(false);
    pop.setFirstImgReady(false);
    pop.setFirstImgDrawn(false);
  }, [pop]);

  const seekHandler = useCallback(
    (e, direction) => {
      if (!debounceInteraction()) return;

      var button;

      if (!pop.group) return;

      if (e.type === "click") {
        button = e.target;
        while (!button.classList.contains("popup--seek")) {
          button = button.parentElement;
        }
        direction = direction ? direction : button.classList.contains("popup--seek__right") ? 1 : -1;
      }

      var length = pop.group.imgs.length;

      var ind = pop.index;

      do {
        ind += direction;

        if (ind >= length) ind = 0;
        if (ind < 0) ind = length - 1;

        if (pop.group.imgs[ind].hidden) continue;

        pop.setIndex(ind);
        var img = pop.group.imgs[ind].lightboxImg ? pop.group.imgs[ind].lightboxImg : pop.group.imgs[ind];
        pop.setImg(img);
        pop.setZoom(img.zoom ? img.zoom : false);
        pop.setImgLoaded(false);
        pop.setImgReady(false);
        pop.setImgDrawn(false);

        break;
      } while (pop.group.imgs[ind].hidden);
    },
    [pop]
  );

  const paginationHandler = useCallback(
    (img, i) => {
      if (!debounceInteraction()) return;
      if (pop.group.imgs[i].hidden) return;

      pop.setIndex(i);
      pop.setImg(pop.group.imgs[i]);
      pop.setZoom(img.zoom ? img.zoom : false);
      pop.setImgLoaded(false);
      pop.setImgReady(false);
      pop.setImgDrawn(false);
    },
    [pop]
  );

  function seekHandlerWithKeydown(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      seekHandler(e, e.key === "ArrowRight" ? 1 : -1);
    }
  }

  function closeHandlerWithKeydown(e) {
    if (e.key === "Escape" || e.key === " ") {
      closeHandler();
    }
  }

  function handleSwipeLeft(e) {
    seekHandler(e, 1);
  }

  function handleSwipeRight(e) {
    seekHandler(e, -1);
  }

  const handles = {
    close: closeHandler,
    seek: seekHandler,
    pagination: paginationHandler,
    seekKeydown: seekHandlerWithKeydown,
    closeKeydown: closeHandlerWithKeydown,
    swipeLeft: handleSwipeLeft,
    swipeRight: handleSwipeRight,
  };

  const { isBpAndDown, loading } = bp;

  const stateDesktop = !isBpAndDown("md") && !loading ? true : false;
  const stateMobile = isBpAndDown("md") && !loading ? true : false;
  const stateGallery = pop.type == "gallery";
  const stateMobileGallery = stateMobile && stateGallery;
  const state = {
    desktop: stateDesktop,
    mobile: stateMobile,
    gallery: stateGallery,
    mobileGallery: stateMobileGallery,
  };



  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      handles.close();
    };
  
    router.events.on('routeChangeStart', handleRouteChange);
  
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [handles.close, router]);
  




  return (
    <>
      <Background handles={handles} popclass={popclass} />
      <div className={`popup container ${popclass.container}`} style={popclass.containerStyle} ref={popRef}>
        <div className={`popup--inner ${popclass.inner}`}>
          {pop.type == "lightbox" && <Head pop={pop} nav={nav} popclass={popclass} handles={handles} state={state} />}
          <div className={`popup--content popup--content__on ${popclass.content}`}>
            {pop.type == "interactive" && <Head pop={pop} nav={nav} popclass={popclass} handles={handles} state={state} />}

            {pop.type == "interactive" && <canvas className="popup--canvas popup--canvas__off" />}

            {pop.type == "lightbox" && (
              <>
                <Lightbox pop={pop} nav={nav} handles={handles} popclass={popclass} elems={elems} state={state} />
              </>
            )}

            {pop.type == "gallery" && (
              <>
                <GalInfo pop={pop} popclass={popclass} elems={elems} nav={nav} handles={handles} state={state}>
                  <Lightbox pop={pop} popclass={popclass} elems={elems} nav={nav} handles={handles} state={state} />
                </GalInfo>
              </>
            )}

            {pop.type == "interactive" && <ScaleWrapper pop={pop} nav={nav} state={state} />}
          </div>

          {pop.type == "lightbox" && pop.group && pop.firstImgDrawn && <Controls pop={pop} nav={nav} handles={handles} />}
        </div>
      </div>
    </>
  );

  var isResizing;

  function popupResize() {
    window.clearTimeout(isResizing);
    isResizing = setTimeout(popupResizeFunctions, RESIZE_TIMEOUT);
  }

  function popupResizeFunctions() {
    if (pop.type == "interactive") canvasOnResize();
  }
}

function Lightbox({ pop, nav, handles, popclass, elems, state }) {
  const [timeoutId, setTimeoutId] = useState(null);

  const handleImgLoad = () => {
    const id = setTimeout(() => {
      pop.setImgLoaded(true);
    }, 0);
    setTimeoutId(id);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  function updateAvailHeightAndWidth() {
    var popupElem = elems.popup.ref.current;
    var infoElem = elems.info.ref.current;

    if (infoElem) {
      if (state.desktop) {
        var gapWidth = splitRem(window.getComputedStyle(popupElem).getPropertyValue("--popup-gap"));
        var scrollbarWidth = infoElem.offsetWidth - infoElem.clientWidth;
        var infoWidth =
          splitPx(window.getComputedStyle(infoElem).width) +
          splitPx(window.getComputedStyle(infoElem).paddingLeft) +
          splitPx(window.getComputedStyle(infoElem).paddingRight) +
          scrollbarWidth;
        var availHeight = popupElem.offsetHeight;
        var availWidth = popupElem.offsetWidth - gapWidth - infoWidth;
      } else {
        var contentChildren = Array.from(infoElem.parentElement.children).filter((elem) => {
          return getComputedStyle(elem).position !== "absolute";
        });
        var contentRows = contentChildren.length;

        var gapWidth = splitRem(window.getComputedStyle(popupElem).getPropertyValue("--popup-gap"));
        gapWidth = gapWidth * (contentRows - 1);

        var infoHeight = (() => {
          var infos = contentChildren.filter((elem) => {
            return elem.classList.contains("popup--info");
          });

          var result = 0;
          for (var i = 0; i < infos.length; i++) {
            result +=
              splitPx(window.getComputedStyle(infos[i]).height) +
              splitPx(window.getComputedStyle(infos[i]).paddingTop) +
              splitPx(window.getComputedStyle(infos[i]).paddingBottom);
          }
          return result;
        })();

        var availHeight = popupElem.offsetHeight - infoHeight - gapWidth;
        var availWidth = popupElem.offsetWidth;
      }
    } else {
      var availHeight = popupElem.offsetHeight;
      var availWidth = popupElem.offsetWidth;
    }

    if (availHeight !== elems.img.availHeight) {
      elems.img.setAvailHeight(availHeight);
    }
    if (availWidth !== elems.img.availWidth) {
      elems.img.setAvailWidth(availWidth);
    }

    return { availHeight, availWidth };
  }

  function updateMaxHeightAndWidth(availHeight, availWidth) {
    var aspectWidth = Number(pop.img.aspect?.split("/")?.[0] || pop.img.width);
    var aspectHeight = Number(pop.img.aspect?.split("/")?.[1] || pop.img.height);

    // Calculate aspect ratio
    var aspectRatio = aspectWidth / aspectHeight;

    // Calculate scaled dimensions based on aspect ratio
    var scaledWidth = availHeight * aspectRatio;
    var scaledHeight = availWidth / aspectRatio;

    // Check which dimension should be adjusted based on available dimensions
    if (scaledWidth <= availWidth) {
      var maxHeight = availHeight;
      var maxWidth = scaledWidth;
    } else {
      var maxHeight = scaledHeight;
      var maxWidth = availWidth;
    }

    // Update maxHeight and maxWidth state only if their values have changed
    if (maxHeight !== elems.img.maxHeight) {
      elems.img.setMaxHeight(maxHeight);
    }
    if (maxWidth !== elems.img.maxWidth) {
      elems.img.setMaxWidth(maxWidth);
    }

    if (availHeight !== elems.img.availHeight) {
      elems.img.setAvailHeight(availHeight);
    }
    if (availWidth !== elems.img.availWidth) {
      elems.img.setAvailWidth(availWidth);
    }

    return { maxHeight, maxWidth };
  }

  useLayoutEffect(() => {
    let isMounted = true;

    const ensureElementReferences = () =>
      new Promise((resolve) => {
        if (pop.type === "gallery") {
          if (!elems.popup.ref.current || !elems.info.ref.current) {
            if (isMounted) {
              setTimeout(() => resolve(ensureElementReferences()), 100);
            }
          } else {
            resolve();
          }
        } else if (pop.type === "lightbox") {
          if (!elems.popup.ref.current) {
            if (isMounted) {
              setTimeout(() => resolve(ensureElementReferences()), 100);
            }
          } else {
            resolve();
          }
        } else {
          return;
        }
      });

    const ensurePopupScale = () =>
      new Promise((resolve) => {
        if (pop.type === "gallery") {
          if (elems.popup.height === 0 || elems.popup.width === 0) {
            if (isMounted) {
              setTimeout(() => resolve(ensurePopupScale()), 100);
            }
          } else {
            resolve();
          }
        } else if (pop.type === "lightbox") {
          resolve();
        }
      });

    const ensurePopDrawn = () =>
      new Promise((resolve) => {
        if (!pop.drawn) {
          if (isMounted) {
            setTimeout(() => resolve(ensurePopDrawn()), 100);
          }
        } else {
          resolve();
        }
      });

    // const ensureImgLoaded = () =>
    //   new Promise((resolve) => {
    //     if (!pop.imgLoaded) {
    //       if (isMounted) {
    //         setTimeout(() => resolve(ensureImgLoaded()), 100);
    //       }
    //     } else {
    //       resolve();
    //     }
    //   });

    const mainFunction = async () => {
      await ensureElementReferences();
      // if (!elems.popup.ref.current) return;
      await ensurePopupScale();
      await ensurePopDrawn();

      const { availHeight, availWidth } = updateAvailHeightAndWidth();
      const { maxHeight, maxWidth } = updateMaxHeightAndWidth(availHeight, availWidth);

      pop.setImgReady(true);

      if (!pop.firstImgReady) {
        pop.setFirstImgReady(true);
      }
    };

    mainFunction();

    return () => {
      isMounted = false;
    };
  }, [elems.popup.height, elems.popup.width, pop.img, pop.drawn, state.desktop, pop.infoDrawn]);

  const [drawLightbox, setDrawLightbox] = useState(false);
  useEffect(() => {
    if ((elems.img.availWidth && elems.img.availHeight && elems.img.maxWidth && elems.img.maxHeight) || pop.type === "lightbox") {
      if (!drawLightbox) setDrawLightbox(true);
    }
  }, [elems.img.availWidth, elems.img.availHeight, elems.img.maxWidth, elems.img.maxHeight, pop.type]);

  useEffect(() => {
    swipeEventsInit();
  }, []);

  const mediaWrapperRef = useRef(null);
  useListener("swiped-left", handles.swipeLeft, {ref: mediaWrapperRef});
  useListener("swiped-right", handles.swipeRight, {ref: mediaWrapperRef});

  return (
    <>
      <AnimPres
        mode="wait"
        animation={popAnims.slideFade}
        condition={drawLightbox}
        className={`popup--media-wrapper ${popclass.mediaWrapper}
           ${!pop.imgLoaded ? "popup--media-wrapper__loading" : ""}`}
        style={{
          "--aspect-width": Number(pop.img.aspect?.split("/")?.[0] || pop.img.width),
          "--aspect-height": Number(pop.img.aspect?.split("/")?.[1] || pop.img.height),
        }}
        elemkey={pop.img.src}
        duration={popSeekDuration}
        delay={pop.firstImgDrawn ? 0 : 0.3}
        onAnimationComplete={() => {
          pop.setImgDrawn(true);
          if (!pop.firstImgDrawn) pop.setFirstImgDrawn(true);
        }}
        reference={mediaWrapperRef}>
        <Graphic
          reference={elems.img.ref}
          className={`popup--media ${popclass.media} ${!pop.imgLoaded ? "popup--media__loading" : ""}`}
          img={pop.img}
          type={pop.img.media}
          autoplay
          controls
          onLoad={handleImgLoad}
          style={{
            "--img-avail-width": `${elems.img.availWidth}px`,
            "--img-avail-height": `${elems.img.availHeight}px`,
            "--img-max-width": `${elems.img.maxWidth}px`,
            "--img-max-height": `${elems.img.maxHeight}px`,
          }}
        />

        {pop.imgReady && (
          <div
            className={`
            loading--wrapper 
            ${(!pop.imgReady || pop.imgLoaded) && "loading--wrapper__hidden"}
            ${pop.zoom && "loading--wrapper__zoom"}
            ${pop.zoom && pop.type == "lightbox" && "loading--wrapper__lightbox-zoom"}
            `}
            style={{
              "--img-max-width": `${elems.img.maxWidth}px`,
              "--img-max-height": `${elems.img.maxHeight}px`,
              "--img-avail-width": `${elems.img.availWidth}px`,
              "--img-avail-height": `${elems.img.availHeight}px`,
            }}>
            <div className={`loading--img`}>
              <img src={loading_white.src} alt={loading_white.alt} width={loading_white.width} height={loading_white.height} />
            </div>
          </div>
        )}
      </AnimPres>

      {pop.type == "gallery" && pop.group && pop.firstImgDrawn && pop.infoDrawn && (
        <>
          <Controls className="popup--controls__gallery" pop={pop} nav={nav} handles={handles} state={state} />
        </>
      )}
    </>
  );
}

function Background({ handles, popclass }) {
  return <div className={`popup--background ${popclass.background}`} onClick={handles.close}></div>;
}

function Head({ pop, nav, popclass, handles, state }) {
  const type = pop.type;
  const isLightbox = type == "lightbox";
  const isInteractive = type == "interactive";
  const isGallery = type == "gallery";
  return (
    <>
      {isLightbox && pop.firstImgDrawn && <Close pop={pop} nav={nav} handles={handles} popclass={popclass} state={state} />}
      {!isLightbox && (
        <div className={`popup--header ${popclass.header} popup--nav`}>
          <Title pop={pop} />
          {isInteractive && <Close pop={pop} nav={nav} handles={handles} popclass={popclass} state={state} />}
        </div>
      )}
    </>
  );
}

function Title({ pop }) {
  return (
    <>
      {pop.type == "interactive" && (
        <div className="popup--title">
          <h3>{pop.img.title}</h3>
        </div>
      )}
    </>
  );
}

const Controls = React.memo(function Controls({ pop, nav, handles, className }) {
  return (
    <AnimPres
      mode="wait"
      animation={popAnims.fade}
      condition={true}
      className={`popup--controls ${className ? className : ""}`}
      layout="position"
      style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
      transition={{
        layout: { duration: popLayoutTransition },
      }}>
      <Seek direction="left" nav={nav} handles={handles} />
      <Pagination pop={pop} handles={handles} />
      <Seek direction="right" nav={nav} handles={handles} />
    </AnimPres>
  );
}, createUpdateConditions(["pop.img", "pop.group", "nav.left.on", "nav.right.on"]));

function Seek({ direction, nav, handles }) {
  var btn = direction === "left" ? nav.left : nav.right;
  return (
    <div className={`popup--seek popup--seek__${direction} ${btn.classList}`} ref={btn.ref}>
      <Anim animation={classAnims.hideBtns} condition={btn.on}>
        <Button icon={[`chevron_${direction}`, "alone", "mask"]} animation={`pulse-${direction}`} color="background-primary" onClick={handles.seek} />
      </Anim>
    </div>
  );
}

function shouldDisplayCircle(currentIndex, totalImages, circleIndex) {
  const maxCircles = 5;

  const circleRange = Math.floor(maxCircles / 2);
  const startIndexToShowAll = maxCircles - circleRange - 1;
  const endIndexToShowAll = maxCircles - circleRange - 1;

  let display, end, paginationIndex;

  if (totalImages <= maxCircles) {
    display = true;
    end = false;
    paginationIndex = circleIndex;
  } else if (currentIndex <= startIndexToShowAll) {
    display = circleIndex < maxCircles;
    end = circleIndex === maxCircles - 1;
    paginationIndex = circleIndex;
  } else if (currentIndex >= totalImages - endIndexToShowAll) {
    display = circleIndex >= totalImages - maxCircles;
    end = circleIndex === totalImages - maxCircles;
    paginationIndex = circleIndex - (totalImages - maxCircles);
  } else {
    display = circleIndex >= currentIndex - circleRange && circleIndex <= currentIndex + circleRange;
    end = circleIndex === currentIndex + circleRange || circleIndex === currentIndex - circleRange;
    paginationIndex = circleIndex - (currentIndex - circleRange);
  }

  return { display, end, paginationIndex };
}

const Pagination = React.memo(function Pagination({ pop, handles }) {
  const currentIndex = pop.index;
  const totalImgCount = pop.group?.imgs?.filter((img) => !img.hidden).length || 0;

  return (
    <div className="popup--pagination">
      {pop.group?.imgs?.map((img, i) => {
        const { display, end } = shouldDisplayCircle(currentIndex, totalImgCount, i);
        if (img.hidden || !display) return null;

        return (
          <motion.div
            layout="position"
            duration={0.4}
            key={i}
            style={{
              opacity: 1,
            }}>
            <Circle
              active={i === pop.index}
              key={`circle ${img.src}`}
              end={end}
              display={display}
              index={i}
              current={pop.index}
              onClick={() => {
                handles.pagination(img, i);
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );

  function Circle({ active, end, onClick, index, current }) {
    const classes = `${active ? "popup--circle__active" : "popup--circle__inactive"}${end ? " popup--circle__end" : ""}`;

    return (
      <a className={`popup--circle ${classes}`} onClick={onClick}>
        <div className={`popup--circle-inner ${end ? "popup--circle-inner__end" : ""}`}></div>
      </a>
    );
  }
}, createUpdateConditions(["pop.group", "pop.index"]));

function Close({ pop, nav, popclass, handles, type = "lightbox", state }) {
  // const condition = pop.ui.visible || pop.type === "interactive" || pop.type == "gallery" || !state.desktop;
  const condition = true;

  const col = (() => {
    // if (type === "lightbox") {
    //   return "transparent-primary";
    // } else if (type === "gallery") {
    //   return "transparent-background";
    // } else {
    //   return "transparent-primary";
    // }
    if (type === "gallery" || type == "lightbox") {
      return "transparent-background";
    } else {
      return "transparent-primary";
    }
  })();

  return (
    <AnimPres animation={popAnims.hideUI} condition={condition} className={`popup--close ${popclass.close}`} reference={nav.close.ref}>
      <Button icon={["close", "alone", "mask"]} animation="scale-in" color={col} onClick={handles.close} />
    </AnimPres>
  );
}

function ScaleWrapper({ pop, nav, state }) {
  const condition = pop.ui.visible || !state.desktop;

  return (
    <AnimPres animation={popAnims.hideUI} condition={condition} className="popup--footer popup--nav">
      <Scale className="popup--scale" pop={pop} nav={nav} />
    </AnimPres>
  );
}

function Scale({ pop, nav, className }) {
  var def = 10;

  return (
    <div className={`scale ${className ? className : ""}`}>
      <div className="scale--zoom scale--minus">
        <Button id="zoom-out" icon={["minus", "alone", "mask"]} animation="scale-out" color="transparent-primary" onClick={canvasZoom} />
      </div>

      <div className="scale--slider">
        <div className="scale--end"></div>
        <input type="range" min={minZoom * 100} max={maxZoom * 100} defaultValue={def} className="scale--input" id="popupZoom" onInput={canvasZoom} />
        <div className="scale--end"></div>
      </div>

      <div className="scale--zoom scale--plus">
        <Button id="zoom-in" icon={["plus", "alone", "mask"]} animation="scale-out" color="transparent-primary" onClick={canvasZoom} />
      </div>
    </div>
  );
}

function useNavControls() {
  const [navRightOn, setNavRightOn] = useState(false);
  const [navLeftOn, setNavLeftOn] = useState(false);
  const [navRightClasses, setNavRightClasses] = useState("popup--seek__on");
  const [navLeftClasses, setNavLeftClasses] = useState("popup--seek__on");

  const navCloseRef = useRef(null);

  return {
    left: {
      on: navLeftOn,
      setOn: setNavLeftOn,
      classList: navLeftClasses,
      setClassList: setNavLeftClasses,
    },
    right: {
      on: navRightOn,
      setOn: setNavRightOn,
      classList: navRightClasses,
      setClassList: setNavRightClasses,
    },
    close: {
      ref: navCloseRef,
    },
    scale: {},
  };
}

function Anim({ children, animation, condition, className, style }) {
  const controls = useAnimation();

  const [classList, setClassList] = useState((className ? className : "").split(" "));
  const [classNames, setClassNames] = useState(className ? className : "");

  const classes = {
    list: classList,
    setList: setClassList,
    names: classNames,
    setNames: setClassNames,
  };

  useEffect(() => {
    if (condition) {
      if (typeof animation.in === "string") {
        addClass(animation.in, animation.out);
      } else {
        controls.start(animation.in.animate);
      }
    } else {
      if (typeof animation.out === "string") {
        addClass(animation.out, animation.in);
      } else {
        controls.start(animation.out.exit);
      }
    }
  }, [condition, animation, controls]);

  useEffect(() => {
    classes.setNames(classes.list.join(" "));
  }, [classes.list]);

  function addClass(newClass, oppositeClass) {
    classes.setList((prevClassList) => {
      let updatedClassList = prevClassList.filter((cls) => cls !== oppositeClass);
      if (!updatedClassList.includes(newClass)) {
        updatedClassList.push(newClass);
      }
      return updatedClassList;
    });
  }

  return (
    <motion.div animate={controls} className={classNames} style={style ? style : {}}>
      {children}
    </motion.div>
  );
}

export default Popup;

// export { waitToLoad, setWaitingToShowLoading };

export { startZoom, minZoom, maxZoom };
export { Close };
