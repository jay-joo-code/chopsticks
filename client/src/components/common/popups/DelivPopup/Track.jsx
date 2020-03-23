import React from 'react';
import styled from 'styled-components';
import UnstyledBody from 'src/components/common/fonts/Body';

const Body = styled(UnstyledBody)`
  padding: .2rem 1rem;
`

const Track = ({ track }) => {
  const date = new Date(track.timeString).toLocaleString('ko-KR');
  
  return (
    <tr>
      <td>
        <Body>{date}</Body>
      </td>
      <td>
        <Body>{track.where}</Body>
      </td>
      <td>
        <Body>{track.kind}</Body>
      </td>
    </tr>
  )
};

export default Track;
