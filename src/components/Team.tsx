import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const TeamMember = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="bg-secondary-light dark:bg-secondary rounded-lg overflow-hidden shadow-lg"
    >
      <div className="aspect-w-1 aspect-h-1">
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
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-light dark:text-text-dark hover:text-accent transition-colors"
          >
            <FaGithub size={24} />
          </a>
          <a
            href={`mailto:${member.email}`}
            className="text-text-light dark:text-text-dark hover:text-accent transition-colors"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Team = () => {
  const teamMembers = [
    {
      image: "",
      name: "Project 1",
      position: "",
      //   description:
      //     "With over 20 years of experience in industrial engineering and leadership.",
      email: null,
      linkedin: null,
    },
    {
      image: "",
      name: "Project 2",
      position: "",
      //   description: "Leading our technological innovations and R&D initiatives.",
      email: null,
      linkedin: null,
    },
    {
      image: "",
      name: "Project 3",
      position: "",
      //   description: "Expert in automation and manufacturing processes.",
      email: null,
      linkedin: null,
    },
    {
      name: "Project 4",
      position: "",
      //   description: "Streamlining operations and ensuring quality excellence.",
      email: null,
      linkedin: null,
    },
  ];

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
            Projects!
          </h2>
          <p className="text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto">
            Explore my curated portfolio of projects, showcasing innovative
            solutions, modern design, and technical expertise across front-end,
            back-end, and full-stack development.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
