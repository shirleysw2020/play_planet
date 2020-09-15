import React, { useState } from 'react';
import styled from 'styled-components';

const Cart = ({showCart}) => {
  return showCart ?
    (
      <Checkout>
        I am checkout page
        {/* map over to get images of newApod */}
        <Cards></Cards>
      </Checkout>
    ) : null
};

const Checkout = styled.div`
  margin: 0 auto;
  width: 55%;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  margin-top: 20px;
  padding-bottom: 20px;
  font-size: 30px;
  font-family: arial;
`;

const Cards = styled.img`
  border-radius: 10px;
  border: 1px solid #1d2d50;
  height: 100%;
  width: 100%;
`;

export default Cart;