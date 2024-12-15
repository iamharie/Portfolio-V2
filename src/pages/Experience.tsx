import { motion } from "framer-motion";

const Experience = () => {
  const services = [
    // {
    //   title: "Surge Technologies Inc",
    //   description:
    //     "Optimized UI/UX for an evidence management system using React, TypeScript, and Redux, enhancing user experience by 10% and reducing API calls by 8%. Implemented secure RESTful API integration, optimized accessibility for WCAG compliance, and improved data retrieval by 30% using SQL Server and Spring Boot. Streamlined CI/CD pipelines with GitHub, Jenkins, and AWS, accelerating deployments while ensuring robust security with JWT and Spring Security.",
    //   icon: "🏢",
    // },
    {
      title: "Porter Lee Corporation",
      description:
        "Optimized UI/UX for an evidence management system using React, TypeScript, and Redux, enhancing user experience by 10% and reducing API calls by 8%. Implemented secure RESTful API integration, optimized accessibility for WCAG compliance, and improved data retrieval by 30% using SQL Server and Spring Boot. Streamlined CI/CD pipelines with GitHub, Jenkins, and AWS, accelerating deployments while ensuring robust security with JWT and Spring Security.",
      icon: "🏢",
    },
    {
      title: "Wichita State University",
      description:
        "Developed reusable UI components and optimized state management using React Context API and Next.js, enhancing SEO and reducing load times by 20%. Improved UI/UX with Material UI and Figma, boosting user retention by 5%. Built scalable RESTful APIs with Node.js and MongoDB, increasing database efficiency by 30%. Ensured high-quality code with React Testing Library and thorough design reviews.",
      icon: "🏢",
    },
    {
      title: "Accenture",
      description:
        "Developed an automated reporting tool using React, saving 2 hours daily and reducing costs by 30%. Led a critical server migration, minimizing downtime by 15%. Built RESTful APIs with .NET and connected to SQL Server using Entity Framework for efficient data handling. Improved onboarding efficiency by 30% with training materials and ensured software quality with 100% issue resolution through unit testing.",
      icon: "🏢",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    // <div className="container mx-auto px-4 py-8">
    //   <h2 className="text-3xl font-bold text-center mb-8">
    //     Professional Journey
    //   </h2>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    //     {services.map((service, index) => (
    //       <motion.div
    //         key={index}
    //         className="bg-secondary-light dark:bg-secondary rounded-lg overflow-hidden shadow-lg p-6"
    //         initial="hidden"
    //         animate="visible"
    //         variants={cardVariants}
    //         transition={{ delay: index * 0.1, duration: 0.2 }}
    //         whileHover={{ scale: 1.15 }}
    //       >
    //         <div className="flex items-center justify-center mb-4 text-4xl">
    //           <a className="hover:text-accent transition-colors cursor-pointer">
    //             {service.icon}
    //           </a>
    //         </div>
    //         <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
    //           {service.title}
    //         </h3>
    //         <p className="text-text-light dark:text-text-dark">
    //           {service.description}
    //         </p>
    //       </motion.div>
    //     ))}
    //   </div>
    // </div>
    <section className="py-20 bg-primary-light dark:bg-primary min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-text-light dark:text-text-dark"
        >
          <h1 className="text-4xl font-bold mb-12 text-center">
            Professional Journey
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-secondary-light dark:bg-secondary p-6 rounded-lg"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-text-light dark:text-text-dark">
                  {service.description}
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
