import React from 'react';
import styled from 'styled-components';

const Apod = ({apod, showApod}) => {
  return showApod ?
  (
    <ApodCard>
      <Title>Astronomy Picture of The Day</Title>
      <ApodImg src={apod.url}></ApodImg>
      <Subheading>{apod.title}</Subheading>
      <Description>{apod.explanation}</Description>
    </ApodCard>)
  : null
}

const Title = styled.div`
  margin-left: 160px;
  margin-top: 50px;
  font-size: 30px;
`;

const Subheading = styled.div`
  margin-left: 160px;
  margin-top: 10px;
  font-size: 23px;
`;

const Description = styled.div`
  margin: 18px 40px;
  font-size: 14px;
`;


const ApodCard = styled.div`
  float: left;
  width: 40%;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  margin-top: 20px;
  height: 800px;
  margin-left: 20px;
  font-family: monospace;
  font-size: 30px;
`;

const ApodImg = styled.img`
  width: 67%;
  display: block;
  border-radius: 15px;
  margin: 35px auto;
`;

export default Apod;