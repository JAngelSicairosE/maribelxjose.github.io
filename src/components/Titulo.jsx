import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Define a styled component for the title
const Title = styled(motion.h1)`
  font-family: 'Dancing Script', cursive;
  font-size: 3em;
  color: white;
  text-align: center;
  margin-top: 20vh;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.7));
`;

// Define the animation variants
const variants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

const Titulo = () => {
  return (
    <Title
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      Nuestra Boda
    </Title>
  );
};

export default Titulo;