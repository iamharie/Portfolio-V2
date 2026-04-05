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

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ member }) => {
  return (
    <div
      className="bg-secondary-light/50 dark:bg-secondary/50 backdrop-blur-sm
                 border border-secondary-light dark:border-secondary/70
                 border-l-[3px] border-l-accent rounded-2xl overflow-hidden
                 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10
                 hover:bg-secondary-light/80 dark:hover:bg-secondary/80
                 transition-all duration-300"
    >
      {/* Project image */}
      <div className="w-full h-44 overflow-hidden">
        <img
          src={member.image || "https://via.placeholder.com/600x300?text=Project"}
          alt={member.name}
          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-bold leading-snug text-text-light dark:text-text-dark">
          {member.name}
        </h3>

        {member.position && (
          <p className="text-accent text-sm font-semibold mt-1">{member.position}</p>
        )}

        <p className="text-text-light/70 dark:text-text-dark/70 text-sm mt-2 leading-relaxed line-clamp-3">
          {member.description}
        </p>

        {/* Links */}
        <div className="flex items-center gap-3 mt-4">
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full
                         bg-accent/10 text-accent font-medium
                         hover:bg-accent hover:text-white transition-all duration-200"
            >
              <FaGithub size={13} />
              GitHub
            </a>
          )}
          {member.url && (
            <a
              href={member.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full
                         bg-accent/10 text-accent font-medium
                         hover:bg-accent hover:text-white transition-all duration-200"
            >
              <FaExternalLinkSquareAlt size={13} />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
