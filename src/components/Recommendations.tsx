import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaLinkedin,
  FaMedal,
} from "react-icons/fa";
import { recommendations } from "../utils/recommendation";

const Recommendations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const CHAR_LIMIT = 400;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      if (newIndex < 0) return recommendations.length - 1;
      if (newIndex >= recommendations.length) return 0;
      return newIndex;
    });
    setExpandedId(null); // Collapse when changing slides
    setImageLoading(true); // Reset loading state
    setImageError(false); // Reset error state
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const currentRec = recommendations[currentIndex];
  const isExpanded = expandedId === currentRec.id;
  const shouldShowSeeMore = currentRec.testimonial.length > CHAR_LIMIT;
  const displayedTestimonial =
    !isExpanded && shouldShowSeeMore
      ? currentRec.testimonial.slice(0, CHAR_LIMIT) + "..."
      : currentRec.testimonial;

  return (
    <section className="py-20 bg-background-light dark:bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4 text-center text-accent flex items-center justify-center gap-3">
            <FaMedal className="text-yellow-500" />
            Recommendations
          </h2>
          <p className="text-center text-text-light dark:text-text-dark mb-12">
            What leaders, peers, and collaborators say about working with me
          </p>

          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 400, damping: 35 },
                    opacity: { duration: 0.1 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="bg-secondary-light dark:bg-secondary rounded-2xl shadow-xl p-8"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Left: Photo and Info */}
                    <div className="flex flex-col items-center md:items-start md:w-1/3">
                      <div className="relative w-32 h-32 mb-4">
                        {imageLoading && !imageError && (
                          <div className="absolute inset-0 rounded-full border-4 border-accent bg-secondary-light dark:bg-secondary flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                          </div>
                        )}

                        {imageError && (
                          <div className="w-32 h-32 rounded-full border-4 border-accent bg-secondary-light dark:bg-secondary flex items-center justify-center shadow-lg">
                            <div className="text-center">
                              <FaLinkedin className="text-4xl text-accent mx-auto mb-1" />
                              <span className="text-xs text-gray-500">
                                Image unavailable
                              </span>
                            </div>
                          </div>
                        )}

                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          src={currentRec.photo}
                          alt={currentRec.name}
                          onLoad={() => setImageLoading(false)}
                          onError={() => {
                            setImageLoading(false);
                            setImageError(true);
                          }}
                          className={`w-32 h-32 rounded-full object-cover border-4 border-accent shadow-lg ${
                            imageLoading || imageError ? "hidden" : "block"
                          }`}
                        />
                      </div>

                      <h3 className="text-2xl font-bold text-accent mb-1 text-center md:text-left">
                        {currentRec.name}
                      </h3>
                      <p className="text-sm font-semibold text-text-light dark:text-text-dark mb-1 text-center md:text-left">
                        {currentRec.role}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center md:text-left">
                        {currentRec.company}
                      </p>
                      <p className="text-xs italic text-gray-600 dark:text-gray-300 mb-4 text-center md:text-left">
                        {currentRec.relationship}
                      </p>
                      {currentRec.linkedinUrl && (
                        <a
                          href={currentRec.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-accent hover:text-blue-600 transition-colors"
                        >
                          <FaLinkedin className="text-xl" />
                          <span className="text-sm font-medium">
                            View Profile
                          </span>
                        </a>
                      )}
                    </div>

                    {/* Right: Testimonial */}
                    <div className="md:w-2/3">
                      <div className="relative">
                        <svg
                          className="absolute -top-4 -left-2 w-10 h-10 text-accent opacity-20"
                          fill="currentColor"
                          viewBox="0 0 32 32"
                        >
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                        <p className="text-text-light dark:text-text-dark leading-relaxed text-lg pl-8 whitespace-pre-line">
                          {displayedTestimonial}
                        </p>
                        {shouldShowSeeMore && (
                          <button
                            onClick={() => toggleExpand(currentRec.id)}
                            className="text-accent hover:text-blue-600 font-semibold mt-2 transition-colors"
                          >
                            {isExpanded ? "See less" : "See more"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-accent hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Previous recommendation"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-accent hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Next recommendation"
            >
              <FaChevronRight className="text-xl" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {recommendations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                    setExpandedId(null);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-accent w-8"
                      : "bg-gray-400 dark:bg-gray-600 hover:bg-accent/50"
                  }`}
                  aria-label={`Go to recommendation ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Recommendations;
