import { useState, useEffect } from "react";
import img1 from "../assets/images/bg_img1.jpg";
import img2 from "../assets/images/bg_img2.jpg";
import img3 from "../assets/images/bg_img3.jpg";
import img4 from "../assets/images/bg_img4.jpg";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: img1,
      title: "Empowering Farmers with AI Technology",
      subtitle:
        "Transforming agriculture through intelligent insights and data-driven decisions",
      description:
        "Join thousands of farmers who are revolutionizing their farming practices with our AI-powered platform.",
    },
    {
      image: img2,
      title: "Sustainable Farming Solutions",
      subtitle: "Building a greener future with smart agricultural practices",
      description:
        "Discover eco-friendly farming techniques that increase yield while preserving the environment.",
    },
    {
      image: img3,
      title: "Expert Guidance at Your Fingertips",
      subtitle: "Get personalized recommendations from agricultural experts",
      description:
        "Access real-time crop monitoring, weather predictions, and market insights to maximize your harvest.",
    },
    {
      image: img4,
      title: "Community-Driven Innovation",
      subtitle: "Connect with fellow farmers and share knowledge",
      description:
        "Be part of a thriving community where farmers help farmers succeed together.",
    },
  ];

  // slideshow functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-80" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 backdrop-brightness-50"></div>
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in ">
            <span className="drop-shadow-lg md:drop-shadow-2xl">
              {slides[currentSlide].title}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-950 font-semibold mb-6 opacity-90">
            <span className="drop-shadow-md md:drop-shadow-lg">
              {slides[currentSlide].subtitle}
            </span>
          </p>
          <p className="text-xl text-gray-900 font-medium mb-8 max-w-2xl mx-auto">
            <span className="drop-shadow-md md:drop-shadow-lg">
              {slides[currentSlide].description}
            </span>
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-green-600 border-2 border-white"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
