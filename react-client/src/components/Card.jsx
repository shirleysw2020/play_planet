import React from 'react';
import styled from 'styled-components';
// import ReactCardFlip from "react-card-flip";

const Card = ({cards, start}) => {

  const flipPic = (id) => {
    // console.log(event.target.id, 'id?')
    console.log(id, 'able to get clicked pic id:)')
  }

  return(
  <GameBoard>
    <GridContainer>
      {cards.map((card) => {
        return (
          start == 0
          ? <Picture onClick={() => {flipPic(card.id)}} src={"https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/bckgrd.jpg"}>
          </Picture>
          : <Picture src={card.picture}>
          </Picture>
        );
      })}
    </GridContainer>
  </GameBoard>
  )
};

const GridContainer = styled.div`
  justify-content: center;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 175px);
  grid-template-rows: repeat(4, 150px);
`;

const Picture = styled.img`
  border-radius: 10px;
  border: 1px solid #eff48e;
  height: 100%;
  width: 100%;
`;

const GameBoard = styled.div`
  background-color: #eff48e;
  padding: 40px 0 40px 0;
  border-radius: 7px;
`;
// const Card = ({ id, isFlipped, handleClick, cardNumber }) => (
//   <ReactCardFlip isFlipped={isFlipped} flipSpeedBackToFront={1} flipSpeedFrontToBack={1} >
//     <button id={id} className={`card card-front ${cardNumber !== -1 ? "" : "hide-card"}`} onClick={handleClick} key="front">

//     </button>

//     <button id={id} className={`card card-back ${cardNumber !== -1 ? "" : "hide-card"}`} onClick={handleClick} key="back">
//       { cardNumber }
//     </button>
//   </ReactCardFlip>
// );

export default Card;