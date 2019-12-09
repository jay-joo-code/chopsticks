import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import log from 'src/util/log';
import PollsList from './PollsList';

const Container = styled.div `
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  opacity: .8;
`

const Home = () => {
  const [clientPosition, setClientPosition] = useState([]);

  const updateClientPosition = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        setClientPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        if (error.code === 1) {
          // user denied geolocation prompt
          
        }
        else {
          // unknown error 
        }
      }, { enableHighAccuracy: true, maximumAge: 10000 });
  };
  
  useEffect(() => {
    updateClientPosition();
  }, []);

  return (
    <Container>
      <Title>Nearby Polls</Title>
      <PollsList clientPosition={clientPosition}/>
    </Container>
  );
};

export default Home;
