import { motion } from "framer-motion";
import TypewriterMotion from "./animation/TypewriterMotion";
import projectDetails, { projectContent } from "./models/projectCover";
import ProjectDetails from "./ProjectDetails";

// ── Section divider label ──────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-10"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/40" />
      <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">{label}</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/40" />
    </motion.div>
  );
}

// ── Project grid ───────────────────────────────────────────────

type Project = (typeof projectDetails)[number];

function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((project, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
        >
          <ProjectDetails member={project} index={i} />
        </motion.div>
      ))}
    </div>
  );
}

// ── Page section ───────────────────────────────────────────────

const Projects = () => {
  return (
    <section className="py-20 text-text-light dark:text-text-dark">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Section title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold"
          >
            <TypewriterMotion text="Projects" speed={0.1} />
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="h-0.5 w-20 bg-accent mx-auto mt-4 rounded-full origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-text-light/70 dark:text-text-dark/70 max-w-2xl mx-auto mt-5 text-sm leading-relaxed"
          >
            {projectContent}
          </motion.p>
        </div>

        <SectionLabel label="All Projects" />
        <ProjectGrid items={projectDetails} />

      </div>
    </section>
  );
};

export default Projects;
