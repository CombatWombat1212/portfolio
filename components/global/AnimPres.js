import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function AnimPres({
  children,
  animation,
  condition,
  className,
  mode,
  delay,
  style,
  elemkey,
  onAnimationComplete,
  duration,
  reference,
  layout,
  initial: initialProp,
  fragment = false,
    transition: transitionProp = {},

}) {
  const hasInOutAnimation = animation.in && animation.out;
  const hasHiddenVisibleAnimation = animation.hidden && animation.visible;

  const initial = initialProp !== undefined ? initialProp : hasInOutAnimation ? animation.in.initial : "hidden";
  const animate = hasInOutAnimation ? animation.in.animate : "visible";
  const exit = hasInOutAnimation ? animation.out.exit : "exit";

  const defaultTransition = {
    duration: 0,
    delay: 0,
  };

  const applyTransitionOverrides = (animType) => {
    if (!animType || !animType.transition) return animType;

    return {
      ...animType,
      transition: {
        ...animType.transition,
        ...(transitionProp ? transitionProp : {}),
        duration:
          duration !== undefined ? duration : animType.transition.duration !== undefined ? animType.transition.duration : defaultTransition.duration,
        delay: delay !== undefined ? delay : animType.transition.delay !== undefined ? animType.transition.delay : defaultTransition.delay,
      },
    };
  };

  if (hasHiddenVisibleAnimation) {
    animation.hidden = applyTransitionOverrides(animation.hidden);
    animation.visible = applyTransitionOverrides(animation.visible);
    animation.exit = applyTransitionOverrides(animation.exit);
  }

  const variants = hasHiddenVisibleAnimation ? animation : undefined;

  const transition = hasInOutAnimation
    ? {
        ...animation.in.transition,
        ...(transitionProp ? transitionProp : {}),
        duration:
          duration !== undefined
            ? duration
            : animation.in.transition.duration !== undefined
            ? animation.in.transition.duration
            : defaultTransition.duration,
        delay: delay !== undefined ? delay : animation.in.transition.delay !== undefined ? animation.in.transition.delay : defaultTransition.delay,
      }
    : defaultTransition;

  return (
    <AnimatePresence mode={mode ? mode : "sync"}>
    {condition &&
      (fragment ? (
        <>{renderMotionDiv()}</>
      ) : (
        renderMotionDiv()
      ))}
  </AnimatePresence>
  );



  function renderMotionDiv() {
    return (
      <motion.div
        key={elemkey ? elemkey : "anim"}
        initial={initial}
        animate={animate}
        exit={exit}
        variants={variants}
        transition={transition}
        className={className ? className : ""}
        style={style ? style : {}}
        ref={reference}
        onAnimationComplete={onAnimationComplete ? onAnimationComplete : () => {}}
        {...(layout !== undefined ? { layout: layout } : {})}>
        {children}
      </motion.div>
    );
  }
  
}

export default AnimPres;