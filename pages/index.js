//Libraries
// import Image from "next/image";

//Data
import CASE_STUDIES from "@/data/CASE_STUDIES";

//Utilities

//Components
import { PanelWrapper, PanelDesc, PanelImg, Panel, StudyPanel } from "@/components/elements/Panel";
import Mask from "/components/utilities/Mask";
import { useEffect, useState } from "react";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import useRandomCaptions from "@/scripts/hooks/useRandomCaptions";

function Index() {
  const captions = ["Have a look-see", "Take a gander", "Check it", "I must know", "Gimme", "Go on...", "Do tell", "I'm all ears"];

  const chosen = useRandomCaptions(captions, CASE_STUDIES.length);

  return (
    <>
      <PanelWrapper id="Home" variant="home">
        <Panel id="Home--Hero" type="img-desc" className={`studypanel studypanel__home`}>
          <PanelDesc variant={"home"}>
            <h1 className="studypanel--heading">
              <span className="studypanel--title d-md-none">Hi,</span>

              <span className="studypanel--title d-sm-block d-none">
                Hi I&apos;m&nbsp;
                <br className="d-sm-block d-none" />
              </span>

              <span className="studypanel--title d-sm-none">
                I&apos;m&nbsp;
                <br className="d-sm-block d-none" />
              </span>

              <span className="studypanel--title color--secondary">Sam Giustizia</span>
              <span className="studypanel--title">
                ,<br />
                how are you?
              </span>
            </h1>
            {/* TODO: i really think this should be 2 lines not 3.  More about length than of element size, i think you can trim it a bit */}
            <h3 className="studypanel--subheading">
              I&apos;m a multidisciplinary designer,
              <br className="d-md-none " /> and maker of digital solutions,
              <br className="d-md-none " /> tailor-fitted to real-world problems.
            </h3>

            <p className="studypanel--paragraph text--body">This is my portfolio. Enjoy your stay :)</p>
          </PanelDesc>
          <PanelImg>
            {/* TODO: fix now that i know what the standard is here */}
            <Mask src="/assets/images/flair/Arrow_Squiggle.svg" alt="Squiggly arrow pointing downwards" width={160.42} height={248.06} />
          </PanelImg>
        </Panel>
      </PanelWrapper>

      {CASE_STUDIES.map((item) => {
        var caption = chosen[CASE_STUDIES.indexOf(item)];
        return <StudyPanel id={`Home--${item.id}`} key={item.key} variant="home" study={item} button={caption} />;
      })}
    </>
  );
}

export default Index;
