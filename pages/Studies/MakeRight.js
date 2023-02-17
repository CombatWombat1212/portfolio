import { StudyPanel } from "@/components/elements/Panel";
import getStudy from "../../scripts/GetStudy";
import CaseStudyPage from "/components/studies/CaseStudyPage";
import Brief from "/components/studies/Brief";
import { Section, Chapter, Title, Column, Heading, Description, Graphic, Quote } from "@/components/sections/Sections";
import MAKERIGHT_IMGS from "/data/MAKERIGHT_IMGS";
import Gantt from "/components/charts/Gantt";
import BarGraph from "@/components/charts/BarGraph";
import DLink from "@/components/utilities/DynamicLink";
import PieChart from "@/components/charts/PieChart";
import Button from "@/components/elements/Buttons";
import Slideshow from "@/components/global/slideshow/Slideshow";

// TODO: add the interactive chapter selection thingy

function MakeRight({ setPopup }) {
  const study = getStudy();

  return (
    <>
      <CaseStudyPage id={study.id}>
        <StudyPanel variant="study" study={study} />

        <Brief brief={study.brief} />

        <Chapter id="Overview" name="Overview">
          <Section id="Overview--Background" type="overview">
            <Title>Background</Title>
            <Heading>3D printing is yet to reach its full potential</Heading>
            <Description>
              <p>
                Offering endless customization, cheap manufacturing, and fast production speeds.
                <br />
                3D printing has a vast potential to benefit everyday consumers.
              </p>
              <p>In the early 2010s, we were told they would be found in every home; giving consumer’s the power to create anything. But its barriers were too great to reach these expectations, and this reality fell flat. Now, 3D printing hardly has any impact on the average consumer’s life.</p>
            </Description>

            <Graphic type="image" img={MAKERIGHT_IMGS["full_potential"]} />
          </Section>

          <Section id="Overview--Challenge" type="overview">
            <Title>Challenge</Title>
            <Heading>
              Cost, and technical knowledge
              <br />
              stand in the way of mass adoption
            </Heading>
            <Description>
              <p>Owning a 3D printer is a steep upfront investment, and learning to use it is a massive time sink. Even then, users without 3D modelling experience will still be restricted to making premade objects.</p>
              <p>There needs to be a way to eliminate these barriers so that 3D printing can reach its full potential. Allowing average consumers to access the benefits of the technology.</p>
            </Description>

            <Graphic type="image" img={MAKERIGHT_IMGS["barriers_to_entry"]} />
          </Section>

          <Section id="Overview--Opportunity">
            <Title>Opportunity</Title>
            <Heading>How might we remove these barriers, and translate the benefits of 3D printing to the average consumer?</Heading>
          </Section>
        </Chapter>

        <Chapter name="Pitch" id="Pitch" background="makeright tertiary">
          <Section id="Pitch--Hero-Logo" type="logo banner" background="primary" align="just-center">
            <Graphic type="mask" img={MAKERIGHT_IMGS["makeright_logo"]} />
          </Section>

          <Section id="Pitch--Solution" background="background">
            <Title>Solution</Title>
            <Heading>
              Directly connect consumers with owners of 3D printers
              <br />
              for stress-free, low-cost production.
            </Heading>
          </Section>

          {/* TODO: go back and add the scrolling animations and fancy engineering planned for this section */}

          <Section id="Pitch--Choose" type="pitch" margin="wide">
            <Heading>Choose</Heading>
            <Description>
              <p>
                from our collection <br />
                of sourced 3D models,
                <br /> or upload your own
              </p>
            </Description>
            <Graphic type="mask" img={MAKERIGHT_IMGS["pitch_choose"]} />
            <Graphic type="image" img={MAKERIGHT_IMGS["pitch_laptop_choose"]} />
          </Section>

          <Section id="Pitch--Tweak" type="pitch" margin="wide">
            <Heading>Tweak</Heading>
            <Description>
              <p>
                and personalize
                <br />
                to suit your needs
              </p>
            </Description>
            <Graphic type="mask" img={MAKERIGHT_IMGS["pitch_tweak"]} />
            <Graphic type="image" img={MAKERIGHT_IMGS["pitch_laptop_tweak"]} />
          </Section>

          <Section id="Pitch--Order" type="pitch" margin="wide">
            <Heading>Order</Heading>
            <Description>
              <p>
                your model, assigning it <br />
                to one of our verified makers
              </p>
            </Description>
            <Graphic type="mask" img={MAKERIGHT_IMGS["pitch_order"]} />
            <Graphic type="image" img={MAKERIGHT_IMGS["pitch_laptop_order"]} />
          </Section>

          <Section id="Pitch--Recieve" type="pitch" margin="wide">
            <Heading>Recieve</Heading>
            <Description>
              <p>right at your front door</p>
            </Description>
            <Graphic type="mask" img={MAKERIGHT_IMGS["pitch_recieve"]} />
            <Graphic type="image" img={MAKERIGHT_IMGS["pitch_laptop_recieve"]} />
          </Section>

          <Section id="Pitch--Summary" type="columns" background="background">
            <Column>
              <Heading type="h3">Slashing the overhead of competitors</Heading>
              <Description>
                <p>Competing services ruin the low-cost benefits of 3D printing by charging steep overhead fees. Created by having countless technicians and printers operating under one roof.</p>
                <p>MakeRight undercuts this overhead by connecting customers directly to makers. Only charging them for the work of one technician, paid to run their own equipment.</p>
              </Description>
            </Column>
            <Column>
              <Heading type="h3">
                Operating much like an &apos;Uber&apos;
                <br />
                for 3D prints from local makers.
              </Heading>
              <Description>
                <p>Giving customers access to 3D printing&apos;s low-cost, customizable production, without owning or operating the technology. While also enabling hobbyist makers to profit off their skills and equipment. </p>
              </Description>
            </Column>
          </Section>
        </Chapter>

        <Chapter name="Plan" id="Plan">
          <Section id="Plan--Banner" background={MAKERIGHT_IMGS["building_makeright_banner"]}>
            <Heading>Building MakeRight</Heading>
          </Section>

          <Section id="Plan--Gantt" className="flex-col">
            <Title>Project Plan</Title>
            <Heading>Project phases and timeline</Heading>
            <Gantt study="MakeRight" />
          </Section>
        </Chapter>

        <Chapter name="Research" id="Research">
          <Section id="Research--Approach" type="columns" titled arrows background="background darker">
            <Title>Approach</Title>
            <Heading>Finding a focus within the field of 3D printing</Heading>

            <Column>
              <Graphic type="mask" background="background" img={MAKERIGHT_IMGS["secondary_research"]} />
              <Description type="h3" className="graphic--caption">
                <b>Secondary research</b> for high-level context of the 3D printing world
                {/* <b>Secondary research</b> to understand a high level context of the 3D printing world */}
              </Description>
            </Column>
            <Column>
              <Graphic type="mask" background="background" img={MAKERIGHT_IMGS["interviews"]} />
              <Description type="h3" className="graphic--caption">
                {/* <b>Interviews & surveys</b> to understand peoples’ experiences at a lower level */}
                <b>Interviews & surveys</b> to understand users&apos; experiences at a lower level
              </Description>
            </Column>
          </Section>

          <Section id="Research--Limits" background="background darkest" className="flex-col">
            <Title>Secondary Research</Title>
            <Heading>
              Cost and knowledge gaps prevent adoption and use, <br />
              while hobbyist printers sit idle
            </Heading>
          </Section>

          <Section id="Research--Factors" className="flex-col" background="background darkest">
            <Heading type="h3">What factors limit the adoption of 3D printing?</Heading>
            <BarGraph study="MakeRight" graph="Limiting Factors" type="default" />
            {/* TODO: link to source */}
            <Description>
              <p>
                <DLink>Source, Sculpteo, 2020</DLink>
              </p>
            </Description>
          </Section>

          <Section id="Research--Hobbyists" type="columns" className="gap-6" background="background darkest">
            <Column>
              <Heading type="h3">
                Hobbyists often surpass
                <br />
                these barriers out of passion
              </Heading>
              <PieChart study="MakeRight" graph="Printer Uses" />
            </Column>

            <Column>
              <Heading type="h3">
                Only to have their printer sit idle
                <br />
                most of the time
              </Heading>
              <BarGraph study="MakeRight" graph="Printer Usage" type="seperated" small />
            </Column>
          </Section>

          <Section id="Research--Primary" background="background darkest">
            <Title>Primary Research</Title>
            <Heading>
              Interviews with 4 makers, and 6 laypersons corroborated
              <br />
              these statistics
            </Heading>
          </Section>

          <Section id="Research--Non-Owners" type="columns" titled mainClassName="mt-less" background="background darkest">
            <Heading type="h3">Non-printer owners have interest in the tech, and barriers to accessing it</Heading>
            <Description className="mt-less">
              <p>
                Despite identifying benefits to using 3D printing, these architecture students avoided it due to intimidation.
                <br />
                Even with open access to printers through their schools.
              </p>
            </Description>

            <Column>
              <Quote background="background">
                “...In architecture, some calculations are easier when <br />
                you have a real model vs. digital...” - Layperson #6
              </Quote>
            </Column>

            <Column>
              <Quote background="background">
                “But I never use [3D printing] because I don’t know <br />
                how to work the machines.” - Layperson #4
              </Quote>
            </Column>
          </Section>

          <Section id="Research--Owners" type="columns" titled mainClassName="mt-less" background="background darkest">
            <Heading type="h3">While many owners of 3D printers have idle machines, and free time</Heading>
            <Description className="mt-less">
              <p>
                Owners&apos; usage depended partially on free time, but mostly on current needs and projects. <br />
                Meaning there was frequent overlap between their idle printer, and free time, due to a lack of printable ideas.
              </p>
            </Description>

            <Column>
              <Quote background="background">“How often do you use your printer?” - Me</Quote>
            </Column>

            <Column>
              <Quote background="background">“Not enough” - Owners #1-4, unanimously</Quote>
            </Column>
          </Section>

          <Section id="Research--Aha-Moment" type="columns" background="background">
            <Column className="col-5">
              <Graphic type="mask" className="graphic--panel__flexible" background="background darker" img={MAKERIGHT_IMGS["aha_moment"]} />
            </Column>

            <Column className="col-7">
              <Title>&apos;Aha&apos; Moment</Title>
              <Heading>
                Idle printers, <br />
                potential for wider use
              </Heading>
              <Description>
                <p>
                  Primary and secondary research had converged on these 2 key takeaways.
                  <br />I knew my solution would be found at their intersection.
                </p>
                <ol>
                  <li>
                    <span>The machines of skilled printer owners are largely idle</span>
                  </li>
                  <li>
                    <span>Laypersons feel barred from 3D printing, despite having several ideas and uses for it</span>
                  </li>
                </ol>
              </Description>
            </Column>
          </Section>
        </Chapter>

        <Chapter name="Develop" id="Develop">
          <Section id="Develop--Methodology" type="columns" titled arrows background="background darker">
            <Title>Methodology</Title>
            <Heading>Moving from problem to solution</Heading>

            <Column>
              <Graphic type="mask" background="background" img={MAKERIGHT_IMGS["brainstorming"]} />
              <Description type="h3" className="graphic--caption">
                <b>Brainstorming</b> to generate a wide number of potential solutions
              </Description>
            </Column>
            <Column>
              <Graphic type="mask" background="background" img={MAKERIGHT_IMGS["refine_ideas"]} />
              <Description type="h3" className="graphic--caption">
                <b>Refine ideas</b> to fully explore promising concepts
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="background" img={MAKERIGHT_IMGS["focus_group_testing"]} />
              <Description type="h3" className="graphic--caption">
                <b>Focus group testing</b> to gauge reception and feedback from users
              </Description>
            </Column>
          </Section>

          <Section id="Develop--Brainstorming" type="columns" titled background="background darkest">
            <Title>Brainstorming</Title>
            <Heading>Out of all concepts, one stood out in terms of viability</Heading>

            <Column className="col-4">
              <Graphic className="flex-col h-auto" background="background" type="mask" img={MAKERIGHT_IMGS["brainstorming_chart"]}>
                <Button color="primary" type="bottom" onClick={() => setPopup({ type: "interactive", img: MAKERIGHT_IMGS["brainstorming_chart_full"] })}>
                  View full exercise
                </Button>
              </Graphic>
            </Column>

            <Column className="col-8">
              <Description background="background">
                <h3>
                  A gig-economy-based 3D printing service,
                  <br />a sort-of Uber for 3D models.
                </h3>
                <ul>
                  <li className="mt-less">
                    <span>Hobbyist makers could use their idle machines for passive income</span>
                  </li>
                  <li className="mt-less">
                    <span>Consumers could access the technology without the typical barriers.</span>
                  </li>
                </ul>
              </Description>
            </Column>
          </Section>

          <Section id="Develop--Refine" background="background darkest">
            <Title>Refine Ideas</Title>
            <Heading className="quote-table--heading">I expanded on this chosen idea by considering:</Heading>

            <div className="quote-table">
              <div className="quote-table--subheading">
                <h3>Goals</h3>
              </div>
              <div className="quote-table--subheading">
                <h3>How This Might Be Addressed</h3>
              </div>

              <div className="quote-table--cell quote-table__primary">
                <span>Provide clear benefit and value to those who wouldn’t otherwise use 3D printing to solve their issues.</span>
              </div>
              <div className="quote-table--cell quote-table__secondary">
                <span>Strong messaging, and UX, suited for those unfamiliar with 3D printing.</span>
              </div>

              <div className="quote-table--cell quote-table__primary">
                <span>Ensure both customers and makers have a confident trust in the service.</span>
              </div>
              <div className="quote-table--cell quote-table__secondary">
                <span>Vet makers & verify skills. Add verification checkpoints throughout the ordering process.</span>
              </div>

              <div className="quote-table--subheading">
                <h3>Concerns</h3>
              </div>
              <div className="quote-table--subheading">
                <h3></h3>
              </div>

              <div className="quote-table--cell quote-table__primary">
                <span>What would get everyday consumers to use this service over alternatives?</span>
              </div>
              <div className="quote-table--cell quote-table__secondary">
                <span>Cheap customizability. Encourage ‘window-shopping’ within the service, show examples of what printing can offer.</span>
              </div>

              <div className="quote-table--cell quote-table__primary">
                <span>Would owners of 3D printers be interested in participating in this service?</span>
              </div>
              <div className="quote-table--cell quote-table__secondary">
                <span>Fair compensation for makers, and realistic deadlines with room for human error.</span>
              </div>
            </div>
          </Section>

          <Section id="Develop--Focus-Intro" background="background darkest">
            <Heading>
              Focus group testing on the newly refined concept
              <br />
              allowed me to gauge reception, and gather feedback.
            </Heading>
          </Section>

          <Section id="Develop--Focus" type="columns" titled="above" background="background darkest">
            <Title>Focus Group Testing</Title>
            <Column>
              <Heading>Discovering a promising enthusiasm, and some important concerns</Heading>
            </Column>
            <Column>
              <Description>
                <p>I gathered 6 laypersons, and 4 printer owners, and asked each group questions surrounding my proposed service.</p>
                <p>At the end of the test, I revealed the concept. I then asked more specific questions, collected feedback, and supported their discussion with prompts and clarification.</p>
              </Description>
            </Column>
          </Section>

          <Section id="Develop--Reception" type="columns" titled background="background darkest">
            <Heading type="h3">Reception was quite positive among both groups:</Heading>
            <Description className="mt-less">Laypersons commented ideas for what they would print, while makers showed excitement towards profiting off their equipment.</Description>

            <Column>
              <Quote background="background">Laypersons commented ideas for what they would print, while makers showed excitement towards profiting off their equipment. </Quote>
            </Column>
            <Column>
              <Quote background="background">“I would definitely use that service. Not having to set up and use a printer myself? I would print so much stuff!” - Layperson #4</Quote>
            </Column>
          </Section>

          <Section id="Develop--Concerns" background="background darkest">
            <Heading type="h3" className="quote-table--heading">
              With important concerns being raised, as well:
            </Heading>

            <div className="quote-table">
              <div className="quote-table--cell quote-table__primary">
                <p className="weight-bold mb-1">Distribution of responsibilities</p>
                <p>Draw a line separating the responsibilities of makers, and customers.</p>
              </div>
              <Quote background="background" className="quote-table--cell quote-table__secondary">
                “It’s a question of distributing responsibility. There’s 2 types of problems: maker problems, and customer problems.” - Layperson #3
              </Quote>

              <div className="quote-table--cell quote-table__primary">
                <p className="weight-bold mb-1">Ensure a viable work experience for makers</p>
                <p>Appropriate deadlines for printers, with some kind of flexibility.</p>
              </div>
              <Quote background="background" className="quote-table--cell quote-table__secondary">
                “There’s a lot of little steps and things that go into making the print that can take time.” - Maker #3
              </Quote>

              <div className="quote-table--cell quote-table__primary">
                <p className="weight-bold mb-1">3D modelling adds too much complication</p>
                <p>Model creation and design is whole service in itself; including it in the service would drastically affect scope.</p>
              </div>
              <Quote background="background" className="quote-table--cell quote-table__secondary">
                “I can't model things for people, so I’m not very interested in that side of the service.” - Maker #3
              </Quote>
            </div>
          </Section>

          <Section id="Develop--Conclusion">
            <Heading>With a foundation of research, and validation from testers, it was time to begin prototyping</Heading>
          </Section>
        </Chapter>

        <Chapter id="Prototyping">
          <Section id="Prototyping--Journey-Map" type="columns" titled="above" background="tertiary light" mainClassName="mb-3">
            <Title>Methodology</Title>
            <Column className="col-7">
              <Heading>
                Prototype scope covered the core journey of makers
                <br />
                and customers
              </Heading>
            </Column>
            <Column className="col-5">
              <Description>
                <p>The two journeys included all the main touch-points from sign-up to order fulfillment. This development goal would allow me to establish the foundation and core interactions of the service.</p>
              </Description>
            </Column>
            <Graphic type="image" background="tertiary" img={MAKERIGHT_IMGS["journey_map"]} />
          </Section>

          <Section id="Prototyping--Approach" type="columns" titled arrows="background" background="tertiary light" mainClassName="gap-5" mainType="grid">
            <Title>Approach</Title>
            <Heading>Finding a focus within the field of 3D printing</Heading>

            <Column>
              <Graphic type="image" background="tertiary" img={MAKERIGHT_IMGS["maker_journey_low_fi"]} />
              <Description className="graphic--caption">
                <p>
                  <b>Phase 1:</b>
                </p>
                <p className="mt-less">Maker Journey, Low-Fi</p>
              </Description>
            </Column>
            <Column>
              <Graphic type="image" background="tertiary" color="background" img={MAKERIGHT_IMGS["customer_journey_low_fi"]} />
              <Description className="graphic--caption">
                <p>
                  <b>Phase 2:</b>
                </p>
                <p className="mt-less">Customer Journey, Low-Fi</p>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["maker_journey_high_fi"]} />
              <Description className="graphic--caption">
                <p>
                  <b>Phase 3:</b>
                </p>
                <p className="mt-less">Maker Journey, High-Fi</p>
              </Description>
            </Column>
            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["customer_journey_high_fi"]} />
              <Description className="graphic--caption">
                <p>
                  <b>Phase 4:</b>
                </p>
                <p className="mt-less">Customer Journey, High-Fi</p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Progression" type="columns" margin="wide" arrows="background" background="tertiary" titled mainType="grid">
            <Title>Project Iterations</Title>
            <Heading>Progression & refinement</Heading>

            <Column caption="above">
              <Description className="graphic--caption graphic--caption__split">
                <p>Customer Journey - Item Listing (Low-Fi)</p>
                <p>Phase 1</p>
              </Description>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["iterations_checkout_low_fi"]} lightbox setPopup={setPopup} />
            </Column>
            <Column caption="above">
              <Description className="graphic--caption graphic--caption__split">
                <p>Customer Journey - Item Listing (High-Fi)</p>
                <p>Phase 2</p>
              </Description>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["iterations_checkout_high_fi"]} lightbox setPopup={setPopup} />
            </Column>

            <Column caption="above">
              <Description className="graphic--caption graphic--caption__split">
                <p>Maker Journey - File Checking (Low-Fi)</p>
                <p>Phase 1</p>
              </Description>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["iterations_file_checking_low_fi"]} lightbox setPopup={setPopup} />
            </Column>
            <Column caption="above">
              <Description className="graphic--caption graphic--caption__split">
                <p>Maker Journey - File Checking (High-Fi)</p>
                <p>Phase 2</p>
              </Description>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["iterations_file_checking_high_fi"]} lightbox setPopup={setPopup} />
            </Column>
          </Section>

          <Section id="Prototyping--Feedback" background="tertiary light">
            <Title>Noteable Feedback Changes</Title>
            <Heading>Significant issues addressed during testing and revision:</Heading>
            <Description>
              <p>
                Some changes were a structural shift in the service's rules and mechanics, others were simply UI and UX improvements.
                <br />
                Here is a smattering of the most notable issues addressed along the way.
              </p>
            </Description>
          </Section>

          <Section id="Prototyping--Overview" titled type="columns" arrows="background anchored" background="tertiary">
            <Heading type="h3">The Manufacturer Overview</Heading>

            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_overview_before"]} lightbox setPopup={setPopup} />
              <Description className="mt-more graphic--caption graphic--caption__split">
                <p>Aspiring makers need to understand the expectations of their new job. Originally, this was taught with an 8-page slideshow. But users found it droning, hard to retain, and too easy to skip.</p>
              </Description>
            </Column>
            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_overview_after"]} lightbox={MAKERIGHT_IMGS["feedback_overview_after_full"]} zoom setPopup={setPopup} />
              <Description className="mt-more graphic--caption graphic--caption__split">
                <p>Now, that info exists as a single inviting page. As well, I added a brief video chat at the end onboarding to ensure new Makers have read the overview, and can ask questions.</p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Equipment" titled type="columns" arrows="background anchored" background="tertiary" mainType="grid">
            <Heading type="h3">Equipment verification</Heading>

            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_printers_before"]} lightbox setPopup={setPopup} />
              <Description className="mt-more graphic--caption graphic--caption__split">
                <p>User’s noted: lack of parity between printer and filament inputs, and the inability to add multiple printers.</p>
              </Description>
            </Column>
            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_printers_after"]} lightbox setPopup={setPopup} />
              <Description className="mt-more graphic--caption graphic--caption__split">
                <p>Redesign to match filament inputs, now with support for multiple printers, and integrated support via tooltips.</p>
              </Description>
            </Column>

            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_filament_before"]} lightbox setPopup={setPopup} />
              <Description className="mt-more graphic--caption graphic--caption__split">
                <p>Makers may have entire shelves of filament, so it would be useful to have more distinction between each added material.</p>
              </Description>
            </Column>
            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_filament_after"]} lightbox setPopup={setPopup} />
              <Description className="mt-more graphic--caption graphic--caption__split">
                <p>A stripe across the top of the cards match the real-world color of the inputted filament; making them much easier to differentiate.</p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Tutorial" titled type="columns" background="tertiary">
            <Heading type="h3">Tutorial system</Heading>

            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_tutorials"]} />
              <Description className="mt-more graphic--caption gap-4 graphic--caption__split">
                <p>Testers of the Maker journey were navigating much more fluidly halfway through each test. It was taking a few pages of exploration before the terminology, and flow finally clicked.</p>
                <p>To ease the friction of a user’s first order fulfillment, I added an optional tutorial system. Boxes appear one by one describing important elements, and directing the user through their task.</p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Closing" background="tertiary light">
            <Heading>
              With these and many other issues addressed, <br />I had actualized the core functionality of the service.
            </Heading>
          </Section>
        </Chapter>

        <Chapter id="Delivery">
          <Section id="Delivery--Banner" background={MAKERIGHT_IMGS.delivered_project_banner}>
            <Heading>Delivered Project</Heading>
          </Section>

          <Section type="passthrough" id="Delivery--Maker" background="tertiary" margin="none">
    {/* TODO: i think maybe these should be the non-tutorial versions :/ what do you think?? */}

            <Slideshow img={MAKERIGHT_IMGS.maker_screen_10}>
              <Heading>Maker user journey</Heading>
            </Slideshow>

          </Section>
          
          <Section type="passthrough" id="Delivery--Customer" background="tertiary" margin="none">

            <Slideshow img={MAKERIGHT_IMGS.customer_screen_06}>
              <Heading>Customer user journey</Heading>
            </Slideshow>

          </Section>
          




        </Chapter>
      </CaseStudyPage>
    </>
  );
}

export default MakeRight;
