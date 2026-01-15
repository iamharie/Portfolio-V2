// import { string } from "prop-types";

interface AboutContent {
  passages: {
    passageOne: string;
    passageTwo: string;
    passageThree: string;
    passageFour: string;
  };
  visions: {
    visionOne: string;
    visionTwo: string;
  };
}

const aboutContent: AboutContent = {
  passages: {
    passageOne: `I am a Software Engineer with strong experience building scalable, secure, and high-performance web applications across the full stack. I specialize in translating complex business requirements into clean, maintainable, and production-ready solutions.`,
    passageTwo: `My expertise spans modern frontend development with React and TypeScript, paired with robust backend systems built using Java, Spring Boot, and RESTful APIs. I have hands-on experience designing APIs, integrating services, and optimizing application performance to support real-world scale and reliability.`,
    passageThree: `I work comfortably across the entire development lifecycle, from architecture and implementation to testing, deployment, and maintenance, while collaborating in Agile, fast-paced environments. Whether working independently or leading initiatives within a team, I focus on code quality, system scalability, and long-term maintainability.`,
    passageFour: `I am driven by continuous learning and enjoy tackling challenging problems that push both my technical depth and system-level thinking. My goal is to build software that not only works, but scales, performs, and delivers lasting value.`,
  },
  visions: {
    visionOne: `I believe learning is a continuous and evolving journey. My vision is to collaborate with like-minded individuals who are driven by innovation, growth, and excellence, and to contribute within environments that value thoughtful problem-solving and collaboration.`,
    visionTwo: `I aspire to work on meaningful projects that deliver real business impact while fostering personal and professional growth. By embracing challenges and applying my skills with intent, I aim to build solutions that are scalable, impactful, and relevant in an ever-evolving technology landscape.`,
  },
};

export default aboutContent;
