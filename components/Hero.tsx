"use client";
import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";

export function HeroRipple() {
  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-start overflow-hidden bg-background">
      <BackgroundRippleEffect />
      <div className="mt-60 w-full relative z-10">
        {/* <h2 className="relative z-10 text-[#06b6d4] mx-auto max-w-4xl text-center text-2xl font-bold  md:text-4xl lg:text-7xl"> */}
           <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
          <LayoutTextFlip
          text="Welcome to "
          words={["Nakshatra", "Nakshatra Boutique", "Nakshatra Boutique and Collections"]}
        />
      </motion.div>
        {/* </h2> */}
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground px-4">
         Nakshatra Boutique and Collections brings celestial elegance to your wardrobe. Inspired by the ancient constellations, each piece in our collection is carefully curated to make you shine. We blend timeless tradition with contemporary fashion, offering exquisite clothing that celebrates your unique radiance. Discover garments that are as distinctive as the stars themselves.
        </p>
      </div>
    </div>
  );
}
