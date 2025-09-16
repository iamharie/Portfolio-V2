import { motion } from "framer-motion";
import aboutContent from "./models/about";

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
            <p className="text-lg mb-10">{aboutContent.passages.passageOne}</p>
            <p className="text-lg mb-10">{aboutContent.passages.passageTwo}</p>
            <p className="text-lg mb-10">
              {aboutContent.passages.passageThree}
            </p>
          </div>
          <div className="bg-secondary-light dark:bg-secondary p-10 rounded-lg mt-8">
            <h3 className="text-2xl font-bold mb-4">My Vision</h3>
            <p className="mb-10">{aboutContent.visions.visionOne}</p>
            <p className="mb-10">{aboutContent.visions.visionTwo}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
