import React from "react";
import Form from "./Form";

const Contact = () => {
  return (
    <section className="py-20 bg-primary-light dark:bg-primary text-text-light dark:text-text-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        <div className="max-w-2xl mx-auto">
          <Form />
        </div>
      </div>
    </section>
  );
};

export default Contact;
