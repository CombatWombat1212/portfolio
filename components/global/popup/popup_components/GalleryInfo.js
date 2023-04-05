import { AnimatePresence, motion, useAnimation, useIsPresent } from "framer-motion";

import Tag from "@/components/elements/Tag";
import { createUpdateConditions } from "@/scripts/GlobalUtilities";
import React, { useEffect, useState } from "react";
import AnimPres from "../../AnimPres";
import popAnims, { popLayoutTransition } from "../popup_utilities/PopupAnimations";
import useDelayedProps from "@/scripts/hooks/useDelayedProps";
import { Close } from "../Popup";
import useHasScrollbar from "@/scripts/hooks/useHasScrollbar";

const GalInfo = React.memo(function GalInfo({ pop, popclass, elems, nav, handles }) {
  var title, subheading;
  if (pop.img.project) {
    title = pop.img.project;
    subheading = pop.img.title;
  } else if (pop.img.title) {
    title = pop.img.title;
  } else {
    title = false;
  }

  // might have to add elems.img.maxHeight to dependencies idk
  const styles = {
    description: {
      "--gallery-img-height": `${elems.img.height != 0 && elems.img.height}px`,
      "--gallery-img-max-height": `${elems.img.maxHeight != 0 && elems.img.maxHeight}px`,
    },
  };

  var hasDesc = pop.img.description || (pop.group.description && pop.group.description[pop.index]);

  const scrollbar = useHasScrollbar(elems.desc.ref, {
    observer: true,
    debounceTime: 0,
    repeatChecks: 3,
    repeatChecksDebounceTime: 100,
  });
  const scrollbarClasses = scrollbar ? "popup--description__gallery-scrollbar" : "";

  useEffect(() => {
    console.log(scrollbar);
  }, [scrollbar]);

  return (
    <>
      <motion.div
        layout="position"
        transition={{
          // y: { duration: 0.5 },
          layout: { duration: popLayoutTransition },
        }}
        className="popup--info">
        {pop.firstImgDrawn && (
          <AnimPres
            mode="wait"
            fragment
            animation={popAnims.slideFade}
            // delay={0.55}
            condition={true}
            reference={elems.desc.ref}
            className={`popup--description ${popclass.desc} ${scrollbarClasses}`}
            style={styles.description}
            onAnimationComplete={() => {
              pop.setInfoDrawn(true);
            }}>
            <h3 type="h3" className="gallery--title" dangerouslySetInnerHTML={{ __html: title }} />
            {subheading && <h5 className="gallery--subheading">{subheading}</h5>}

            <div className="gallery--info">
              {hasDesc && <GalDescription pop={pop} />}
              <GalCategories pop={pop} hasDesc={hasDesc} />
            </div>
          </AnimPres>
        )}

        {pop.firstImgDrawn && pop.infoDrawn && <Close pop={pop} nav={nav} handles={handles} popclass={popclass} type="gallery" />}
      </motion.div>
    </>
  );
}, createUpdateConditions(["pop.index", "pop.img", "elems.img.height", "pop.firstImgDrawn", "pop.infoDrawn"]));
// }, createUpdateConditions(["pop.index", "pop.img", "elems.img.height"]));

const GalCategories = React.memo(function GalCategories({ pop, hasDesc }) {
  var catclasses = hasDesc ? "" : "gallery--categories__no-desc";

  return (
    <div className={`gallery--categories ${catclasses}`}>
      {pop.img.disciplines.map((item, i) => {
        return (
          <Tag key={`${item.key} ${i}`} color={"inverted"}>
            {item}
          </Tag>
        );
      })}
      {pop.img.tools.map((item, i) => {
        return (
          <Tag key={`${item.key} ${i}`} color={"inverted"} variant={"tool"}>
            {item}
          </Tag>
        );
      })}
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