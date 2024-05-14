import img1 from "../assets/cardimg/img1.jpg";
import img2 from "../assets/cardimg/img2.jpg";
import img3 from "../assets/cardimg/img3.jpg";
import img4 from "../assets/cardimg/img4.jpg";
import img5 from "../assets/cardimg/img5.jpg";
import front from "../assets/cardimg/front.jpg";
import styled from "styled-components";
import { useState, useEffect } from "react";

// 이미지 배열 설정
const imgArray = [img1, img2, img3, img4, img5];

// 카드를 무작위로 섞어주는 함수
const shuffleCards = () => {
  let count = [0, 0, 0, 0, 0];
  let randomidx = [];
  for (let i = 0; i < 10; i++) {
    let random = Math.floor(Math.random() * 5);
    if (count[random] === 2) {
      i -= 1;
      continue;
    }
    count[random] += 1;
    randomidx[i] = random;
  }
  return randomidx;
};

export default function CardGame() {
  let [showFront, setShowFront] = useState(new Array(10).fill(true));
  let [flippedCards, setFlippedCards] = useState([]);
  let [randomidx, setRandomidx] = useState([]);

  // 컴포넌트가 처음 렌더링될 때 카드 배열 초기화
  // gpt를 이용 했습니다..ㅜㅜ
  useEffect(() => {
    setRandomidx(shuffleCards());
  }, []);

  // 카드 클릭 이벤트 처리
  const handleClick = (e) => {
    let idx = parseInt(e.currentTarget.id.replace("div", ""));
    //두장이 뒤집히지 않거나 이미 뒤집었던걸 뒤집는 경우 포함
    if (flippedCards.length < 2 && !flippedCards.includes(idx)) {
      let newFlippedCards = [...flippedCards, idx];
      setFlippedCards(newFlippedCards);
      let newShowFront = [...showFront];
      newShowFront[idx] = !newShowFront[idx];
      setShowFront(newShowFront);
    }
  };

  // 두 장의 카드가 뒤집힌 경우 확인 후 처리
  useEffect(() => {
    //카드가 정상적으로 뒤집힌 경우
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (randomidx[first] === randomidx[second]) {
        //처음 인덱스랑 끝 인덱스가 같으면 같은거 유지
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          //같지 않으면 다시 뒤집음
          const newShowFront = [...showFront];
          newShowFront[first] = true;
          newShowFront[second] = true;
          setShowFront(newShowFront);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, randomidx, showFront]);

  return (
    <Container>
      {showFront.map((isFront, i) => (
        <Card key={i} id={`div${i}`} onClick={handleClick}>
          <CardFace
            src={front}
            style={{
              transform: isFront ? "rotateY(0deg)" : "rotateY(180deg)",
            }}
          />
          <CardFace
            src={imgArray[randomidx[i]]}
            style={{
              transform: isFront ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          />
        </Card>
      ))}
    </Container>
  );
}

// 스타일
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px 5px; /* 상하 여백 20px, 좌우 여백 5px */
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  width: 180px;
  height: 240px;
  perspective: 1000px;
  cursor: pointer;
  position: relative;
`;

const CardFace = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transition: transform 0.6s;
  transform-style: preserve-3d;
`;
