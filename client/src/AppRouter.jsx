import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from 'src/components/pages/Home';
import Header from 'src/components/layout/Header';
import DynamicContainer from 'src/components/layout/DynamicContainer';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, .05);
`;

const AppRouter = () => (
  <BrowserRouter>
    <Container>
      <Header />
      <DynamicContainer>
        <Switch>
          <Route path="/purchase/complete" component={Home} />
          <Route path="/purchase/finalise" component={Home} />
          <Route path="/purchase/details" component={Home} />
          <Route path="/purchase/item" component={Home} />
          <Route path="/purchase/method" component={Home} />
          <Route path="/profile/orders" component={Home} />
          <Route path="/profile/shop" component={Home} />
          <Route path="/profile/transactions" component={Home} />
          <Route path="/profile" component={Home} />
          <Route path="/signup" component={Home} />
          <Route path="/login" component={Home} />
          <Route path="/cart" component={Home} />
          <Route path="/item/:id/delivery" component={Home} />
          <Route path="/item/:id/reviews" component={Home} />
          <Route path="/item/:id" component={Home} />
          <Route path="/items/:category" component={Home} />
          <Route path="/items" component={Home} />
          <Route exact path="/" component={Home} />
        </Switch>
      </DynamicContainer>
    </Container>
  </BrowserRouter>
);

export default AppRouter;
