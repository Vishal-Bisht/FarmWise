const WhoWeAre = () => {
  return (
    <section id="who-we-are" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Who We Are
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated to empowering farmers with cutting-edge technology and
            data-driven insights to transform agriculture for a sustainable
            future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Revolutionizing Agriculture with AI
            </h3>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                NilMitra is a pioneering agricultural technology platform that
                bridges the gap between traditional farming wisdom and modern
                AI-powered solutions. We believe that every farmer deserves
                access to the tools and knowledge needed to maximize their
                harvest while protecting our planet.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Founded by a team of agricultural scientists, data engineers,
                and passionate farmers, we understand the unique challenges
                faced by today's agricultural community. Our mission is to
                democratize access to agricultural intelligence, making advanced
                farming techniques accessible to farmers of all sizes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-green-600 mb-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Innovation</h4>
                <p className="text-sm text-gray-600">
                  Cutting-edge AI solutions tailored for modern farming
                  challenges
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-blue-600 mb-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Community</h4>
                <p className="text-sm text-gray-600">
                  Building a supportive network of farmers sharing knowledge and
                  success
                </p>
              </div>
            </div>
          </div>

          <div className="lg:order-last">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
                alt="Weather analytics dashboard"
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600 to-transparent opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowWeWork = () => {
  const steps = [
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      ),
      title: "Sign Up & Profile Setup",
      description:
        "Create your farmer profile with details about your farm, crops, and location for personalized recommendations.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "AI Analysis & Insights",
      description:
        "Our AI analyzes weather patterns, soil conditions, market trends, and crop health to provide actionable insights.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      title: "Expert Recommendations",
      description:
        "Receive personalized farming recommendations, including optimal planting times, irrigation schedules, and pest management.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      title: "Track & Optimize",
      description:
        "Monitor your farm's performance, track yields, and continuously optimize your farming practices based on results.",
    },
  ];

  return (
    <section id="how-we-work" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How We Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process transforms complex agricultural data into
            simple, actionable insights that help you make better farming
            decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-green-600 mb-4">{step.icon}</div>
                <div className="absolute -top-3 -left-3 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <svg
                    className="w-8 h-8 text-green-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

const Impact = () => {
  const stats = [
    {
      number: "10,000+",
      label: "Farmers Empowered",
      description: "Active farmers using our platform",
    },
    {
      number: "25%",
      label: "Average Yield Increase",
      description: "Improvement in crop yields",
    },
    {
      number: "30%",
      label: "Water Conservation",
      description: "Reduction in water usage",
    },
    {
      number: "50+",
      label: "Crop Types Supported",
      description: "Different crops in our database",
    },
  ];

  return (
    <section id="impact" className="py-16 bg-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Impact
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Making a real difference in farmers' lives and contributing to
            sustainable agriculture worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl md:text-5xl font-bold text-green-700 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Transforming Lives, One Farm at a Time
            </h3>
            <div className="space-y-4 text-green-100">
              <p>
                Our platform has helped thousands of farmers increase their
                productivity while reducing environmental impact. By leveraging
                AI and data analytics, we've enabled farmers to make informed
                decisions that benefit both their livelihood and the planet.
              </p>
              <p>
                From small-scale family farms to large agricultural operations,
                our solutions scale to meet diverse needs. We're proud to
                contribute to food security and sustainable farming practices
                globally.
              </p>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg">
            <blockquote className="text-gray-700 text-lg italic mb-4">
              "NilMitra has revolutionized how I manage my crops. The AI
              recommendations helped me increase my yield by 40% while using 25%
              less water. It's like having an agricultural expert available
              24/7."
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                RS
              </div>
              <div>
                <div className="font-semibold text-gray-700">Rajesh Sharma</div>
                <div className="text-green-500 text-sm">
                  Wheat & Rice Farmer, Punjab
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Insights = () => {
  const insights = [
    {
      category: "Weather Analytics",
      title: "Predicting Seasonal Patterns for Better Crop Planning",
      description:
        "Learn how our advanced weather modeling helps farmers prepare for seasonal changes and optimize planting schedules.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read",
    },
    {
      category: "Soil Health",
      title: "Maintaining Soil Fertility Through Smart Agriculture",
      description:
        "Discover innovative techniques for soil conservation and nutrient management that increase long-term productivity.",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      readTime: "7 min read",
    },
    {
      category: "Market Trends",
      title: "Understanding Crop Prices and Market Dynamics",
      description:
        "Get insights into market trends and pricing strategies to maximize your profit margins.",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      readTime: "4 min read",
    },
  ];

  return (
    <section id="insights" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest agricultural trends, research
            findings, and expert insights to keep your farming practices ahead
            of the curve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {insight.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-tight">
                  {insight.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {insight.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {insight.readTime}
                  </span>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                    Read More
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
            View All Insights
          </button>
        </div>
      </div>
    </section>
  );
};

export { WhoWeAre, HowWeWork, Impact, Insights };
