import { useSelector } from "react-redux";
import { Card } from "../component/Card";
import styled from "styled-components";

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(
    165deg,
    rgba(55, 65, 81, 0.7),
    rgba(31, 41, 55, 0.8)
  );
  border-radius: 1.5rem;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 2px 4px -1px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;

  // 테두리 그라데이션 효과
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    background: linear-gradient(
      165deg,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0.05)
    );
    border-radius: 1.5rem;
    mask: 
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }

  // 내부 그라데이션 효과
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at top right,
      rgba(255, 255, 255, 0.1),
      transparent 60%
    );
    pointer-events: none;
  }

  // 카드 컨테이너
  & > div {
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      filter: brightness(1.05);
    }
  }

  // 상단 엣지 효과
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.08),
      transparent
    );
    opacity: 0.5;
    pointer-events: none;
  }
`;

export default function Main() {
  const pokemonData = useSelector((state) => state.pokemon.data);

  return (
    <PokemonGrid>
      {pokemonData.map((el) => (
        <Card key={el.id} pokemon={el} />
      ))}
    </PokemonGrid>
  );
}
