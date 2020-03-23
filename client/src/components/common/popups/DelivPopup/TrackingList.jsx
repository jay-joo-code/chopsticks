import React from 'react';
import styled from 'styled-components';
import Track from './Track';

const Container = styled.div `

`;

const Th = styled.th `
  padding: .5rem 1rem;
`

const Thead = styled.thead `
  border-bottom: 1px solid grey;
`

const TrackingList = ({ data }) => {

  if (!data || !data.trackingDetails) return <div />;

  return (
    <Container>
    <table>
      <Thead>
        <tr>
          <Th>시간</Th>
          <Th>위치</Th>
          <Th>배송상태</Th>
        </tr>
      </Thead>
      <tbody>
        {data.trackingDetails.map((track) => (
          <Track key={track.time} track={track} />
        ))}
      </tbody>
      </table>
    </Container>
  )
};

export default TrackingList;
