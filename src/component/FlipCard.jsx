import { useState } from "react";
import styled from "styled-components";

const FlipImageContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: ${(props) =>
    props.flipped ? "rotateY(180deg)" : "rotateY(0deg)"};
  cursor: pointer;
`;

const CardSide = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

  img {
    width: 280px;
    height: 280px;
    object-fit: contain;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const BackSide = styled(CardSide)`
  transform: rotateY(180deg);
`;

export default function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <FlipImageContainer
      flipped={flipped ? "flipped" : ""}
      onClick={() => setFlipped((prev) => !prev)}
    >
      <CardSide>
        <img src={front} alt="front" />
      </CardSide>
      <BackSide>
        <img src={back} alt="back" />
      </BackSide>
    </FlipImageContainer>
  );
}
