import { useSelector } from "react-redux";
import { Card } from "../component/Card";
import styled from "styled-components";

const MainContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  position: relative;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export default function Main() {
  const pokemonData = useSelector((state) => state.pokemon.data);

  return (
    <MainContainer>
      <GridContainer>
        {pokemonData.map((el) => (
          <Card key={el.id} pokemon={el} />
        ))}
      </GridContainer>
    </MainContainer>
  );
}
