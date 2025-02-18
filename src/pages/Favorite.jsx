import { useSelector } from "react-redux";
import { Card } from "../component/Card";
import styled from "styled-components";

const FavoriteContainer = styled.div`
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
  justify-items: center;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, 200px);
    justify-content: center;
  }
`;

export default function Favorite() {
  const favoriteIds = useSelector((state) => state.favorite);
  const pokemonData = useSelector((state) => state.pokemon.data);
  const favoritePokemon = pokemonData.filter((pokemon) =>
    favoriteIds.includes(pokemon.id)
  );

  return (
    <FavoriteContainer>
      <GridContainer>
        {favoritePokemon.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </GridContainer>
    </FavoriteContainer>
  );
}
