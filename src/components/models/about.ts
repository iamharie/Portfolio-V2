// import { string } from "prop-types";

interface AboutContent {
  passages: {
    passageOne: string;
    passageTwo: string;
    passageThree: string;
  };
  visions: {
    visionOne: string;
    visionTwo: string;
  };
}

const aboutContent: AboutContent = {
  passages: {
    passageOne: `Highly skilled Software Development Engineer experienced in developing, implementing, customizing, integrating, supporting and of course de-bugging business applications. Proficient in SDLC, Agile, and Waterfall methodologies, with a strong focus on Java development using Servlets, JSP, JSTL, Java Beans, and JDBC. Skilled in front-end technologies, frameworks and libraries including HTML, CSS, JavaScript, TypeScript, Bootstrap, jQuery, Ajax, JSON, XML; React and React Native combined with back-end experience using frameworks like Spring Boot, Spring MVC and Hibernate. Familiar with Gradle for build automation and experienced in creating RESTful APIs with Spring MVC. Proficient in version control and collaboration tools such as Git and GitHub, as well as build management with Maven. `,
    passageTwo: `I excel at developing scalable, secure web applications, working independently, or leading teams in dynamic, fast-paced environments. With a keen eye for market trends and a commitment to delivering high-quality solutions.`,
    passageThree: `I am always eager to take on new challenges and grow my technical expertise. My blend of technical skills and leadership experience allows me to contribute effectively to both new development and system optimization projects.`,
  },
  visions: {
    visionOne: `I believe that learning is a continuous and dynamic journey, not a
              linear process. My vision is to work with like-minded individuals
              who share a passion for innovation and growth, fostering
              collaboration that drives excellence.`,
    visionTwo: `I aspire to contribute to meaningful projects that add
              tangible value to businesses while providing opportunities for
              personal and professional development. By embracing challenges and
              leveraging my skills, I aim to create impactful solutions that
              make a difference in the ever-evolving world of technology.`,
  },
};

export default aboutContent;
