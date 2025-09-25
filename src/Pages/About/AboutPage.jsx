import React from "react";
import about from "../../assets/aboutimg.png";
import about2 from "../../assets/about2.png";

export default function AboutPage() {
  return (
    <div className="min-h-screen text-gray-900">
      {/* HERO */}
      <header className="relative">
        <div className="max-w-8xl sm:px-6 py-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* Text */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
                About Master Chef
              </h1>
              <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-800/90 leading-relaxed">
                Welcome to <span className="font-semibold">Master Chef</span> — a
                place where we celebrate flavors and master the art of cooking.
                Our recipes are crafted with love and a modern touch while
                keeping the authenticity alive.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#history"
                  className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow"
                >
                  Our Story
                </a>
                <a
                  href="/menu"
                  className="inline-block px-4 py-2 rounded-full border border-[rgba(211,159,56,1)] text-sm sm:text-base font-medium"
                >
                  Signature Dishes
                </a>
              </div>

              <div className="mt-8 text-sm sm:text-base text-gray-700/90">
                <p>
                  We believe every dish tells a story — from handpicking fresh
                  ingredients to the way it’s served. Our mission is to bring
                  you a dining experience that feels warm, comforting, and full
                  of flavor.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="overflow-hidden rounded-lg">
              <img
                src={about}
                alt="Master Chef hero"
                className="w-full h-56 sm:h-72 lg:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* History / Story */}
        <section id="history" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold">Our Story</h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-2 items-start">
            {/* Text */}
            <div className="text-gray-700 leading-relaxed text-sm sm:text-base">
              <p className="mb-4">
                The journey of <span className="font-semibold">Master Chef</span>{" "}
                began with a simple passion for great food. We wanted to create
                a place where family and friends could gather around the table
                and enjoy high-quality meals made with care. Over the years,
                we’ve crafted our own recipes, blending local ingredients with
                modern ideas so that every dish carries our unique signature.
              </p>

              <p className="mb-4">
                We carefully select our ingredients: fresh seasonal vegetables,
                trusted quality meats, and spices that add depth to every bite.
                Many of our recipes are inspired by cuisines from around the
                world but adjusted to match our guests’ taste.
              </p>

              <p>
                Our goal is to create an unforgettable dining experience — from
                the first bite to the last sip. That’s why every detail in our
                restaurant is designed with care: lighting, music, presentation,
                and the finishing touch on every plate.
              </p>
            </div>

            {/* Aside */}
            <aside className="space-y-6">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={about2}
                  alt="kitchen"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                />
              </div>

              <div className="bg-white rounded-lg p-6 shadow">
                <h4 className="font-semibold text-lg">Opening Hours</h4>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  Monday — Saturday: 12:00 PM — 11:00 PM <br />
                  Sunday: Closed
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
