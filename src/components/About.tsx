import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-20 bg-primary-light dark:bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-text-light dark:text-text-dark"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
          <div className="space-y-6">
            <p className="text-lg mb-10">
              I am a dedicated Software Engineer and Full Stack Developer with a
              passion for crafting innovative solutions and exploring the latest
              technologies. My academic journey includes a Bachelor's and a
              Master's degree in Computer Science, which have solidified my
              foundation in problem-solving and software development.
              <br />
              <br />
              Beyond coding, I am deeply intrigued by electronic gadgets and
              enjoy staying up-to-date with technological advancements. I thrive
              on turning ideas into functional, impactful applications and am
              always eager to tackle new challenges in the ever-evolving tech
              landscape.
            </p>
          </div>
          <div className="bg-secondary-light dark:bg-secondary p-6 rounded-lg mt-8">
            <h3 className="text-2xl font-bold mb-4">My Vision</h3>
            <p>
              I believe that learning is a continuous and dynamic journey, not a
              linear process. My vision is to work with like-minded individuals
              who share a passion for innovation and growth, fostering
              collaboration that drives excellence.
              <br />
              <br /> I aspire to contribute to meaningful projects that add
              tangible value to businesses while providing opportunities for
              personal and professional development. By embracing challenges and
              leveraging my skills, I aim to create impactful solutions that
              make a difference in the ever-evolving world of technology.
              <br />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
