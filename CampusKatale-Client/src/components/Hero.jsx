import { Carousel } from "@mantine/carousel";
import { Button } from "@mantine/core";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import "@fontsource-variable/lexend";

function Hero() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1613145993483-8f26c911d9b2?auto=format&fit=crop&w=1600&q=80",
      title: "Best Deal of Ssalongo’s Lusaniya",
      subtitle: "Up to 15% OFF when you buy 2 Lusaniyas",
      description: "More Chicken. Less Cabbages.",
      buttonText: "Shop Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1615719076764-1b6c68d8d7c7?auto=format&fit=crop&w=1600&q=80",
      title: "Campus Essentials Delivered Fast",
      subtitle: "Order from trusted campus sellers near you",
      description: "From meals to electronics — we’ve got you covered.",
      buttonText: "Browse Categories",
    },
    {
      image:
        "https://images.unsplash.com/photo-1617196036079-6d0cbd65f2e3?auto=format&fit=crop&w=1600&q=80",
      title: "Flash Sales on Campus Electronics",
      subtitle: "Save up to 20% this week only",
      description: "Get premium gadgets at the best student-friendly prices.",
      buttonText: "View Deals",
    },
  ];

  return (
    <section className="font-[Lexend] bg-white">
      <Carousel
        withIndicators
        loop
        slideGap="md"
        align="center"
        height="auto"
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        classNames={{
          indicator:
            "w-2.5 h-2.5 transition-all duration-300 bg-[#E5E7EB] data-[active]:bg-[#177529] rounded-full mx-1",
          control:
            "bg-white/80 text-[#177529] hover:bg-[#177529] hover:text-white transition",
        }}
      >
        {slides.map((slide, index) => (
          <Carousel.Slide key={index}>
            <div
              className="relative flex items-center justify-center text-center h-[320px] sm:h-[400px] md:h-[480px]"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0C0D19]/40"></div>

              {/* Text Content */}
              <div className="relative z-10 text-white px-4 sm:px-8 md:px-12 max-w-2xl">
                <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold mb-2">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-xl text-[#F8C810] font-medium mb-2">
                  {slide.subtitle}
                </p>
                <p className="text-xs sm:text-sm md:text-base mb-5 sm:mb-6 opacity-90">
                  {slide.description}
                </p>
                <Button
                  size="md"
                  radius="xl"
                  className="bg-[#177529] hover:bg-[#97C040] text-white font-medium px-5 py-2 sm:px-6 sm:py-3 transition-all shadow-sm"
                >
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </section>
  );
}

export default Hero;
