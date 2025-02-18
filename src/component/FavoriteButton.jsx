import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favoriteSlice } from "../RTK/slice";
import styled from "styled-components";

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  
  font-size: 1.5rem; // 크기 약간 축소
  padding: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #222224; // 기본 색상 설정

  .heart-icon {
    width: 1em;
    height: 1em;
    stroke: currentColor; // 테두리 색상
    stroke-width: 2; // 테두리 두께
    fill: ${(props) => (props.isFavorite ? "#EE1515" : "none")}; // 채우기 색상
    transition: all 0.2s ease;
  }

  &:hover {
    transform: scale(1.1);
    .heart-icon {
      fill: ${(props) => (props.isFavorite ? "#CC0000" : "#ffecec")};
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

const FavoriteButton = memo(function FavoriteButton({ pokemonId }) {
  const isFavorite = useSelector((state) =>
    state.favorite.some((item) => item === pokemonId)
  );
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(
        isFavorite
          ? favoriteSlice.actions.removeFromFavorite({ pokemonId })
          : favoriteSlice.actions.addToFavorite({ pokemonId })
      );
    },
    [dispatch, isFavorite, pokemonId]
  );

  return (
    <StyledButton onClick={handleClick} isFavorite={isFavorite}>
      <svg
        className="heart-icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </StyledButton>
  );
});

export default FavoriteButton;
