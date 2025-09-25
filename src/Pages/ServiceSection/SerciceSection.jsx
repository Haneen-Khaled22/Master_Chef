import React from "react";
import chefImg from "../../assets/chef.png"; // ضع صورة شيف عندك في الأصول

export default function ServicesSection() {
  const services = [
    {
      title: "Fine Dining",
      desc: "Experience gourmet meals crafted by our expert chefs with the finest ingredients.",
      icon: "🍽️",
    },
    {
      title: "Event Catering",
      desc: "Let us bring the flavors of Master Chef to your events with our custom catering services.",
      icon: "🎉",
    },
    {
      title: "Fast Delivery",
      desc: "Enjoy our delicious dishes at home with quick and reliable delivery.",
      icon: "🚚",
    },
    {
      title: "Cooking Classes",
      desc: "Learn from our chefs and master the art of cooking with fun and interactive sessions.",
      icon: "👨‍🍳",
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Text & Services */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">
              We Are More Than Multiple Services
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm sm:text-base">
              At Master Chef, we don’t just serve food — we create experiences.
              From fine dining to catering and cooking classes, we’re here to
              make every moment unforgettable.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="rounded-xl shadow hover:shadow-lg transition p-6 "
                >
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chef Image */}
          <div className="hidden md:block flex justify-center lg:justify-end">
            <img
  src={chefImg}
  alt="Master Chef"
  className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[350px] ml-8 h-auto rounded-2xl object-cover"
/>

          </div>
        </div>
      </div>
    </section>
  );
}
