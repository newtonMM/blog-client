import React from "react";

const Hero = () => {
  return (
    <div className="hero h-[20vh] md:h-[20vh] lg:h-[40vh] bg-[url('./assets/sunset.jpg')]">
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md my-2">
          <h1 className="mb-5 lg:text-2xl italic md:text-base text-base text-white font-normal font-serif">
            "Its stories that save our progeny from blundering like blind
            beggars into the spikes of a cactus fence. Without them, we are
            blind" by Chinua Achebe
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
