import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Title from 'src/components/common/Title';
import { useLocation } from 'react-router-dom';
import log from 'src/util/log';
import axios from 'axios';
import io from 'socket.io-client';

const Container = styled.div `
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
`;

const NumberConnected = styled.p `
  font-size: 7rem;
  margin-top: 8rem;
`;

const Connected = styled.p `
  opacity: .6;
`;

const Stage = () => {
  // DEDUCE POLL ID
  const { pathname } = useLocation();
  const pollId = pathname.split('/')[2];

  // GET POLL DATA
  const [poll, setPoll] = useState();
  useEffect(() => {
    if (pollId) {
      axios.get(`/api/poll/${pollId}`)
        .then(res => {
          setPoll(res.data);
          setClientCount(res.data.clients.length);
        })
        .catch(e => {
          log('error fetching poll data', e);
        })
    }
  }, [pollId])

  // SOCKET CONNECTION
  const socket = io.connect('/');
  const clientId = useSelector((state) => state.client.id);
  useEffect(() => {
    if (poll) {
      const data = {
        clientId,
        pollId: poll._id
      }
      socket.emit('client-connection', data);
      
      return () => {
        log('will unmount');
        socket.emit('client-disconnect', data);
      }
    }
  }, [])

  // DEDUCE CLIENT COUNT
  const [clientCount, setClientCount] = useState(0);
  socket.on('new-client', (data) => {
    console.log('new client', data.clientId);
    setClientCount(clientCount + 1);
  })
  socket.on('lost-client', (data) => {
    console.log('lost client', data.clientId);
    setClientCount(clientCount - 1);
  })

  if (!poll) return <div />;

  return (
    <Container>
      <Title>{poll.name}</Title>
      <NumberConnected>{clientCount}</NumberConnected>
      <Connected>connected</Connected>
    </Container>
  )
};

export default Stage;
