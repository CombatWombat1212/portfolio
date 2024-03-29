import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { Section, Chapter, Title, Column, Heading, Description, Graphic, Quote } from "@/components/sections/Sections";
import MAKERIGHT_IMGS from "@/data/MAKERIGHT_IMGS";
import QUOTE_TABLES from "@/data/QUOTE_TABLE";
import Gantt from "@/components/charts/Gantt";
import BarGraph from "@/components/charts/BarGraph";
import DLink from "@/components/utilities/DynamicLink";
import PieChart from "@/components/charts/PieChart";
import Button from "@/components/elements/Buttons";
import Slideshow from "@/components/global/slideshow/Slideshow";
import Pitch from "@/components/sections/Pitch";
import { STUDY_MAKERIGHT } from "@/data/CASE_STUDIES";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import Nobr from "@/components/utilities/Nobr";
import QuoteTable from "@/components/global/QuoteTable";
import ResponsiveText from "@/components/global/ResponsiveText";
import Seo from "@/components/head/Seo";
import useBrowser from "@/scripts/hooks/useBrowser";

function MakeRight({ pop }) {
  const study = STUDY_MAKERIGHT;

  const { desktop, isBpAndDown, isBp, bp, loading } = useResponsive();
  const isLgAndDown = !(!isBpAndDown("lg") || loading);
  const isMdAndDown = !(!isBpAndDown("md") || loading);
  const isSmAndDown = !(!isBpAndDown("sm") || loading);
  const isMd = !(!isBp("md") || loading);
  const isSm = !(!isBp("sm") || loading);
  const isMdOrSm = isMd || isSm;


  const { isFirefox, browserFound } = useBrowser();
  const isntFirefox = !browserFound || !isFirefox || (browserFound && !isFirefox);
  const mobileOrFirefox = !desktop || !isntFirefox;
  
  return (
    <>
      <Seo page="makeright" />

      <CaseStudyPage id={study.id} study={study}>
        <Chapter id="Overview" name="Overview">
          <Section id="Overview--Background" type="overview">
            <Title>Background</Title>
            <Heading>
              3D printing is yet to reach <br className="d-lg-none" /> its full potential
            </Heading>
            <Description>
              <p>
                Offering endless customization, cheap manufacturing, and fast production speeds. <br className="d-md-none" /> 3D printing has a vast
                potential to benefit everyday consumers.
              </p>
              <p>
                In the early 2010s, we were told they would be found in every home; giving consumers the power to create anything. But, its
                barriers were too great to reach these expectations, and this reality fell flat. Now, 3D printing hardly has any impact on the average consumer&rsquo;s life.
              </p>
            </Description>

            <Graphic type="mask" img={MAKERIGHT_IMGS["full_potential"]} />
          </Section>

          <Section id="Overview--Challenge" type="overview">
            <Title>Challenge</Title>
            <Heading>
              Cost, and technical knowledge prevent mass adoption
            </Heading>
            {/* <Heading>
              Cost, and technical knowledge 
              <br className="d-xl-none" /> stand in the way of mass adoption
            </Heading> */}
            <Description>
              <p>
                Owning a 3D printer is a steep upfront investment, and learning to use it is a massive time-sink. Even then, users without 3D
                modelling experience will still be restricted to premade objects.
              </p>
            </Description>

            <Graphic type="mask" img={MAKERIGHT_IMGS["barriers_to_entry"]} />
          </Section>

          <Section id="Overview--Opportunity">
            <Title>Opportunity</Title>
            <Heading>How might we remove these barriers, and translate the benefits of 3D printing to the average consumer?</Heading>
          </Section>

          <Section id="Solution" type="logo banner" background="primary" align="just-center">
            <Graphic type="mask" img={MAKERIGHT_IMGS["makeright_logo"]} />
          </Section>

          <Section id="Overview--Solution" background="background">
            <Title>Solution</Title>
            <Heading>
              Connect consumers with owners of 3D printers <br className="d-xxl-none" /> for stress-free, low-cost production
            </Heading>
          </Section>

          <Section id="Overview--Pitch" type="passthrough" margin="wide" wrapperClassName={"mt-0 py-0"} background="makeright tertiary">
            <Pitch>
              <>
                <Heading>Choose</Heading>
                <Description>
                  <p>
                    from a storefront of <Nobr>sourced 3D models</Nobr>, <Nobr>or upload your own</Nobr>
                  </p>
                </Description>
                <Graphic type="mask" img={MAKERIGHT_IMGS["pitch_vector_choose"]} />
                <Graphic type="image" img={MAKERIGHT_IMGS["pitch_mockup_choose"]} />
              </>

              <>
                <Heading>Tweak</Heading>
                <Description>
                  <p>
                    and personalize <br className="d-lg-none d-sm-block" /> to suit your needs
                  </p>
                </Description>
                <Graphic type="mask" img={MAKERIGHT_IMGS["pitch_vector_tweak"]} />
                <Graphic type="image" img={MAKERIGHT_IMGS["pitch_mockup_tweak"]} />
              </>

              <>
                <Heading>Order</Heading>
                <Description>
                  <p>
                    your print, automatically <br className="d-lg-none" /> assigning it to one of our <br className="d-lg-none d-xs-block" />
                    verified makers
                  </p>
                </Description>
                <Graphic type="mask" img={MAKERIGHT_IMGS["pitch_vector_order"]} />
                <Graphic type="image" img={MAKERIGHT_IMGS["pitch_mockup_order"]} />
              </>

              <>
                <Heading>Receive</Heading>
                <Description>
                  <p>
                    the purchased item <Nobr>right at your front door</Nobr>
                  </p>
                </Description>
                <Graphic type="mask" img={MAKERIGHT_IMGS["pitch_vector_receive"]} />
                <Graphic type="image" img={MAKERIGHT_IMGS["pitch_mockup_receive"]} />
              </>
            </Pitch>
          </Section>

          <Section id="Overview--Summary" type="columns" wrapperClassName="mt-0">
            <Column>
              <Heading type="h3">Slashing the overhead of competitors</Heading>
              <Description>
                <p>
                  Competing services ruin the low-cost benefits of 3D printing <Nobr>by charging</Nobr> steep overhead fees. This results from countless technicians and machines operating under one roof.
                </p>
                <p>
                  MakeRight undercuts this overhead by connecting customers directly to makers. Clients are only charged for the work of one technician, running their own equipment.
                </p>
              </Description>
            </Column>
            <Column>
              <Heading type="h3">
                Operating much like an &lsquo;Uber&rsquo; <br className="d-md-none" /> for <Nobr>3D prints</Nobr> from local makers
              </Heading>
              <Description>
                <p>
                  Customers gain access to 3D printing&rsquo;s low-cost, customizable production, without owning or operating the technology. <Nobr>In parallel</Nobr>, hobbyist makers now have an accessible platform <Nobr>to profit</Nobr> off their equipment and skills.
                </p>
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
            <Heading>
              Project phases <Nobr>and timeline</Nobr>
            </Heading>
            <Gantt study="MakeRight" />
          </Section>
        </Chapter>

        <Chapter name="Research" id="Research">
          <Section id="Research--Approach" type="columns" titled arrows background="background darker">
            <Title>Approach</Title>
            <Heading>Finding a focus within the field of 3D printing</Heading>

            <Column>
              <Graphic type="mask" background="background" img={MAKERIGHT_IMGS["secondary_research"]} />
              <Description type="h3" className="graphic--caption d-lg-none d-md-block">
                <b>Secondary research</b> for <Nobr>high-level</Nobr> context of the 3D printing world
              </Description>
              <Description className="graphic--caption d-none d-lg-block d-md-none">
                <h3>
                  <b>Secondary research</b>
                </h3>
                <p style={{ marginTop: "0.125rem" }}>
                  for <Nobr>high-level</Nobr> context of the <Nobr>3D printing world</Nobr>
                </p>
              </Description>
            </Column>
            <Column>
              <Graphic type="mask" background="background" img={MAKERIGHT_IMGS["interviews"]} />
              <Description type="h3" className="graphic--caption d-lg-none d-md-block">
                <b>Interviews & surveys</b> to understand users&rsquo; experiences at a lower level
              </Description>
              <Description className="graphic--caption d-none d-lg-block d-md-none">
                <h3>
                  <b>Interviews & surveys</b>
                </h3>
                <p style={{ marginTop: "0.125rem" }}>
                  to understand users&rsquo; experiences <Nobr>at a lower level</Nobr>
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Research--Limits" background="background darkest" className="flex-col">
            <Title>Secondary Research</Title>
            <Heading>
              Cost and knowledge gaps prevent widespread use, <br className="d-lg-none" />
              <Nobr>while hobbyist</Nobr> printers <Nobr>sit idle</Nobr>
            </Heading>
          </Section>

          <Section id="Research--Factors" className={`flex-col`} background="background darkest" wrapperClassName={desktop ? "" : "mb-less"}>
            <Heading type="h3">What factors limit the adoption of <Nobr>3D printing?</Nobr></Heading>
            <BarGraph study="MakeRight" graph="Limiting Factors" type="default" />
            <Description>
              <p>
                <DLink href="https://www.sculpteo.com/en/ebooks/state-of-3d-printing-report-2020/" target="_blank" color="primary">
                  Source: Sculpteo, The State Of 3D Printing, 2020
                </DLink>
              </p>
            </Description>
          </Section>

          <Section id="Research--Hobbyists" type="columns" className="gap-6" background="background darkest">
            <Column>
              <Heading type="h3">
                Hobbyists often surpass <br className="d-sm-none" /> these barriers out of passion
              </Heading>
              <PieChart study="MakeRight" graph="Printer Uses" />
            </Column>

            <Column>
              <Heading type="h3">
                Only to have their printer sit idle <Nobr className="d-sm-none">most of the time</Nobr>
              </Heading>
              <BarGraph study="MakeRight" graph="Printer Usage" type="seperated" small />
            </Column>
          </Section>

          <Section id="Research--Primary" background="background darkest">
            <Title>Primary Research</Title>
            <Heading>
              {!isMdAndDown ? (
                <>
                  Interviews with 4 makers, and 6 laypersons <br className="d-md-none" /> corroborated these statistics
                </>
              ) : (
                <>
                  Interviews with makers, and laypersons <br className="d-md-none" /> corroborated these findings
                </>
              )}
            </Heading>
          </Section>

          <Section id="Research--Non-Owners" type="columns" titled background="background darkest">
            <Heading type="h3">
              Non-printer owners have interest in the tech, and barriers <br className="d-none d-lg-block d-md-none" /> to accessing it
            </Heading>
            <Description className={desktop ? "mt-less" : ""}>
              <p>
                Despite identifying benefits of using 3D printing, these architecture students avoided it due to intimidation.
                <br className="d-lg-none" /> Even though, through their school, they had open access to printers.
              </p>
            </Description>

            <Column>
              <Quote background="background">
                &ldquo;...In architecture, some calculations are easier when <br className="d-xl-none" /> you have a real model vs. digital...&rdquo;{" "}
                <Nobr>- Layperson #6</Nobr>
              </Quote>
            </Column>

            <Column>
              <Quote background="background">
                &ldquo;But I never use [3D printing] because I don&rsquo;t know <br className="d-lg-none" /> how to work the machines.&rdquo;
                <br className="d-none d-lg-block d-md-none" /> <Nobr>- Layperson #4</Nobr>
              </Quote>
            </Column>
          </Section>

          <Section id="Research--Owners" type="columns" titled background="background darkest">
            <Heading type="h3">While many owners of 3D printers have idle machines, and free time</Heading>
            <Description className={desktop ? "mt-less" : ""}>
              <p>
                Owners&rsquo; usage depended partially on free time, but mostly on current needs and projects. <br className="d-md-none" />
                Meaning there was frequent overlap between their idle printer, and free time, due to a lack of printable ideas.
              </p>
            </Description>

            <Column>
              <Quote background="background">
                &ldquo;How often do you use your printer?&rdquo; <Nobr>- Me</Nobr>
              </Quote>
            </Column>

            <Column>
              <Quote background="background">
                &ldquo;Not enough&rdquo; <Nobr>- Owners #1-4, unanimously</Nobr>
              </Quote>
            </Column>
          </Section>

          <Section id="Research--Aha-Moment" type="columns">
            <Column className="col-5 col-lg-5 col-md-12">
              <Graphic
                type="mask"
                {...(desktop ? { className: "graphic--panel__flexible" } : {})}
                {...(desktop ? { background: "background darker" } : {})}
                img={MAKERIGHT_IMGS["aha_moment"]}
              />
            </Column>

            <Column className="col-7 col-lg-6 col-md-12">
              <Title>&lsquo;Aha&rsquo; Moment</Title>
              <Heading>
                Idle printers, <br className="d-md-none" />
                potential for wider use
              </Heading>
              <Description>
                <p>Primary and secondary research had converged on these 2 key takeaways. I knew my solution would be found at their intersection.</p>
                <ol>
                  <li>
                    <span>
                      The machines of skilled printer owners are <Nobr>largely idle</Nobr>
                    </span>
                  </li>
                  <li>
                    <span>
                      Laypersons feel barred from 3D printing, despite having <br className="d-lg-none" /> several ideas and uses for the tech
                    </span>
                  </li>
                </ol>
              </Description>
            </Column>
          </Section>
        </Chapter>

        <Chapter name="Develop" id="Develop">
          <Section id="Develop--Methodology" type="columns" titled arrows background="background darker" wrapperClassName="mt-0">
            <Title>Methodology</Title>
            <Heading>
              Moving from problem <Nobr>to solution</Nobr>
            </Heading>

            <Column>
              <Graphic type="mask" background="background" img={MAKERIGHT_IMGS["brainstorming"]} />
              <Description type="h3" className="graphic--caption d-lg-none d-md-block">
                <b>Brainstorming</b> <Nobr>to generate</Nobr> a wide number of potential solutions
              </Description>
              <Description className="graphic--caption d-none d-lg-block d-md-none">
                <h3>
                  <b>Brainstorming</b>
                </h3>
                <p style={{ marginTop: "0.125rem" }}>to generate a wide number of potential solutions</p>
              </Description>
            </Column>
            <Column>
              <Graphic type="mask" background="background" img={MAKERIGHT_IMGS["refine_ideas"]} />
              <Description type="h3" className="graphic--caption d-lg-none d-md-block">
                <b>Refine ideas</b> to fully explore promising concepts
              </Description>
              <Description className="graphic--caption d-none d-lg-block d-md-none">
                <h3>
                  <b>Refine ideas</b>
                </h3>
                <p style={{ marginTop: "0.125rem" }}>to fully explore promising concepts</p>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="background" img={MAKERIGHT_IMGS["focus_group_testing"]} />
              <Description type={"h3"} className="graphic--caption d-lg-none d-md-block">
                <b>Focus group testing</b> to gauge reception and feedback <Nobr>from users</Nobr>
              </Description>
              <Description className="graphic--caption d-none d-lg-block d-md-none">
                <h3>
                  <b>Focus group</b>
                </h3>
                <p style={{ marginTop: "0.125rem" }}>
                  to gauge reception and feedback <Nobr>from users</Nobr>
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Develop--Brainstorming" type="columns" titled background="background darkest">
            <Title>Brainstorming</Title>
            <Heading>
              Out of all concepts, one stood out <Nobr className="d-sm-none">in terms of viability</Nobr>
            </Heading>

            <Column className="col-4 col-lg-5 col-md-12">
              <Graphic className="flex-col h-auto" background="background" type="mask" img={MAKERIGHT_IMGS["brainstorming_chart"]}>
                <Button
                  color="primary"
                  type="bottom"
                  {...(!mobileOrFirefox
                    ? {
                        onClick: () => {
                          pop.setOn(true);
                          pop.setType("interactive");
                          pop.setImg(MAKERIGHT_IMGS["brainstorming_chart_full_expanded"]);
                        },
                      }
                    : {
                        onClick: () => {
                          pop.setOn(true);
                          pop.setType("lightbox");
                          pop.setImg(MAKERIGHT_IMGS["brainstorming_chart_full_background"]);
                        },
                      })}>
                  View full exercise
                </Button>
              </Graphic>
            </Column>

            <Column className="col-8 col-lg-7 col-md-12">
              <Description background="background">
                <h3>
                  A gig economy-based 3D printing service,
                  <br className="d-lg-none" /> a <Nobr>sort-of</Nobr> Uber for 3D models.
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
            <Heading className="quote-table--heading">
              I expanded on this chosen idea <Nobr>by considering:</Nobr>
            </Heading>

            <QuoteTable data={QUOTE_TABLES.refine_ideas} />
          </Section>

          <Section id="Develop--Focus-Intro" background="background darkest">
            <Heading>
              Focus group testing on the newly refined concept <br className="d-lg-none" /> allowed me to gauge reception, and gather feedback
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
                <p>
                  At the end of the test, I revealed the concept. I then asked more specific questions, collected feedback, and supported their
                  discussion with prompts and clarification.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Develop--Reception" type="columns" titled background="background darkest">
            <Heading type="h3">Reception was quite positive among both groups:</Heading>
            <Description className="mt-less">
              <p>Laypersons commented ideas for what they would print, while makers showed excitement towards profiting off their equipment.</p>
            </Description>

            <Column>
              <Quote background="background">
                &ldquo;I think a business like this could totally work... ...I think there&rsquo;s a lot of people with printers and free time that would
                hop on an opportunity like this.&rdquo; <Nobr>- Maker #2</Nobr>
              </Quote>
            </Column>
            <Column>
              <Quote background="background">
                &ldquo;I would definitely use that service. Not having to set up and use a printer myself? I would print so much stuff!&rdquo;
                <Nobr>- Layperson #4</Nobr>
              </Quote>
            </Column>
          </Section>

          <Section id="Develop--Concerns" background="background darkest">
            <Heading type="h3" className="quote-table--heading">
              With important concerns being raised, as well:
            </Heading>

            <QuoteTable data={QUOTE_TABLES.concerns} />
          </Section>

          <Section id="Develop--Conclusion">
            <Heading>With a foundation of research, and validation from testers, it was time to begin prototyping</Heading>
          </Section>
        </Chapter>

        <Chapter name="Prototyping" id="Prototyping">
          <Section id="Prototyping--Journey-Map" type="columns" titled="above" background="tertiary light" mainClassName="mb-3">
            <Title>Methodology</Title>
            <Column className="col-7">
              <Heading>
                Prototype scope covered the core journey of makers
                <br className="d-lg-none" /> and customers
              </Heading>
            </Column>
            <Column className="col-5">
              <Description>
                <p>
                  The two journeys included all the main touch-points from sign-up to order fulfillment. This development goal would allow me to
                  establish the foundation and core interactions of the service.
                </p>
              </Description>
            </Column>
            <Graphic type="image" background="tertiary" img={MAKERIGHT_IMGS["journey_map"]} />
          </Section>

          <Section
            id="Prototyping--Methodology"
            type="columns"
            titled
            arrows="background"
            background="tertiary light"
            mainClassName="gap-5"
            mainType="grid">
            <Title>Methodology</Title>
            <Heading>
              The workload was divided <br className="d-none d-md-block d-sm-none" />
              across <Nobr>4 project phases</Nobr>
            </Heading>
            <Description className="mt-1">
              <p>
                I broke development into 4 phases of 4-6 weeks. <br className="d-none d-lg-block d-sm-none" />
                Each containing its own cycles <Nobr className="d-md-none">of development, testing, and iteration.</Nobr>
              </p>
            </Description>

            <Column>
              <Graphic type="mask" background="tertiary" img={MAKERIGHT_IMGS["maker_journey_low_fi"]} />
              <Description className="graphic--caption">
                <p>
                  <b>Phase 1:</b>
                </p>
                <p className="mt-less">
                  Maker Journey, <Nobr>Low-Fi</Nobr>
                </p>
              </Description>
            </Column>
            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["customer_journey_low_fi"]} />
              <Description className="graphic--caption">
                <p>
                  <b>Phase 2:</b>
                </p>
                <p className="mt-less">
                  Customer Journey, <Nobr>Low-Fi</Nobr>
                </p>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["maker_journey_high_fi"]} />
              <Description className="graphic--caption">
                <p>
                  <b>Phase 3:</b>
                </p>
                <p className="mt-less">
                  Maker Journey, <Nobr>High-Fi</Nobr>
                </p>
              </Description>
            </Column>
            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["customer_journey_high_fi"]} />
              <Description className="graphic--caption">
                <p>
                  <b>Phase 4:</b>
                </p>
                <p className="mt-less">
                  Customer Journey, <Nobr>High-Fi</Nobr>
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Progression" type="columns" margin="wide" arrows="background" background="tertiary" titled mainType="grid">
            <Title>Project Iterations</Title>
            <Heading>
              Progression <Nobr>& refinement</Nobr>
            </Heading>

            <Column caption="above">
              <Description className="graphic--caption graphic--caption__split">
                <p className="section--description-title">
                  <ResponsiveText
                    tag="Fragment"
                    data={{
                      xxl: "Customer Journey ",
                      xs: "Customer ",
                    }}
                  />
                  - Item Listing (Low-Fi)
                </p>
                <p className="section--description-phase">Phase 1</p>
              </Description>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["iterations_checkout_low_fi"]} lightbox pop={pop} />
            </Column>
            <Column caption="above">
              <Description className="graphic--caption graphic--caption__split">
                <p className="section--description-title">
                  <ResponsiveText
                    tag="Fragment"
                    data={{
                      xxl: "Customer Journey ",
                      xs: "Customer ",
                    }}
                  />
                  - Item Listing (High-Fi)
                </p>
                <p className="section--description-phase">Phase 2</p>
              </Description>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["iterations_checkout_high_fi"]} lightbox pop={pop} />
            </Column>

            <Column caption="above">
              <Description className="graphic--caption graphic--caption__split">
                <p className="section--description-title">
                  <ResponsiveText
                    tag="Fragment"
                    data={{
                      xxl: "Maker Journey ",
                      xs: "Maker ",
                    }}
                  />
                  - File Checking (Low-Fi)
                </p>
                <p className="section--description-phase">Phase 1</p>
              </Description>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["iterations_file_checking_low_fi"]} lightbox pop={pop} />
            </Column>
            <Column caption="above">
              <Description className="graphic--caption graphic--caption__split">
                <p className="section--description-title">
                  <ResponsiveText
                    tag="Fragment"
                    data={{
                      xxl: "Maker Journey ",
                      xs: "Maker ",
                    }}
                  />
                  - File Checking (High-Fi)
                </p>
                <p className="section--description-phase">Phase 2</p>
              </Description>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["iterations_file_checking_high_fi"]} lightbox pop={pop} />
            </Column>
          </Section>

          <Section id="Prototyping--Feedback" background="tertiary light" titled="above">
            <Title>Notable Feedback Changes</Title>
            <Column>
              <Heading>
                Significant issues addressed during <Nobr>testing and revision:</Nobr>
              </Heading>
            </Column>
            <Column>
              <Description>
                <p>
                  Some changes were a structural shift in the service&rsquo;s rules and mechanics, others were simply UI and UX improvements.</p>
                   <p>Here is a smattering of the most notable issues addressed along the way.</p>
                
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Overview" titled type="columns" arrows="background anchored" background="tertiary">
            <Heading type="h3">The Manufacturer Overview</Heading>
            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_overview_before"]} lightbox pop={pop} />
              <Description className="mt-more graphic--caption">
                <p>
                  Aspiring makers need to understand the expectations of their new job. Originally, this was taught with an 8-page slideshow. But
                  users found it droning, hard to retain, and too easy to skip.
                </p>
              </Description>
            </Column>
            <Column>
              <Graphic
                className="b-rad"
                type="image"
                img={MAKERIGHT_IMGS["feedback_overview_after"]}
                lightbox={MAKERIGHT_IMGS["feedback_overview_after_full"]}
                pop={pop}
              />
              <Description className="mt-more graphic--caption">
                <p>
                  Now, that info exists as a single inviting page. As well, I added a brief video chat at the end of onboarding to ensure new Makers have read the overview, and can ask questions.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Equipment" titled type="columns" arrows="background anchored" background="tertiary" mainType="grid">
            <Heading type="h3">Equipment verification</Heading>

            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_printers_before"]} lightbox pop={pop} />
              <Description className="mt-more graphic--caption">
                <p>Users noted: lack of parity between printer and filament inputs, and the inability to add multiple printers.</p>
              </Description>
            </Column>
            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_printers_after"]} lightbox pop={pop} />
              <Description className="mt-more graphic--caption">
                <p>Redesign to match filament inputs, now with support <Nobr>for multiple printers,</Nobr> and integrated support via tooltips.</p>
              </Description>
            </Column>

            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_filament_before"]} lightbox pop={pop} />
              <Description className="mt-more graphic--caption">
                <p>Makers may have entire shelves of filament, so it would be useful to have more distinction between each added material.</p>
              </Description>
            </Column>
            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_filament_after"]} lightbox pop={pop} />
              <Description className="mt-more graphic--caption">
                <p>
                  A stripe across the top of the cards match the real-world color of the inputted filament; making them much easier <Nobr>to differentiate.</Nobr>
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Tutorial" titled type="columns" background="tertiary">
            <Heading type="h3">Tutorial system</Heading>

            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_tutorials"]} lightbox pop={pop} />
              <Description className={`mt-more graphic--caption gap-4 gap-lg-3 ${!isLgAndDown && "graphic--caption__split"}`}>
                <p>
                  Testers of the Maker journey were navigating much more fluidly halfway through each test. It was taking a few pages of exploration
                  before the terminology, and flow, finally clicked.
                </p>
                <p>
                  To ease the friction of a user&rsquo;s first order fulfillment, I added an optional tutorial system. Boxes appear one by one
                  describing important elements, and directing the user through their task.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Closing" background="tertiary light">
            <Heading>
              With these and many other issues addressed, <br className="d-lg-none" />I had actualized the core functionality of the service.
            </Heading>
          </Section>
        </Chapter>

        <Chapter name="Delivery" id="Delivery">
          <Section id="Delivery--Banner-Intro" background={MAKERIGHT_IMGS.delivered_project_banner}>
            <Heading>Delivered Project</Heading>
          </Section>
          <Section type="passthrough" id="Delivery--Maker" background="tertiary" margin="none">
            {/* TODO: i think maybe these should be the non-tutorial versions :/ what do you think?? */}
            {/* TODO: yeah i do think these should be the non-tutorial versions */}
            {/* TODO: Okay so the way you do it is none of them should have tutorials, except one that you think is a really good example of the tutorials.  For that one, show the non-tutorial first, then after it show the tutorial version and comment on what that is */}

            <Slideshow img={MAKERIGHT_IMGS.maker_screen_10}>
              <Heading>
                <ResponsiveText tag="Fragment">
                  <xxl>Maker user journey</xxl>
                  <lg>Maker journey</lg>
                </ResponsiveText>
              </Heading>
            </Slideshow>
          </Section>

          <Section type="passthrough" id="Delivery--Customer" background="tertiary" margin="none">
            <Slideshow img={MAKERIGHT_IMGS.customer_screen_06}>
              <Heading>
                <ResponsiveText tag="Fragment">
                  <xxl>Customer user journey</xxl>
                  <lg>Customer journey</lg>
                  <xs>Custo. journey</xs>
                </ResponsiveText>
              </Heading>
            </Slideshow>
          </Section>

          {/* TODO: next up just finish up this page, making the last component you need */}

          <Section id="Delivery--Conclusion" type="columns" titled background="tertiary light">
            <Heading>Bringing 3D printing to everyday consumers</Heading>

            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["connecting_consumers"]} />
              <Heading className="graphic--caption" type={isMdOrSm ? "p" : "h3"}>
                Connecting consumers to local hobbyist makers for cheap, customizable manufacturing
              </Heading>
            </Column>
            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["browseable_storefront"]} />
              <Heading className="graphic--caption" type={isMdOrSm ? "p" : "h3"}>
                A browsable online storefront of ready-to-print 3D models, sourced from around the internet
              </Heading>
            </Column>

            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["maker_profit"]} />
              <Heading className="graphic--caption" type={isMdOrSm ? "p" : "h3"}>
                Enabling makers to profit off of their equipment and skills in their spare time
              </Heading>
            </Column>
          </Section>

          <Section id="Delivery--Forward" type="columns" titled background="tertiary light">
            <Heading>Going Forward</Heading>

            <Column>
              <Description>
                <p>
                  With every feature added, countless more had to be sidelined for the sake of scope. Some of these improvements to the project include:
                </p>
                <ul>
                  <li>
                    <span>A full branding refresh (the logo and name are temporary)</span>
                  </li>
                  <li>
                    <span>Wider testing with relevant users, both customers and makers</span>
                  </li>
                  <li>
                    <span>Overhauling the visuals and UX of the store page</span>
                  </li>
                  <li>
                    <span>UX of user profiles</span>
                  </li>
                  <li>
                    <span>Real-world tests with owners of 3D printers</span>
                  </li>
                </ul>
              </Description>
            </Column>
            <Column>
              <Description>
                <p>
                  Several team members would need to be added in order to become a dedicated company. Like algorithm engineers to help design the
                  systems that assign orders to makers, and determine how much they get paid per job. Other additions include:
                </p>
                <ul>
                  <li>
                    <span>More UX designers</span>
                  </li>
                  <li>
                    <span>Wider testing with relevant users, both customers and makers</span>
                  </li>
                  <li>
                    <span>Backend developers (some with cyber-security experience)</span>
                  </li>
                  <li>
                    <span>Financial advisors</span>
                  </li>
                </ul>
              </Description>
            </Column>
          </Section>

          <Section id="Delivery--Banner-Closing" background={MAKERIGHT_IMGS["closing_banner"]}></Section>
        </Chapter>

        <Chapter name="Closing" id="Closing">
          <Section id="Closing--Copy" type="columns" titled mainClassName="gap-6 gap-lg-4 mt-6">
            <Title>Areas Of Growth</Title>
            <Heading>
              Considering entire userflows and journeys <br className="d-lg-none" />
              makes for far better UI than individual features
            </Heading>
            <Description className={`text-col-2 ${!isLgAndDown ? "text-gap-6" : "text-gap-4"}`}>
              <p>
                When I began planning my approach to prototyping, I chose a number of the service&rsquo;s most important features. From there, I
                intended to create mockups of each. Eventually, I reached the question of how the service would verify that a maker was capable and
                trustworthy. My solution was to have them create a mock customer order. But to prototype this, I would need to mock up the entire
                order fulfillment process. Only having a few select screens would be too disjointed.
              </p>

              <p>
                At this moment, I decided the only way to consider all aspects of the service would be to build the 2 entire user flows. This caused a
                massive shift in my project approach. It allowed me to encounter numerous issues that would have gone unaddressed if I had only
                created separate feature screens.
              </p>

              <p>
                This moment reminds me to always focus on the entire context of a user&rsquo;s journey and experience. I need to avoid fixating on
                individual features without remembering the greater context of the system in which I&rsquo;m working. Good UX design isn&rsquo;t
                separated features in a vacuum, it&rsquo;s the creation of an entire experience.
              </p>
            </Description>

            <Column>
              <Title>Learning</Title>
              <Heading>The importance of involving users as early, and as often as possible</Heading>
              <Description>
                <p>
                  In this project, I spoke with 10 potential users, in two separate groups before becoming invested in any concept or solution. This
                  gave me important background information from which to build ideas. But equally valuable was my decision to involve this group once
                  again after I had developed an idea. This allowed me to gather feedback on my concept, before having created any semblance of a
                  prototype. This provided tangible validation that my ideas were worth pursuing, and a foundation of user feedback from which to expand
                  and build.
                </p>

                <p>
                  This moment reminded me to always involve users as early and as often as possible. Often, designers forgo interviewing users in a
                  project&rsquo;s early stages. This is usually done in favour of instead testing before ideation, or after a prototype has been
                  actualized. But, by keeping users close to my project at every stage, my solution became tailor-fitted to the exact problem that I
                  had observed in the 3D printing space.
                </p>
              </Description>
            </Column>

            <Column>
              <Title>Successes</Title>
              <Heading>Creating actionable steps to achieving the core functionality of the service</Heading>
              <Description>
                <p>
                  I often questioned what the final outcome of this project should be. I felt strongly about this concept, and I needed to do it
                  justice. Around the end of the first month, after much planning and revision, I had defined my goal of creating 2 user journey
                  prototypes. With this finally established, I quickly fell into the groove of cycling through iterations week by week. I made
                  screens, found testers, gathered feedback, implemented changes, and repeated. In the end, all the pieces fell together. Resulting in
                  a polished, cohesive execution of my idea.
                </p>

                <p>
                  Despite many challenging time crunches during development, I steadily moved through each phase without any major snags. Working with
                  a clear end goal, and defining actionable steps to reach it, is what brought this project to life. For this reason, the planning and
                  organization of this project was its greatest success.
                </p>
              </Description>
            </Column>
          </Section>
        </Chapter>
      </CaseStudyPage>
    </>
  );
}

export default MakeRight;
