import { HOME_IMGS } from "./HOME_IMGS";

const { ABOUT_IMGS } = require("./ABOUT_IMGS");

const SEO_DATA = processSeoData({
  home: {
    title: "Sam Giustizia | Multidisciplinary Designer",
    description:
      "Hi, I'm Sam. I'm a digital creator with a focus on UX and 3D Design. This portfolio's got all my favorite projects. If you're free, come check it out :)",
    keywords: "Sam Giustizia, UX/UI Design, Portfolio, 3D Design, Multidisciplinary Designer, UX Engineer",
    img: ABOUT_IMGS.me,
    url: "/",
  },

  makeright: {
    title: "MakeRight | Case Study",
    description:
      "Breaking down barriers to 3D printing by connecting hobbyist makers to customers in need. A theoretical service, created as the capstone to my Bachelor's in IXD",
    keywords: "Sam Giustizia, MakeRight, Interaction Design, Case Study, 3D Printing, User Experience, Prototyping",
    url: "/Studies/MakeRight",
    img: HOME_IMGS.makeright_main,
  },


  made: {
    title: "MADE | Case Study",
    description:
      "Collaborating with MADE Clothing Co., I created photorealistic renders of dress shirt components. Images which then powered an online tool for custom purchases.",
    keywords: "Sam Giustizia, 3D Generalist, Made Clothing Co., Case Study, Product Rendering",
    url: "/Studies/MADE",
    img: HOME_IMGS.made_main,
  },


  koalako: {
    title: "KoalaKo | Case Study",
    description:
      "KoalaKo is a prototype app created to help parents support the creative development of their children.  Made in collaboration with 3 talented designers.",
    keywords: "Sam Giustizia, UX Design, KoalaKo, Design Lead, Case Study, Prototyping",
    url: "/Studies/KoalaKo",
    img: HOME_IMGS.koalako_main,
  },

  explorations: {
    // title: "Explorations | Creative Endeavors And Loose Ends",
    // title: "Explorations | Gallery Of Creative Endeavors And Other Pixels",
    title: "Explorations | Creative Endeavors And Loose Ends",
    description:
      "The (mostly) complete collection of my experiments, client work, and side projects.  Everything that didn't fit in a case study.",
    keywords: "Sam Giustizia, UX Engineering, Gallery, Explorations, 3D Design, Photography",
    url: "/Explorations",
    img: HOME_IMGS.explorations_alt,
  },

  about: {
    title: "About | Who Is This?",
    description:
      "My past work experience, and education, as well as some of my hobbies and obsessions at the moment. Stop by and say hi!",
    keywords: "Sam Giustizia, UX Engineering, Gallery, Explorations, 3D Design, Photography",
    url: "/About",
    img: ABOUT_IMGS.me,

  },
});

function processSeoData(seo) {
  for (let page in seo) {
    if (!seo[page]) {
      console.log(`Missing data for page: ${page}`);
      continue;
    }

    seo[page].title = seo[page].title || "";
    seo[page].description = seo[page].description || "";
    seo[page].keywords = seo[page].keywords || "";
    seo[page].url = seo[page].url || "";

    if (seo[page].url === "") {
      console.log(`Missing URL for page: ${page}`);
    }

    seo[page].url = "https://www.samgiustizia.ca" + seo[page].url;

    if (!seo[page].img) {
      seo[page].img = {};
      console.log(`Missing image for page: ${page}`);
    }

    if (!seo[page].img.src) {
      seo[page].img.src = "";
      console.log(`Missing image source for page: ${page}`);
    }

    seo[page].imgUrl = "https://www.samgiustizia.ca" + seo[page].img.src.replace(".", "");
  }

  return seo;
}

export default SEO_DATA;