import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card.jsx';

const Cards = (props) => {
  const [checkers, setCheckers] = useState([]);
  const [completed, setCompleted] = useState([]);

  const checkFull = (checkers) => {
    return checkers.length == 2;
  }

  const isMatched = (checkers) => {
    return ( checkers.length == 2 && checkers[0].type == checkers[1].type );
  }

  const flipCard = (card) => {
    // // if usr click on same card twice, exit immediately.
    if (checkers.length == 1 && checkers[0].id == card.id) {
      return;
    }
    // add user clicked card to checkers
    const newCheckers = [...checkers, card];
    // set state happens asynchronously...
    setCheckers(newCheckers);

    // only execuete the following if 2 cards was clicked!
    if (isMatched(newCheckers)) {
      setCompleted([...completed, newCheckers[0].type]);
    }
    if (checkFull(newCheckers)) {
      setTimeout(() => {setCheckers([])}, 900);
    }
  }

  useEffect(() => {
    const newCards = props.cards.map(card => ({
      ...card,
      flipped:
        // if 2 reach 2 cards then setCheckers becomes empty, 45line will be false
        checkers.find(c => c.id == card.id) ||
        completed.includes(card.type),
    }))
    props.updateCards(newCards);
  }, [checkers, completed]);

  useEffect(() => {
    completed.slice(0,completed.length);
    checkers.slice(0,checkers.length);
  }, [props.restart])

  return (
    <GameBoard>
      <GridContainer>
        {props.cards.map((card) => {
          return (
            <Card onClick={() => flipCard(card)} {...card}></Card>
          )
        })}
      </GridContainer>
    </GameBoard>
  )
};

const GridContainer = styled.div`
  justify-content: center;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  height: 600px;
`;

const Picture = styled.img`
  border-radius: 10px;
  border: 1px solid #1d2d50;
  height: 100%;
  width: 100%;
`;

const GameBoard = styled.div`
  background-color: #1d2d50;
  padding: 40px 0 40px 0;
  border-radius: 15px;
  padding-left: 20px;
  padding-right: 20px;
`;


export default Cards;