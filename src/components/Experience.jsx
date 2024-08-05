import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import traje from "../assets/traje.webp"
import vestido from "../assets/vestido.webp"


const Divider = () => (
  <div className="border-t border-gray-300 w-[50px]" style={{ borderWidth: "2px", borderColor: "#fff" }}></div>
);

const ExperienceCard = ({ experience }) => {
  
  const redirectToExternalUrl = (url) => {
    window.location.href = url;
  };

  

  return (
    <VerticalTimelineElement className=""
      contentStyle={{
        background: "rgba(0, 0, 0, 0.7)", // Fondo negro semi-transparente
        color: "#fff",
        backdropFilter: "blur(10px)", // Efecto de desenfoque
        borderRadius: "8px"
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[80%] h-[80%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold pb-2'>{experience.title}</h3>
        <Divider></Divider>
        <h3 className='text-white text-[20px] font-semibold pt-2'>{experience.company_name}</h3>
      </div>

      <div className="pt-3"><span>{experience.date}</span></div>
      <div className="pt-3 pb-5"><span>{experience.direccion}</span></div>

      <button
        type='btn'
        className='bg-[#7d7d7d] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
        onClick={() => redirectToExternalUrl(experience.url)}>
        Como llegar
      </button>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <section className="relative p-[50px] ring-1 ring-black/5 inset-0 bg-white bg-opacity-30 backdrop-blur-md">

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="relative "
      >
        <h2 className="font-save text-[60px] text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] pt-10 pb-5">
          Codigo de vestimenta
        </h2>
        <div className="flex justify-center gap-8 pt-10">
          <div className="flex flex-col items-center">
            <img className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] object-scale-down h-40 w-80" src={traje} alt="traje" />
            <div className="text-center text-[32px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] pt-5">Hombres</div>
          </div>
          <div className="flex flex-col items-center">
            <img className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] object-scale-down h-40 w-80" src={vestido} alt="vestido" />
            <div className="text-center text-[32px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] pt-5">Mujeres</div>
          </div>
        </div>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>

    </section>
  );
};

export default SectionWrapper(Experience, "work");
