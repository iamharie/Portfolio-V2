import { motion } from "framer-motion";
import TypewriterMotion from "../components/animation/TypewriterMotion";
import { jobDetails } from "../components/models/workExperience.ts";
// import resume from "../assets/resume/myResume.pdf";
interface JobDetails {
  title: string;
  role: string;
  description?: string;
  icon: string;
}

const Experience = () => {
  return (
    <section className="py-20 bg-primary-light dark:bg-primary min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-text-light dark:text-text-dark"
        >
          <h1 className="text-4xl font-bold mb-12 text-center">
            <TypewriterMotion text="Professional Journey" speed={0.1} />
          </h1>
          {/* <div className="text-center mb-12">
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-white py-2 px-4 rounded-lg shadow-lg hover:bg-accent-dark transition-colors mr-4 sm:mb-2"
            >
              View My Resume
            </a>
            <a
              href={resume}
              download="resume.pdf"
              className="inline-block bg-accent text-white py-2 px-4 rounded-lg shadow-lg hover:bg-accent-dark transition-colors"
            >
              Download My Resume
            </a>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobDetails.map((job: JobDetails, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-secondary-light dark:bg-secondary p-6 rounded-lg"
              >
                <div className="text-4xl mb-4">{job.icon}</div>
                <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                <h3 className="text-1xl font-bold mb-4">{job.role}</h3>
                <p className="text-text-light dark:text-text-dark">
                  {job.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
