import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FavoriteButton from "./FavoriteButton";
import { memo, useState, useCallback } from "react";

const CardContainer = styled.section`
  width: 150px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  border-bottom: 5px solid black;
  border-right: 5px solid black;

  img {
    width: 120px;
  }
`;

export const Card = memo(({ pokemon }) => {
  console.log("card", pokemon.id);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleClick = useCallback(() => {
    navigate(`/detail/${pokemon.id}`);
  }, [pokemon.id, navigate]);

  return (
    <CardContainer onClick={handleClick}>
      {isLoading ? (
        <div className="w-[120px] h-[120px] leading-[120px] text-center">
          Loading...
        </div>
      ) : null}
      <img onLoad={handleImageLoad} src={pokemon.front} />
      <div>
        {pokemon.name}
        <FavoriteButton pokemonId={pokemon.id} />
      </div>
    </CardContainer>
  );
});
