import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import distance from 'src/util/distance';
import log from 'src/util/log';
import axios from 'axios';
import Poll from './Poll';

const Container = styled.div `
  padding: 2rem 0;
`;

const PollsList = (props) => {
  const [polls, setPolls] = useState([]);
  const { clientPosition } = props;
  const fetchPolls = () => {
    axios.get('/api/poll')
      .then((r) => {
        const allPolls = r.data;

        // FILTER FOR NEARBY POLLS
        const range = 1000;
        let distanceFromSources = [];
        const nearbyPolls = allPolls.filter((poll, i) => {
          const distanceFromSource = Math.floor(distance(poll.sourcePosition, clientPosition));
          if (distanceFromSource <= range) {
            distanceFromSources.push(distanceFromSource)
            return true;
          }
        })
        const formattedNearbyPolls = nearbyPolls.map((poll, i) => {
          return {
            ...poll,
            distanceFromSource: distanceFromSources[i],
          };
        })
        setPolls(formattedNearbyPolls);
      })
      .catch((e) => {
        log('fetch polls error', e);
      });
  };

  useEffect(() => {
    if (clientPosition.length !== 0) {
      fetchPolls();
    }
  }, [clientPosition]);

  return (
    <Container>
      {polls.map((poll) => (
        <Poll key={poll._id} {...poll} />
      ))}
    </Container>
  );
};

export default PollsList;
