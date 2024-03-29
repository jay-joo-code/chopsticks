import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from 'src/components/pages/Home';
import Login from 'src/components/pages/Login';
import Register from 'src/components/pages/Register';
import Profile from 'src/components/pages/profile/Profile';
import Items from 'src/components/pages/Shop/Items';
import Orders from 'src/components/pages/profile/Orders';
import PrivacyTerms from 'src/components/pages/terms/PrivacyTerms';
import TermsOfUse from 'src/components/pages/terms/TermsOfUse';

import Browse from 'src/components/pages/Browse';
import About from 'src/components/pages/About';

import ItemPub from 'src/components/pages/item/ItemPub';
import ItemEdit from 'src/components/pages/item/ItemEdit';

import Admin from 'src/components/pages/Admin';

import Header from 'src/components/layout/Header';
import Footer from 'src/components/layout/Footer';
import DynamicContainer from 'src/components/layout/DynamicContainer';

import Cart from 'src/components/pages/Cart';

import Shop from 'src/components/pages/Shop';
import ShopIntro from 'src/components/pages/Shop/Intro';
import ShopApply from 'src/components/pages/Shop/Apply';
import ShopApplyComplete from 'src/components/pages/Shop/Apply/Complete';
import ShopApplyPending from 'src/components/pages/Shop/Apply/Pending';
import ShopTransactions from 'src/components/pages/Shop/Transactions';
import ShopSettings from 'src/components/pages/Shop/Settings';
import ShopOrders from 'src/components/pages/Shop/Orders';

import ReduxAlert from 'src/components/common/displays/ReduxAlert';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 101vh;
`;

const AppRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('window.location :>> ', window.location);
  }, [window.location])
  
  return (
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
            <Route path="/profile/details" component={Profile} />

            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />

            <Route path="/terms/use" component={TermsOfUse} />
            <Route path="/terms/privacy" component={PrivacyTerms} />

            <Route path="/cart" component={Cart} />

            <Route path="/item/:id/edit" component={ItemEdit} />
            <Route path="/item/:id" component={ItemPub} />

            <Route path="/browse" component={Browse} />

            <Route path="/shop/apply/pending" component={ShopApplyPending} />
            <Route path="/shop/apply/complete" component={ShopApplyComplete} />
            <Route path="/shop/apply" component={ShopApply} />
            <Route path="/shop/intro" component={ShopIntro} />
            <Route path="/shop/admin/items" component={Items} />
            <Route path="/shop/admin/orders" component={ShopOrders} />
            <Route path="/shop/admin/transactions" component={ShopTransactions} />
            <Route path="/shop/admin/messages" component={ShopSettings} />
            <Route path="/shop/admin/settings" component={ShopSettings} />
            <Route path="/shop" component={Shop} />

            <Route path="/admin/chopsticks511!" component={Admin} />
            
            <Route exact path="/about" component={About} />
            <Route exact path="/" component={Home} />
          </Switch>
        </DynamicContainer>
        <ReduxAlert />
        <Footer />
      </Container>
    </BrowserRouter>
  )
};

export default AppRouter;
