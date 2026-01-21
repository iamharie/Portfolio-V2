import venkat from "../assets/linkedin-recommendation/venkataGanji.webp";
import george from "../assets/linkedin-recommendation/george.webp";
import davidSnook from "../assets/linkedin-recommendation/davidSnook.webp";
import vijayBabu from "../assets/linkedin-recommendation/vijayBabu.webp";
import harshaBelurkar from "../assets/linkedin-recommendation/harshaBelurkar.webp";

export interface Recommendation {
  id: number;
  name: string;
  photo: string;
  role: string;
  company: string;
  relationship: string;
  testimonial: string;
  linkedinUrl?: string;
}

export const recommendations: Recommendation[] = [
  {
    id: 1,
    name: "George Avila",
    photo: george,
    role: "Principal Engineer, Technical Project Management",
    company: "Verizon",
    relationship: "Senior leader to Hariharan; collaborated cross-functionally",
    testimonial:
      "I really enjoyed collaborating with Hari, particularly on UI design patterns and implementation discussions. His attentiveness, strong UI perspective, and hands-on support were instrumental to the development of our features and the overall success of the CO and CXM applications. \n\n Hari consistently elevated the work of the entire team through his collaboration with me, Tabitha, Adam, and Scott, and he brought clarity and thoughtfulness to every discussion.",
    linkedinUrl: "https://www.linkedin.com/in/venkata-ganji-43b3b2b1/",
  },
  {
    id: 2,
    name: "Venkata Ganji",
    photo: venkat,
    role: "Principal Engineer, Software Development",
    company: "Verizon",
    relationship: "Managed Hariharan directly",
    testimonial:
      "I had the pleasure of working alongside Hariharan Mohan, and I was consistently impressed by his strong software engineering fundamentals and disciplined approach to delivery. Hariharan is an engineer who truly takes ownership; he manages features end-to-end, from initial design and requirements gathering to testing and deployment. \n\n Beyond his technical skills, Hariharan writes clean, maintainable code and prioritizes system reliability. He is also a fantastic collaborator who communicates effectively with QA, non-technical stakeholders, and fellow engineers. His ability to balance development speed with high quality makes him an asset to any team. I highly recommend Hariharan for any organization looking for a dedicated and skilled Software Engineer.",
    linkedinUrl: "https://www.linkedin.com/in/venkata-ganji-43b3b2b1/",
  },
  {
    id: 3,
    name: "David Snook",
    photo: davidSnook,
    role: "Manager of Telecommunications",
    company: "Wichita state University",
    relationship: "Managed Hariharan directly",
    testimonial:
      "I am pleased to provide a recommendation for Hariharan Mohan, whose tenure as a Student Assistant transitioning to a Graduate Research Assistant has showcased his potential as a valuable addition to any organization or program. Throughout this period, I have observed firsthand his development and maturation as a Software Engineer. \n\n I was his project manager and together we have completed many telecommunication projects within the given deadlines. Hari stood out to be a highly competent, possessing good analytical, oral, and written communication skills. I particularly appreciate his leadership quality reflected through good coordination with fellow team members. I have observed his improvement in ability of decision making. He also proved to be efficient working independently. \n\n Hari has been an excellent employee and has showcased his abilities to work for any organization with great efficiency. He would be an ideal candidate and a wonderful addition to your firm. Hence, I would recommend him without any hesitation. Please contact me for any further details whichever are necessary. \n\nDavid Snook\nManager of Telecommunications\nWichita State University",
    linkedinUrl: "https://www.linkedin.com/in/davidlsnook/",
  },
  {
    id: 4,
    name: "Vijay Babu",
    photo: vijayBabu,
    role: "Business and Technology Delivery Manager",
    company: "Accenture",
    relationship: "Managed Hariharan directly",
    testimonial:
      "Hari is an exceptional team player who consistently demonstrates a remarkable zeal for learning and upskilling. His unwavering 'can-do' attitude, willingness to take on additional responsibilities or tasks and self-initiative to lead projects to completion are truly impressive. \n\n Hari's performance has earned well-deserved recognition from both teammates and clients. His dedication, expertise, and collaborative spirit make him a good team player. He is an asset to the team and organization.",
    linkedinUrl: "https://www.linkedin.com/in/vijaya-babu-53814b42/",
  },
  {
    id: 5,
    name: "Harsha Belurkar",
    photo: harshaBelurkar,
    role: "Lead Analytics Consultant",
    company: "Wells Fargo",
    relationship: "Peer to Hariharan (same team at Accenture)",
    testimonial:
      "Hariharan and I worked together in Accenture for more than a year and it has been a pleasure to work with him. His work ethic and communication skill were very impressive. Since it was a beginning of this professional career he was always passionate to learn new things, highly adaptable and was willing to grab every single opportunity where he can contribute maximum to the project. He ensured that the work is delivered on time and precise. Looking forward to working with him in future.",
    linkedinUrl: "https://www.linkedin.com/in/harsha-belurkar/",
  },
];
