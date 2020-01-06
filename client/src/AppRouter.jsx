import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from 'src/components/pages/Home';
import Login from 'src/components/pages/Login';
import Register from 'src/components/pages/Register';
import Profile from 'src/components/pages/profile/Profile';
import Items from 'src/components/pages/profile/Items';
import Transactions from 'src/components/pages/profile/Transactions';
import Orders from 'src/components/pages/profile/Orders';
import PrivacyTerms from 'src/components/pages/terms/PrivacyTerms';
import TermsOfUse from 'src/components/pages/terms/TermsOfUse';
import ItemDetails from 'src/components/pages/item/ItemDetails';
import ItemPolicies from 'src/components/pages/item/ItemPolicies';
import ItemReviews from 'src/components/pages/item/ItemReviews';
import ItemAdmin from 'src/components/pages/item/ItemAdmin';
import AdminShops from 'src/components/pages/admin/AdminShops';
import Saaji from 'src/components/pages/Saaji';
import Header from 'src/components/layout/Header';
import DynamicContainer from 'src/components/layout/DynamicContainer';

import Shop from 'src/components/pages/Shop';
import ShopIntro from 'src/components/pages/Shop/Intro';
import ShopApply from 'src/components/pages/Shop/Apply';
import ShopApplyComplete from 'src/components/pages/Shop/Apply/Complete';
import ShopApplyPending from 'src/components/pages/Shop/Apply/Pending';

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
          
          <Route path="/profile/orders" component={Orders} />
          <Route path="/profile/items" component={Items} />
          <Route path="/profile/transactions" component={Transactions} />
          <Route path="/profile" component={Profile} />
          
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          
          <Route path="/terms/use" component={TermsOfUse} />
          <Route path="/terms/privacy" component={PrivacyTerms} />
          
          <Route path="/cart" component={Home} />
          
          <Route path="/item/:id/admin" component={ItemAdmin} />
          <Route path="/item/:id/policies" component={ItemPolicies} />
          <Route path="/item/:id/reviews" component={ItemReviews} />
          <Route path="/item/:id/details" component={ItemDetails} />
          <Route path="/items/:category" component={Home} />
          
          <Route path="/shop/apply/pending" component={ShopApplyPending} />
          <Route path="/shop/apply/complete" component={ShopApplyComplete} />
          <Route path="/shop/apply" component={ShopApply} />
          <Route path="/shop/intro" component={ShopIntro} />
          <Route path="/shop" component={Shop} />
          
          <Route path="/admin/shops" component={AdminShops} />
          
          <Route path="/items" component={Home} />
          <Route path="/saaji" component={Saaji} />
          <Route exact path="/" component={Home} />
        </Switch>
      </DynamicContainer>
    </Container>
  </BrowserRouter>
);

export default AppRouter;
