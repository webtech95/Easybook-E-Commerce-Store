import React from "react";
import '../style.css';


const TopBanner = () => {
  return (
    <section className=" fixed top-0 left-0 right-0 z-40 bg-yellow-300 border-b border-black overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 p-2 ">
        
        {/* max-w-7xl mx-auto flex items-center justify-between */}
        {/* Scrolling Text */}
        <div className="overflow-hidden whitespace-nowrap flex-1">
          <p className="animate-marquee text-black font-semibold text-sm md:text-base">
            🔥 Limited-Time Book Sale! Get up to 50% OFF on bestsellers — only this week!
          </p>
        </div>

        {/* Call-to-Action Button */}
        <button className="ml-6 px-2 md:px-6 py-1 border border-black font-semibold rounded-lg hover:bg-black hover:text-white transition text-sm md:text-base">
          Grab the Deal
        </button>
      </div>
    </section>
    
  );
};

export default TopBanner;
