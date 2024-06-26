import React, { useState, useEffect } from "react";
import Card from "./card";
import styled from "styled-components";

export default function Deck() {
  const [cards, setCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [matched, setMatched] = useState([]);

  // 카드를 초기화하고 섞는 함수
  const shuffleCards = () => {
    const initialCards = [];
    for (let i = 0; i < 5; i++) {
      initialCards.push(i);
      initialCards.push(i);
    }
    initialCards.sort(() => Math.random() - 0.5);
    setCards(initialCards);
  };

  const handleCardClick = (index) => {
    // 이미 매칭된 카드이거나 이미 열려 있는 카드를 클릭한 경우 아무 동작도 하지 않음
    if (matched.includes(cards[index]) || openCards.includes(index)) {
      return;
    }

    if (openCards.length === 1) {
      setOpenCards([...openCards, index]);
      setTimeout(() => {
        setOpenCards((prevCards) => {
          // 현재 두 카드가 매칭되지 않으면 빈 배열로 리셋
          if (cards[prevCards[0]] === cards[index]) {
            setMatched([...matched, cards[index]]);
          }
          // 매칭되면 현재 오픈된 카드 상태 유지 (이 부분은 게임 로직에 따라 다름)
          return [];
        });
      }, 1000);
    } else if (openCards.length === 0) {
      setOpenCards([index]);
    } else {
      setOpenCards([]);
    }
  };

  return (
    <Board>
      <Count>
        {`맞힌 개수: ${matched.length}/5`}
        <br />
        {matched.length == 5 ? "축하합니다, 성공입니다!!" : null}
      </Count>
      <Container>
        {cards.map((cardIndex, idx) => (
          <Card
            key={idx}
            index={cardIndex}
            onClick={() => handleCardClick(idx)}
            flipped={openCards.includes(idx) || matched.includes(cards[idx])}
          />
        ))}
      </Container>
      <ResetButton onClick={shuffleCards}>Start/Reset Cards</ResetButton>
    </Board>
  );
}

// styled component 생략
const Count = styled.div`
  text-align: center;
  font-size: 24px;
  margin: 20px;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  width: 1300px;
`;

const ResetButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;
