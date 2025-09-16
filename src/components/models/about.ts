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
    passageOne: `I am a dedicated Integration Engineer with a passion for building seamless system connections and delivering automation-driven solutions. My academic background, including a Bachelor's and Master's degree in Computer Science, has strengthened my foundation in problem-solving, data flow management, and software integration.`,
    passageTwo: `I specialize in working with iPaaS tools like Workato (and previously Boomi) to design and implement integrations across ERP, WMS, and e-commerce platforms. From transforming and mapping EDI data into XML/JSON, to ensuring accurate order flows between NetSuite and warehouse systems, I focus on creating reliable, scalable, and business-critical workflows.`,
    passageThree: `Beyond integrations, I enjoy exploring emerging technologies and continuously expanding my expertise. I thrive on turning complex business requirements into efficient, automated processes that reduce manual effort and improve system performance.`,
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
