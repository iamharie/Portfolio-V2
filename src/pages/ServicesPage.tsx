import React from "react";
import { motion } from "framer-motion";

const ServicesPage = () => {
  const services = [
    {
      title: "Manufacturing Excellence",
      description:
        "State-of-the-art manufacturing facilities with advanced automation and quality control.",
      icon: "🏭",
    },
    {
      title: "Assembly",
      description:
        "Precision assembly services to ensure seamless integration of components, delivering reliable and high-quality finished products.",
      icon: "⚙️",
    },
    {
      title: "Inventory Management",
      description:
        "Efficient inventory management solutions, including kitting, Vendor-Owned Inventory (VOI), and Vendor-Managed Inventory (VMI), to streamline supply chain operations and ensure timely delivery of high-quality components.",
      icon: "📊",
    },
    {
      title: "Delivery and Tracking",
      description:
        "Reliable delivery and tracking services to ensure timely, secure shipments with real-time updates for complete transparency and customer satisfaction.",
      icon: "✓",
    },
  ];

  return (
    <section className="py-20 bg-primary-light dark:bg-primary min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-text-light dark:text-text-dark"
        >
          <h1 className="text-4xl font-bold mb-12 text-center">Our Services</h1>
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

export default ServicesPage;
