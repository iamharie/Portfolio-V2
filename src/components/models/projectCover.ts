import image1 from "../../assets/projectCover/One-etezazi.png";
import image2 from "../../assets/projectCover/Two-ShoppingCart.webp";
import image3 from "../../assets/projectCover/Three-PM-Tool.webp";
import image4 from "../../assets/projectCover/Four-BankApp.webp";
import image5 from "../../assets/projectCover/Five-location-picker.webp";
import image6 from "../../assets/projectCover/Six-Count-Down.webp";
import image7 from "../../assets/projectCover/Seven-Login-Form.webp";
import image8 from "../../assets/projectCover/Eight-QuizApp.webp";
import image9 from "../../assets/projectCover/Nine-Tic Tac Toe.webp";
import image10 from "../../assets/projectCover/Ten-ToDo List.webp";
import image11 from "../../assets/projectCover/Eleven-weatherApp.png";
import image12 from "../../assets/projectCover/Twelve-portfolio.png";
import resumeBuilder from "../../assets/projectCover/resumeBuilder.png";
import fitCoachAi from "../../assets/projectCover/fitCoachAi.png";
import StayStrong from "../../assets/projectCover/StayStrong.webp";

export const projectContent = `Explore my curated portfolio of projects, showcasing innovative
            solutions, modern design, and technical expertise across front-end,
            back-end, and full-stack development.`;

// Object containing project cover images
const projectCover = {
  image1: image1,
  image12: image12,
  image2: image2,
  image3: image3,
  image11: image11,
  image4: image4,
  image5: image5,
  image6: image6,
  image7: image7,
  image8: image8,
  image9: image9,
  image10: image10,
  resumeBuilder: resumeBuilder,
  fitCoachAi: fitCoachAi,
  StayStrong: StayStrong,
};

// export default projectCover;
const projectDetails = [
  {
    image: projectCover.StayStrong,
    name: "StayStrong",
    // position: "Deployed",
    description:
      "StayStrong is a production-grade full-stack fitness web application used by real users. \nBuilt as a scalable MVP using React, TypeScript, Vite, Tailwind CSS, Node.js, Express, PostgreSQL, and Prisma, and deployed in production via Netlify and Railway following real-world engineering practices.",
    github: "https://github.com/iamharie/Portfolio-V2",
    url: "https://hariharanmohan.netlify.app/staystrong",
  },
  {
    image: projectCover.fitCoachAi,
    name: "AI Meal Planner",
    // position: "Deployed",
    description:
      "A smart web application that uses AI to generate personalized meal plans based on user preferences, dietary goals, and health metrics.",
    github: "https://github.com/iamharie/fitcoachai",
    url: "https://fitcoachai.netlify.app/",
  },
  {
    image: projectCover.resumeBuilder,
    name: "AI Resume Builder",
    // position: "Deployed",
    description:
      "Resume Builder with OpenAI API: Get a Tailored Resume Delivered to Your Inbox in One Click",
    github: "https://github.com/iamharie/Resume-Builder",
    url: "https://resumeprofilebuilder.netlify.app/",
  },
  {
    image: projectCover.image1,
    name: "Etezazi Industries",
    // position: "Deployed",
    description:
      "Recreated a website for a local business using React, Tailwind CSS, Firebase.",
    github: "https://github.com/iamharie/Etezazi-Industries",
    url: "https://etezazi-interview.netlify.app/",
  },
  {
    image: projectCover.image12,
    name: "Portfolio",
    // position: "Deployed",
    description: "A portfolio website built with HTML5, CSS3 and Javascript",
    github: "https://github.com/iamharie/My-Portfolio",
    url: "https://hariharanmohan-portfolio.netlify.app ",
  },
  {
    image: projectCover.image2,
    name: "Online Shopping Cart",
    // position: "",
    description:
      "A shopping cart application developed using React, Redux, Tailwind CSS, NodeJS, Express, and MongoDB.",
    github: "https://github.com/iamharie",
    // url: "",
  },
  {
    image: projectCover.image3,
    name: "Project Management Tool",
    // position: "",
    description:
      "A project management tool built with React, React-Context-API, Tailwind CSS, and Firebase.",
    github: "https://github.com/iamharie/PM-Tool",
    // url: "",
  },
  {
    image: projectCover.image4,
    name: "Minimilist Bank App",
    // position: "",
    description: "A minimalist bank app built with HTML5, CSS3 and Javascript.",
    github: "https://github.com/iamharie/Bank-App",
    // url: "",
  },
  {
    image: projectCover.image11,
    name: "Weather App",
    // position: "Deployed",
    description:
      "A weather app built with React, Tailwind CSS and OpenWeather API.",
    github: "https://github.com/iamharie/weather-app",
    url: "https://haricast.netlify.app/",
  },
  {
    image: projectCover.image5,
    name: "Location Picker",
    // position: "",
    description:
      "A location picker built with React, Google Maps API and Tailwind CSS.",
    github: "https://github.com/iamharie/location-picker",
    // url: "",
  },
  {
    image: projectCover.image6,
    name: "Final Count Down",
    // position: "",
    description:
      "A final count down timer built with React, Tailwind CSS and Javascript.",
    github: "https://github.com/iamharie/Final-Count-Down",
    // url: "",
  },
  {
    image: projectCover.image7,
    name: "The Form",
    // position: "Deployed",
    description: "A login form built with HTML5, CSS3, Javascript.",
    github: "https://github.com/iamharie/loginScreen",
    url: "https://harisloginscreen.netlify.app",
  },
  {
    image: projectCover.image8,
    name: "Quiz App",
    // position: "",
    description:
      "A quiz app built with React, Tailwind CSS and Open Trivia API.",
    github: "https://github.com/iamharie/quiz-app",
    // url: "",
  },
  {
    image: projectCover.image9,
    name: "Tic Tac Toe",
    // position: "",
    description:
      "A tic tac toe game built with React, Tailwind CSS and Javascript.",
    github: "https://github.com/iamharie/Tic-Tac-Toe",
    // url: "",
  },
  {
    image: projectCover.image10,
    name: "To Do List",
    // position: "",
    description: "A to do list built with HTML5, CSS3 and Javascript.",
    github: "https://github.com/iamharie/Quick-List",
    // url: "",
  },
];

export default projectDetails;
