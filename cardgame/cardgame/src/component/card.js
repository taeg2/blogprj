import React, { useState } from "react";
import styled from "styled-components";
import backImage from "../assets/backImage.png";
import somzzi1 from "../assets/somzzi1.png";
import somzzi2 from "../assets/somzzi2.png";
import somzzi3 from "../assets/somzzi3.png";
import somzzi4 from "../assets/somzzi4.png";
import somzzi5 from "../assets/somzzi5.png";

const images = [somzzi1, somzzi2, somzzi3, somzzi4, somzzi5];

export default function Card({ index, flipped, onClick }) {
  return (
    <CardContainer onClick={onClick} flipped={flipped}>
      <CardFront>
        <img src={backImage} />
      </CardFront>
      <CardBack>
        <img src={images[index]} />
      </CardBack>
    </CardContainer>
  );
}
// ---- Styled components ----
const CardContainer = styled.div`
  width: 200px;
  height: 300px;
  float: left;
  margin: 5px;
  cursor: pointer;
  position: relative;
  perspective: 1000px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${(props) =>
    props.flipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const CardFace = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
`;

const CardFront = styled(CardFace)`
  background-color: yellow;
  color: black;
`;

const CardBack = styled(CardFace)`
  background-color: #0073e6;
  color: white;
  transform: rotateY(180deg);
`;
