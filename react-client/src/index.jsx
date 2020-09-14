import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Cards from './components/Cards.jsx';
import styled, { keyframes } from 'styled-components';

const App = () => {
  const [cards, setCards] = useState(doubleCards());
  const [start, setStart] = useState(shuffleCards(cards));

  const flipCards = () => {
    setStart(start === 0 ? 1 : 0);
  }

  function doubleCards(){
    let cardId = 0;

    const cards = Object.keys(photos).reduce((deck,keyName) => {
      const makeCard = () => ({
        id: cardId++,
        type: keyName,
        backImg: 'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/planets/cover.jpg',
        frontImg: photos[keyName],
        flipped: false
      });
      deck.push(makeCard());
      deck.push(makeCard());
      return deck;
    }, []);

    // set state to be double deck of cards
    const shuffled = shuffleCards(cards);
    return shuffled;
  }

  function shuffleCards(cards){
    for (let i = cards.length - 1; i >= 0; i--){
      const j = Math.floor(Math.random() * i);
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
    return cards;
  }

  // useEffect (() => {
  //   axios.get('/mvp')
  //   .then((res) => {
  //     // setCards(res.data);
  //   })
  //   .catch((err) => console.log('err', err))
  // },[]);

  return (
    <AppWrapper>
    <Header>
      {/* when start: shuffle cards */}
      <Button onClick={() => shuffleCards(cards)} start={start}>Restart</Button>
      <Title>Solar System</Title>
    </Header>
    <Cards cards={cards}></Cards>
    </AppWrapper>
  )
}

const Title = styled.div`
  margin-left: 230px;
  margin-top: 20px;
  font-size: 30px;
  color: lavenderblush;
`;
const Header = styled.div`
  background-color: #ea5455;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 15px;
  justify-content: center;
`;

const AppWrapper = styled.div`
  font-family: Arial;
  /* margin: 0 auto; */
  margin: 20px 0 0 120px;
  width: 45%;
  font-family: monospace;
  max-width: 700px;
`;

const Button = styled.button`
  position: relative;
  top: 60px;
  left: 88%;
  cursor: pointer;
  letter-spacing: 0.7px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 450;
  border-radius: 7px;
  color: #000;
  height: 30px;
  background-color: #decdc3;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  border-width: 1px;
  outline: none;
`;

const photos = {
  asteroid: 'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/planets/asteroid.png',
  blackhole: 'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/planets/blackhole.png',
  comets: 'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/planets/comets.png',
  earth: 'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/planets/earth.png',
  galaxy: 'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/planets/galaxy.png',
  haumea: 'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/planets/haumea.png',
  jupiter: 'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/planets/jupiter.png',
  mars: 'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/planets/mars.png'
};


ReactDOM.render(<App />, document.getElementById('app'));