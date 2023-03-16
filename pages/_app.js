import "../styles/style.css";
import Layout from "../components/navigation/Layout";

import { useMountEffect } from "/scripts/hooks/useMountEffect";
import { postScreenSizeToRoot } from "/scripts/GlobalUtilities";
import Popup from "@/components/global/popup/Popup";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { getStudy } from "@/scripts/GetStudy";
import usePageTransition from "@/scripts/hooks/usePageTransition";
import useEllipse from "@/scripts/hooks/useEllipse";
import Footer from "@/components/navigation/Footer";
import LoadingScreen from "@/components/navigation/LoadingScreen";

export default function App({ Component, pageProps }) {
  // TODO: add an easy out for people on the case study pages.  either a next or back button, skip to bottom, something that will allow them to quickly bounce around case studies

  // I am not currently using this
  useMountEffect(() => {
    postScreenSizeToRoot();
  });

  const [popup, setPopup] = useState(false);
  const router = useRouter();

  // const [isReadyToAnimate, setIsReadyToAnimate] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [chosen, setChosen] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState([...loadingMessages]);

  
  // var dur = 0.65;
  var dur = 0.65;
  var delay = 0.1;

  useEffect(() => {
    setShowLoading(true);
    setLoaded(true);
  }, [router.route]);

  useEffect(() => {
    if (loaded) return;
    setTransitioning(true);
  }, [router.route, loaded]);

  const { isEntering, getTransitionVariant } = usePageTransition(incomingVariants, outgoingVariants);
  const transitionVariant = getTransitionVariant(isEntering);


  const chooseRandomMessage = () => {
    const index = Math.floor(Math.random() * unseenMessages.length);
    const chosenMessage = unseenMessages[index];
    setUnseenMessages(unseenMessages.filter((_, i) => i !== index));
    return chosenMessage;
  };

  useEffect(() => {
    if (unseenMessages.length === 0) {
      setUnseenMessages([...loadingMessages]);
    }
  }, [unseenMessages]);

  useEffect(() => {
    setChosen(chooseRandomMessage());
  }, []);

  const handleTransitionEnd = () => {
    if (transitioning) {
      setLoaded(true);
      setTransitioning(false);
      setTimeout(() => {
        setChosen(chooseRandomMessage());
        setTimeout(() => {
          setShowLoading(false);
        }, 500);
      }, dur * 1000 + 500);
    }
  };

  // TODO right now if you scroll down a page really fast on a laggy machine you can see the scroll page behind it, so we should update this so that theres actually an element in between the two pages rather than just the background behind them

  return (
    <>
      <Layout>
        <Popup popup={popup} setPopup={setPopup} />

        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "instant",
            });
            setLoaded(false);
          }}>
          <motion.div
            key={router.route}
            initial={loaded ? (isEntering ? "initialState" : "exitState") : "initialState"}
            animate={loaded ? (isEntering ? "animateState" : "exitState") : "initialState"}
            exit={loaded ? (isEntering ? "initialState" : "exitState") : "initialState"}
            className="base-page-size"
            transition={{
              duration: dur,
              ease: "backInOut",
            }}
            variants={transitionVariant}
            onTransitionEnd={handleTransitionEnd}>
            <Component popup={popup} setPopup={setPopup} />
            <Footer />
          </motion.div>
        </AnimatePresence>

        <LoadingScreen showLoading={showLoading} chosen={chosen} />

      </Layout>
    </>
  );
}

const loadingMessages = [`hol up...`, `<i>*elevator music*</i>`, `catch the game last night?`, `lemme grab that for ya`, `Ensure your Wii remote strap is tightly secured`, `Wanna do something after this?`, `We should do this more often`, `<i>shawty like a melody</i>`, `right this way`, `<i>*utz utz utz*</i>`, `lemme check the back...`, `who turned off the lights?`, `<i>*dial-up noises*</i>`, `bleep bloop`, `now where did i put that...`, `ouu good choice`, `niceee`, `<i>*crickets*</i>`];

const incomingVariants = {
  initialState: {
    // overflow: "hidden",
    clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
  },
  animateState: {
    // overflow: "hidden",
    clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
  },
  exitState: {
    // overflow: "hidden",
    clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
  },
};

const outgoingVariants = {
  initialState: {
    // overflow: "hidden",
    clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
  },
  animateState: {
    // overflow: "hidden",
    clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
  },
  exitState: {
    // overflow: "hidden",
    clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)",
  },
};
