import { FaLocationArrow } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineDocumentDownload, HiMail, HiPhone } from "react-icons/hi";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  return (
    <div className="pb-12 md:pb-20 pt-24 md:pt-36">
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      <div>
        <Spotlight
          className="-top-20 -left-4 sm:-left-10 md:-left-32 md:-top-20 h-[80vh] md:h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[60vh] md:h-[80vh] w-[70vw] md:w-[50vw] top-10 left-[80%] md:left-full"
          fill="purple"
        />
        <Spotlight
          className="left-1/2 md:left-80 top-28 h-[60vh] md:h-[80vh] w-[70vw] md:w-[50vw]"
          fill="blue"
        />
      </div>

      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          // chnage the bg to bg-black-100, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center px-4 md:px-0">
        <div className="w-full max-w-[95vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-[10px] md:text-xs text-center text-blue-100 max-w-80">
            Full Stack Developer | AI Enthusiast
          </p>

          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}
          <TextGenerateEffect
            words="Koustubh Kulkarni"
            className="text-center text-3xl sm:text-[40px] md:text-5xl lg:text-6xl mt-3 md:mt-4"
          />

          <p className="text-center md:tracking-wider mb-6 md:mb-8 text-xs sm:text-sm md:text-lg lg:text-xl mt-3 md:mt-4 px-2 md:px-0">
            Crafting scalable, intelligent and interactive solutions with
            cutting-edge tech.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-3 md:mt-4 w-full max-w-md">
            <div className="w-[calc(33%-0.5rem)]">
              <a href="/resume1.pdf" target="_blank" rel="noopener noreferrer">
                <MagicButton
                  title="Resume"
                  icon={<HiOutlineDocumentDownload />}
                  position="left"
                  otherClasses="!mt-0 !w-full text-xs sm:text-sm"
                />
              </a>
            </div>
            <div className="w-[calc(33%-0.5rem)]">
              <a
                href="https://github.com/koustubh-k/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagicButton
                  title="GitHub"
                  icon={<FaGithub />}
                  position="left"
                  otherClasses="!mt-0 !w-full text-xs sm:text-sm"
                />
              </a>
            </div>
            <div className="w-[calc(33%-0.5rem)]">
              <a
                href="https://www.linkedin.com/in/koustubh-kulkarni-35625a1aa/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagicButton
                  title="LinkedIn"
                  icon={<FaLinkedin />}
                  position="left"
                  otherClasses="!mt-0 !w-full text-xs sm:text-sm"
                />
              </a>
            </div>
          </div>

          <div className="mt-6 md:mt-8 w-full max-w-[200px]">
            <a href="#about">
              <MagicButton
                title="Learn More"
                icon={<FaLocationArrow />}
                position="right"
                otherClasses="!mt-0"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
