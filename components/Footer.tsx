import { FaLocationArrow } from "react-icons/fa6";
import { HiMail, HiPhone } from "react-icons/hi";
import Image from "next/image";
import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="relative">
        <Image
          src="/footer-grid.svg"
          alt="footer"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Let&apos;s <span className="text-purple">Connect</span>
        </h1>
        
        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-semibold">Koustubh Kulkarni</h2>
          </div>

          <div className="flex flex-col items-center gap-4 mt-4">
            <a href="mailto:kulkarni.k2004@gmail.com" 
               className="flex items-center gap-2 text-white-200 hover:text-purple transition-colors">
              <HiMail className="w-6 h-6" />
              <span>kulkarni.k2004@gmail.com</span>
            </a>
            <a href="tel:+918660708395" 
               className="flex items-center gap-2 text-white-200 hover:text-purple transition-colors">
              <HiPhone className="w-6 h-6" />
              <span>+91-8660708395</span>
            </a>
          </div>

          <a href="mailto:kulkarni.k2004@gmail.com">
            <MagicButton
              title="Send me a message"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          © 2024 Koustubh Kulkarni. All rights reserved.
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <Image src={info.img} alt="social media icon" width={20} height={20} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
