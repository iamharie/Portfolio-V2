import { motion } from "framer-motion";
import TypewriterMotion from "./animation/TypewriterMotion";
import teamMembers, { projectContent } from "./models/projectCover";
import ProjectDetails from "./ProjectDetails";

const Projects = () => {
  return (
    <section className="py-20 bg-primary-light dark:bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-text-light dark:text-text-dark mb-4">
            <TypewriterMotion text="Projects" speed={0.1} />
          </h2>
          <p className="text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto">
            {projectContent}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <ProjectDetails key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
