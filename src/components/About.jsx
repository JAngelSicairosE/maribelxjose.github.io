import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import Contador from "./Contador";
import mj from "../assets/mj.svg"
import styled, { keyframes } from 'styled-components';

const ParentContainer = styled.div`
  display: grid;
  place-items: center; /* Centra tanto horizontal como verticalmente */
  padding: 20px;
`;

const Divider = () => (
  <div className="border-t border-gray-300 w-[300px]" style={{ borderWidth: "2px", borderColor: "#fff" }}></div>
);


const About = () => {
  const weddingDate = '2024-11-23T00:00:00';

  return (
    <section className="relative items-center bg-cover bg-no-repeat bg-center p-[50px] ring-1 ring-black/5 pt-[50px] pb-[50px]">

      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-[5px]"></div>

      <motion.div className="relative pb-10" variants={textVariant()}>
        <h2 className="font-save text-[100px] text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] pt-5 pb-10">SAVE THE DATE</h2>
        <Contador targetDate={weddingDate} />
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="relative"
      >
        <h2 className="font-save text-[60px] text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] pt-10 pb-10">Padrinos de Velacion</h2>
        <div className="text-center">
          <div className="text-center text-[32px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Lourdes Yadira Elizalde Avendaño</div>
          <div className="text-center text-[32px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] pt-5">Alex Gabriel Encines Ruelas</div>
          <ParentContainer>
            <Divider></Divider>
          </ParentContainer>
          <div className="text-center text-[32px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">Esmeralda Jacobo Aispuro</div>
          <div className="text-center text-[32px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] pt-5">Guillermo Ernesto Palazuelos Jacobo</div>
        </div>
      </motion.div>
    </section>
  );
};

export default SectionWrapper(About, "about");
