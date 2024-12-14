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
          <h2 className="text-4xl font-bold mb-8 text-center">About Us</h2>
          <div className="space-y-6">
            <p className="text-lg mb-10">
              Etezazi Industries, Inc., is a diverse manufacturing company
              specializing in advanced solutions for precision engineering and
              manufacturing. Our expertise encompasses a wide range of
              capabilities, including CNC Mills, Lathes, Mill-Turns, and
              Mechanical Brakes. These tools enable us to manufacture complex
              multi-axis components and sheet metal parts, meticulously tailored
              to meet our clients' specific needs and requirements.
              <br />
              <br />
              At Etezazi Industries, we are committed to excellence through
              workplace organization and standardized procedures, guided by the
              6S philosophy. This approach helps us reduce waste, enhance
              safety, and optimize operational efficiency. By partnering with
              us, clients benefit from a team of skilled professionals,
              innovative technologies, and a proactive mindset to address
              challenges in a fast-paced and dynamic industry.
            </p>
          </div>
          <div className="bg-secondary-light dark:bg-secondary p-6 rounded-lg mt-8">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p>
              At Etezazi Industries, Inc., our mission is to consistently
              deliver excellence by adhering to the highest standards of quality
              and innovation. We strive to meet and exceed client expectations
              by maintaining AS9100D-certified processes, ensuring reliability
              and trust in every aspect of our operations.
              <br />
              <br /> We are committed to investing in state-of-the-art equipment
              and facilities, coupled with fostering a team of seasoned
              professionals and degreed engineers. This approach equips us with
              the expertise and technology necessary to provide cutting-edge
              solutions and superior products in a rapidly evolving, highly
              technical industry.
              <br />
              <br /> Guided by the principles of the 6S philosophy, we focus on
              creating a lean, efficient, and safe work environment. By
              simplifying processes, reducing waste, and improving safety, we
              enhance quality and efficiency to consistently deliver value to
              our clients.
              <br />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
