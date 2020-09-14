import React, { useState } from 'react';
import styled from 'styled-components';

const Card = ({frontImg, backImg, flipped, onClick}) => {

   return (
      <Picture src={flipped ? frontImg : backImg} onClick={onClick}></Picture>
   )
};

const Picture = styled.img`
  border-radius: 10px;
  border: 1px solid #1d2d50;
  height: 100%;
  width: 100%;
`;

export default Card;