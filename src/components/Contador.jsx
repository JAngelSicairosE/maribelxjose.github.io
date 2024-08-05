import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ParentContainer = styled.div`
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center;    /* Centra verticalmente */
`;

const CountdownContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', Courier, monospace;
  color: #333;
  background-color: #fff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 2s ease-in;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #666;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #666;
`;

const TimeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeRow = styled.div`
  display: flex;
  justify-content: center;
  font-size: 3rem;
  letter-spacing: 0.1rem;
`;

const TimeBlock = styled.div`
  margin: 0 8px;
  text-align: center;

  span:first-child {
    display: block;
    font-size: 3.0rem;
    font-weight: bold;
    color: #222;
  }

  span:last-child {
    font-size: 0.9rem;
    color: #999;
  }
`;

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <TimeBlock key={interval}>
        <span>{timeLeft[interval]}</span>
        <span>{interval}</span>
      </TimeBlock>
    );
  });

  return (
    <ParentContainer>
      <CountdownContainer>
      <TimeSection>
        {timerComponents.length ? (
          <>
            <Subtitle>Aun faltan...</Subtitle>
            <TimeRow>{timerComponents}</TimeRow>
          </>
        ) : (
          <span>¡Es el gran día!</span>
        )}
      </TimeSection>
    </CountdownContainer>
    </ParentContainer>
  );
};

export default Countdown;