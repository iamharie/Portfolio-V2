import React from "react";
import { motion } from "framer-motion";
import Form from "../components/Form";

const ContactPage = () => {
  return (
    <section className="py-20 bg-primary-light dark:bg-primary min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-text-light dark:text-text-dark"
        >
          <h1 className="text-4xl font-bold mb-12 text-center">Get in Touch</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <p>
                  {/* <strong>Address:</strong>
                  <br />
                  2101 E 21st St N,
                  <br />
                  Wichita, KS 67214 */}
                </p>
                <p>
                  <strong>Email:</strong>
                  <br />
                  hariharnmohan@gmail.com
                </p>
                <p>
                  <strong>Phone:</strong>
                  <br />
                  (732) 522-9688
                </p>
              </div>
            </div>
            <div>
              <Form />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
