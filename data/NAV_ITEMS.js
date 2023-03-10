import { v4 as uuidv4 } from "uuid";

var NAV_ITEMS = [
  {
    name: "Home",
    text: "Sam Giustizia",
    link: "/",
    type: "Logo",
    ariaLabel: "Home",
  },
  {
    name: "Case Studies",
    text: "Case Studies",
    link: "/",
    type: "Link",
    ariaLabel: "View case studies",
  },
  {
    name: "Explorations",
    text: "Explorations",
    link: "/Explorations",
    type: "Link",
    ariaLabel: "Visit the explorations page",
  },
  {
    name: "About",
    text: "About",
    link: "/About",
    type: "Link",
    ariaLabel: "Visit the about page",
  },
];

function navItemsInit(arr) {
  arr.forEach((item) => (item.key = uuidv4()));
  return arr;
}

export default navItemsInit(NAV_ITEMS);
