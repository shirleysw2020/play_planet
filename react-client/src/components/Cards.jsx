import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card.jsx';
// import ReactCardFlip from "react-card-flip";

const Cards = (props) => {

  const [cards, setCards] = useState(props.cards);
  const [checkers, setCheckers] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [cardflipped, setFlip] = useState(false);

  // const flipCard = (card) => {
  //   console.log(card.type,' card you click');
  //   if (checkers.length < 2) {
  //     setCheckers([...checkers, card.type]);
  //   }
  //   // if checker full and they equal
  //   if (checkers.length == 2 && checkers[0] !== checkers[1]) {
  //     // also empty checker to start over
  //     console.log('should empty checker')
  //     setCheckers([]);
  //   } else if (checkers.length == 2 && checkers[0] === checkers[1]) {
  //     // put in complete
  //     setCompleted(checkers[0]);
  //     // empty checker
  //     setCheckers([]);
  //     // if checker has 2 cards and they are not equal
  //   }
  // }
  //   useEffect(() => {
  //     if (checkers.length == 2 && checkers[0] !== checkers[1]) {
  //       // also empty checker to start over
  //       console.log('should empty checker useeffect')
  //       setCheckers([]);
  //       setCards()
  //     }
  //   }


  const checkFull = (checkers) => {
    return checkers.length == 2;
  }

  const isMatched = (checkers) => {
    // if checkers is full and boh cards type is same return true
    return ( checkers.length == 2 && checkers[0].type == checkers[1].type );
  }

  const flipCard = (card) => {
      if (checkFull(checkers) || (checkers.length == 1 && checkers[0].id == card.id)) {
        return;
      }

      const newCheckers = [...checkers, card];
      // set state asynchronously...
      setCheckers(newCheckers);

      if (isMatched(newCheckers)) {
        setCompleted([...completed, newCheckers[0].type]);
      }

      if (checkFull(newCheckers)) {
        setTimeout(() => {
          setCheckers([]);
        }, 1000)
      }
  }

  useEffect(() => {
    const newCards = cards.map(card => ({
      ...card,
      flipped:
        checkers.find(c => c.id == card.id) ||
        completed.includes(card.type),
    }))
    setCards(newCards);
  }, [checkers, completed])

  return (
    <GameBoard>
      <GridContainer>
        {cards.map((card) => {
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
  height: 630px;
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
  max-width: 700px;
`;


export default Cards;