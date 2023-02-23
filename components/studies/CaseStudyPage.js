import { StudyPanel } from "../elements/Panel";
import Section from "../sections/Sections";
import Brief from "./Brief";
import NextStudies from "./NextStudies";
import StudyProgress from "./StudyProgress";

function CaseStudyPage({ id, study, children }) {

  return (
    <div id={id} className="casestudy">


      <StudyProgress/>

      <StudyPanel variant="study" study={study} />

      <Brief brief={study.brief} />


      {children}

      <Section type="passthrough"><NextStudies study={study} /></Section>

    </div>
  );
}

export default CaseStudyPage;
