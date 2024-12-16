import { string } from "prop-types";

interface AboutContent {
  passages: {
    passageOne: string;
    passageTwo: string;
  };
  visions: {
    visionOne: string;
    visionTwo: string;
  };
}

const aboutContent: AboutContent = {
  passages: {
    passageOne: `I am a dedicated Software Engineer and Full Stack Developer with a
                passion for crafting innovative solutions and exploring the latest
                technologies. My academic journey includes a Bachelor's and a
                Master's degree in Computer Science, which have solidified my
                foundation in problem-solving and software development.`,
    passageTwo: `Beyond coding, I am deeply intrigued by electronic gadgets and
                enjoy staying up-to-date with technological advancements. I thrive
                on turning ideas into functional, impactful applications and am
                always eager to tackle new challenges in the ever-evolving tech
                landscape.`,
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
