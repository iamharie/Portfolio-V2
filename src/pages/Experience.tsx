import { motion } from "framer-motion";
import TypewriterMotion from "../components/animation/TypewriterMotion";
import { jobDetails } from "../components/models/workExperience.ts";
import { education } from "../components/models/education.ts";

interface JobDetails {
  title: string;
  role: string;
  description?: string;
  icon: string;
}

interface Education {
  instution: string;
  course: string;
  period?: string;
  icon: string;
}

// ── Card components ────────────────────────────────────────────

function WorkCard({ job }: { job: JobDetails }) {
  const isCurrent = job.description?.includes("Present");
  return (
    <div className="bg-secondary-light/50 dark:bg-secondary/50 backdrop-blur-sm
                    border border-secondary-light dark:border-secondary/70
                    border-l-[3px] border-l-accent rounded-2xl p-5
                    hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10
                    hover:bg-secondary-light/80 dark:hover:bg-secondary/80
                    transition-all duration-300 cursor-default">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-base font-bold leading-snug text-text-light dark:text-text-dark">
            {job.title}
          </h2>
          <p className="text-accent text-sm font-semibold mt-1">{job.role}</p>
        </div>

        <span className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium shrink-0 ${
          isCurrent
            ? "bg-green-500/15 text-green-500 dark:text-green-400"
            : "bg-accent/10 text-accent"
        }`}>
          {isCurrent && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
          )}
          {job.description?.replace("🟢", "").trim()}
        </span>
      </div>
    </div>
  );
}

function EduCard({ edu }: { edu: Education }) {
  return (
    <div className="bg-secondary-light/50 dark:bg-secondary/50 backdrop-blur-sm
                    border border-secondary-light dark:border-secondary/70
                    border-l-[3px] border-l-accent rounded-2xl p-5
                    hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10
                    hover:bg-secondary-light/80 dark:hover:bg-secondary/80
                    transition-all duration-300 cursor-default">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-base font-bold leading-snug text-text-light dark:text-text-dark">
            {edu.instution}
          </h2>
          <p className="text-accent text-sm font-semibold mt-1">{edu.course}</p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium shrink-0">
          {edu.period}
        </span>
      </div>
    </div>
  );
}

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

// ── Timeline dot ───────────────────────────────────────────────

function Dot() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="w-3 h-3 rounded-full bg-accent ring-4 ring-accent/20 z-10 shrink-0"
    />
  );
}

// ── Generic alternating timeline ───────────────────────────────

function Timeline<T>({
  items,
  renderCard,
}: {
  items: T[];
  renderCard: (item: T) => React.ReactNode;
}) {
  return (
    <>
      {/* ── Desktop: alternating left / right ── */}
      <div className="hidden md:block relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px
                        bg-gradient-to-b from-accent/60 via-accent/25 to-transparent" />
        <div className="space-y-6">
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-[1fr_28px_1fr] items-center gap-6">

              {/* Left slot */}
              {i % 2 === 0 ? (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  {renderCard(item)}
                </motion.div>
              ) : (
                <div />
              )}

              <div className="flex justify-center">
                <Dot />
              </div>

              {/* Right slot */}
              {i % 2 !== 0 ? (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  {renderCard(item)}
                </motion.div>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: left rail ── */}
      <div className="md:hidden relative pl-8">
        <div className="absolute left-3 top-2 bottom-2 w-px
                        bg-gradient-to-b from-accent/60 via-accent/25 to-transparent" />
        <div className="space-y-5">
          {items.map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-5 top-4 w-3 h-3 rounded-full bg-accent ring-4 ring-accent/20 z-10" />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
              >
                {renderCard(item)}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ── Page ───────────────────────────────────────────────────────

const Experience = () => {
  return (
    <section className="py-20 min-h-screen text-text-light dark:text-text-dark">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Page title */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold"
          >
            <TypewriterMotion text="Professional Journey" speed={0.05} />
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="h-0.5 w-20 bg-accent mx-auto mt-4 rounded-full origin-center"
          />
        </div>

        {/* Work Experience */}
        <SectionLabel label="Work Experience" />
        <Timeline
          items={jobDetails}
          renderCard={(job: JobDetails) => <WorkCard job={job} />}
        />

        {/* Education */}
        <div className="mt-20">
          <SectionLabel label="Education" />
          <Timeline
            items={education}
            renderCard={(edu: Education) => <EduCard edu={edu} />}
          />
        </div>

      </div>
    </section>
  );
};

export default Experience;
