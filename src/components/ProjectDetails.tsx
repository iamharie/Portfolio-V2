import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkSquareAlt } from "react-icons/fa";

interface ProjectDetailsProps {
  member: {
    name: string;
    position?: string | undefined;
    description: string;
    image: string;
    github?: string | undefined;
    url?: string | undefined;
  };
  index: number;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      viewport={{ once: true }}
      className="bg-secondary-light dark:bg-secondary rounded-lg overflow-hidden shadow-lg"
    >
      {/* <div className="aspect-w-1 aspect-h-1"> */}
      <div className="w-full h-64">
        <img
          src={
            member.image ||
            "https://via.placeholder.com/300x300?text=Team+Member"
          }
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
          {member.name}
        </h3>
        <p className="text-text-light dark:text-text-dark mb-2">
          {member.position}
        </p>
        <p className="text-text-light/80 dark:text-text-dark/80 text-sm mb-4">
          {member.description}
        </p>
        <div className="flex space-x-4">
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-light dark:text-text-dark hover:text-accent transition-colors"
          >
            <FaGithub size={24} />
          </a>

          {member.url && (
            <a
              href={member.url}
              target="_blank"
              className="text-text-light dark:text-text-dark hover:text-accent transition-colors"
            >
              <FaExternalLinkSquareAlt size={24} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
