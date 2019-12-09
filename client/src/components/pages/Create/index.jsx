import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from 'src/components/common/Input';
import Button from 'src/components/common/Button';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import log from 'src/util/log';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NameInput = styled(Input)`
  font-size: 2rem;
  margin-bottom: 8rem;
`;

const DataWrapper = styled.div`
  
`;

const DataContainer = styled.div`
  display: flex;
  margin-bottom: 8rem;
`;

const Type = styled.div`
  opacity: .8;
  margin-right: 2rem;
`;

const Coords = styled.div`
  
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  padding: 0 .5rem;
`;

const RefreshButton = styled.div`
  text-decoration: underline;
  opacity: .6;
  padding: .5rem 0;
  cursor: pointer;
`;

const Create = () => {
  const dispatch = useDispatch();
  const [coords, setCoords] = useState([]);
  const updateLocation = () => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      setCoords([position.coords.latitude, position.coords.longitude]);
    });
  };

  useEffect(() => {
    updateLocation();
  }, []);

  const client = useSelector((state) => state.client);
  useEffect(() => {
    dispatch({
      type: 'SET_SOURCEPOSITION',
      payload: coords,
    });
    dispatch({
      type: 'SET_SOURCEID',
      payload: client.id,
    });
  }, [coords, dispatch]);

  const poll = useSelector((state) => state.poll);
  const handleChange = (e) => {
    dispatch({
      type: 'SET_NAME',
      payload: e.target.value,
    });
  };

  const history = useHistory();
  const handleCreatePoll = () => {
    // TODO: validate poll name


    // TODO: validate location


    // request
    axios.post('/api/poll/create', poll)
      .then((r) => {
        // reset create form
        dispatch({
          type: 'RESET_CREATE',
        });

        // redirect to poll stage route
        history.push(`/poll/${r.data._id}/stage`);
      })
      .catch((e) => {
        log(e);
      });
  };

  return (
    <Container>
      <NameInput placeholder="Poll Name" value={poll.name} onChange={handleChange} />
      <DataWrapper>
        <RefreshButton onClick={updateLocation}>refresh</RefreshButton>
        <DataContainer>
          <Type>
            <div>Latitude</div>
            <div>Longitude</div>
          </Type>
          <Coords>
            <div>{(coords && coords[0]) || 'Access Denied'}</div>
            <div>{(coords && coords[1]) || 'Access Denied'}</div>
          </Coords>
        </DataContainer>
      </DataWrapper>
      <ButtonsWrapper>
        <ButtonContainer>
          <Link to="/create/questions">
            <Button>Edit Questions</Button>
          </Link>
        </ButtonContainer>
        <ButtonContainer>
          <Button onClick={handleCreatePoll} inverted>Create Poll</Button>
        </ButtonContainer>
      </ButtonsWrapper>
    </Container>
  );
};

export default Create;
