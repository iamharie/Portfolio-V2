// import React from "react";
import { motion } from "framer-motion";
import azure from "../assets/azure.png";
import AWS from "../assets/AWS.png";
import google from "../assets/google.png";

const Endorsed = () => {
  const endorsements = [
    {
      id: 1,
      image: AWS,
      alt: "AWS Developer Associate certification logo",
    },
    {
      id: 2,
      image: google,
      alt: "Google AI Essentials Certification logo",
    },
    {
      id: 3,
      image: azure,
      alt: "Azure AZ-900 certification logo",
    },
  ];

  return (
    <section className="py-16 bg-secondary-light dark:bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-12 text-text-light dark:text-text-dark">
            Certified
          </h2>
          <div className="flex justify-center items-center space-x-12">
            {endorsements.map((endorsement) => (
              <motion.div
                key={endorsement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-48 h-48 relative"
              >
                <img
                  src={endorsement.image}
                  alt={endorsement.alt}
                  className="w-full h-full object-contain filter hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Endorsed;
