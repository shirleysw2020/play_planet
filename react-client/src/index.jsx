import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Cards from './components/Cards.jsx';
import styled, { keyframes } from 'styled-components';
import Apod from './components/Apod.jsx';

const App = () => {
  const [cards, setCards] = useState(doubleCards());
  const [apod, setApod] = useState([]);
  const [showApod, setshowApod] = useState(true);
  const [showGame, setshowGame] = useState(false);
  const [restart, setRestart] = useState(0);

  const showApodOnClick = () => {
    setshowGame(false);
    setshowApod(!showApod);
  }

  const showGameOnClick = () => {
    setshowApod(false);
    setshowGame(!showGame);
  }

  const updateCards = (gamingCards) => {
    setCards(gamingCards);
  }

  const restatrGame = () => {
    //testting...
    setRestart(restart + 1);
  }

  const shuffleCards = () => {
    var shuffledCards = cards;
    for (let i = 0; i < shuffledCards.length; i++) {
      shuffledCards[i].flipped = false;
    }
    console.log(shuffledCards, 'all flipped false')
    for (let i = shuffledCards.length - 1; i >= 0; i--){
      const j = Math.floor(Math.random() * i);
      const temp = shuffledCards[i];
      shuffledCards[i] = shuffledCards[j];
      shuffledCards[j] = temp;
    }
    setCards(shuffledCards);
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
      return [...deck, makeCard(), makeCard()];
    }, []);

    for (let i = cards.length - 1; i >= 0; i--){
      const j = Math.floor(Math.random() * i);
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
    return cards;
  }

  useEffect (() => {
    setCards(cards);
    axios.get('/apod')
    .then((res) => {
      setApod(res.data);
      // console.log(res.data);
    })
    .catch((err) => console.log('err', err))
  },[]);

  if (apod === null) {return null;} else {
  return (
    <div>
      <Navigator>
        <GameButton onClick={showGameOnClick}>GAME</GameButton>
        <ApodButton onClick={showApodOnClick}>APOD</ApodButton>
      </Navigator>

      <AppWrapper showGame={showGame}>
        <Header>
          {/* when start: shuffle cards */}
          <Button onClick={shuffleCards} onClick={setRestart}>Restart</Button>
          <Title>Solar System</Title>
        </Header>
        <Cards cards={cards} updateCards={updateCards}></Cards>
      </AppWrapper>
      <Apod showApod={showApod} apod={apod}></Apod>
    </div>
  )
  }
}

const slidein = keyframes`
  0% {
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {transform: translateX(calc(50vw + 350px))}
`;

const AppWrapper = styled.div`
  /* margin: 20px 0 0 120px; */
  font-family: monospace;
  float: left;
  overflow: hidden;
  width: 700px;
  animation: ${props => props.showGame ? slidein : 'none'};
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  left: -700px;
  display: inline-block;
  position: absolute;
`;

const Navigator = styled.div`
  display: flex;
  justify-content: center;
`;

const GameButton = styled.button`
  margin: 20px 20px;
  background-color: white;
  border: none;
  background: none;
  font-size: large;
  color: grey;
  border-bottom: 1px solid grey;
  outline: none;
  cursor: pointer;
  &:hover {
      transform: translate(0%, 10%);
      transition: 0.2s ease-out;
    }
`;

const ApodButton = styled.button`
  margin: 20px 20px;
  background-color: white;
  border: none;
  background: none;
  font-size: large;
  color: grey;
  border-bottom: 1px solid grey;
  outline: none;
  cursor: pointer;
  &:hover {
      transform: translate(0%, 10%);
      transition: 0.2s ease-out;
    }
`;

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

const Button = styled.button`
  position: relative;
  top: 60px;
  left: 88%;
  cursor: pointer;
  background-color: #ea5455;
  color: #FFFFFF;
  border: 1px solid lavenderblush;
  letter-spacing: 0.7px;
  font-size: 14px;
  font-weight: 450;
  border-radius: 7px;
  height: 30px;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  outline: none;
  &: hover {
    border: 1px solid #e57b7b;
    background-color: #e5b5b5;
  }
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