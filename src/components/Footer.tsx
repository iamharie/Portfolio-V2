// import React from "react";
import { FaLinkedin, FaGithub, FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary-light dark:bg-secondary text-text-light dark:text-text-dark py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Hariharan Mohan</h3>
            <p>Dedication has no limitation! </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>Email: haranhari350@gmail.com</p>
            <p>Phone: (732) 522-9688</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Me</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/hariee/"
                target="_blank"
                className="flex flex-col items-center hover:text-accent transition-colors cursor-pointer"
              >
                <FaLinkedin size={20} />
                <span className="mt-2 text-sm">LinkedIn</span>
              </a>
              <a
                href="https://github.com/iamharie"
                target="_blank"
                className="flex flex-col items-center hover:text-accent transition-colors cursor-pointer"
              >
                <FaGithub size={20} />
                <span className="mt-2 text-sm">GitHub</span>
              </a>

              <a
                href=""
                target="_blank"
                className="flex flex-col items-center hover:text-accent transition-colors cursor-pointer"
              >
                <FaFacebookSquare size={20} />
                <span className="mt-2 text-sm">Facebook</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-secondary dark:border-secondary-light text-center">
          <p>
            &copy; {new Date().getFullYear()} Hariharan Mohan. All rights
            reserved.
          </p>
          <p>Developed with ❤️ by Hari</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
