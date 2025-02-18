import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FavoriteButton from "./FavoriteButton";
import { memo, useState, useCallback } from "react";

const CardContainer = styled.section`
  width: 200px;
  height: 280px;
  background: linear-gradient(165deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.8),
    5px 5px 10px rgba(0, 0, 0, 0.1), inset 0 0 0 rgba(255, 255, 255, 0.4),
    inset 0 0 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;

  // 포켓볼 상단 부분
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(
      165deg,
      rgba(238, 21, 21, 0.95) 0%,
      rgba(204, 0, 0, 0.9) 100%
    );
    border-bottom: 3px solid rgba(34, 34, 36, 0.8);
    z-index: 1;
    box-shadow: inset 0 -3px 6px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
  }

  // 포켓볼 중앙 버튼
  &::after {
    content: "";
    position: absolute;
    top: calc(40% - 15px);
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
    background: linear-gradient(145deg, #ffffff 30%, #e8e8e8 100%);
    border: 3px solid rgba(34, 34, 36, 0.8);
    border-radius: 50%;
    box-shadow: -2px -2px 4px rgba(255, 255, 255, 0.8),
      2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(0, 0, 0, 0.05),
      inset 2px 2px 4px rgba(255, 255, 255, 0.8);
    z-index: 2;
    transition: all 0.3s ease;
  }

  .info-container {
    width: 90%;
    z-index: 3;
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.98),
      rgba(248, 249, 250, 0.95)
    );
    padding: 0.3rem 0.4rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5),
      inset -1px -1px 2px rgba(0, 0, 0, 0.05),
      inset 1px 1px 2px rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 7%;
    left: 50%;
    transform: translateX(-50%);
    backdrop-filter: blur(5px);
  }

  .image-container {
    width: 140px;
    height: 140px;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    img {
      width: 130px;
      height: 130px;
      object-fit: contain;
      transition: transform 0.3s ease;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    }
  }

  .pokemon-name {
    font-size: 1.2rem;
    color: #1a1a1a;
    font-weight: bold;
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8);
    position: relative;
    text-align: center;
    padding: 0 2rem;
    height: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .name-text {
      display: block;
      width: 100%;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .favorite-button {
      position: absolute;
      right: -0.3rem;
      top: 45%;
      transform: translateY(-50%) scale(0.9);
    }
  }

  .pokemon-id {
    font-size: 0.65rem;
    color: #666;
    text-align: center;
    margin-top: 0.1rem;
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8);
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: -8px -8px 15px rgba(255, 255, 255, 0.8),
      8px 8px 15px rgba(0, 0, 0, 0.15);

    &::after {
      background: linear-gradient(145deg, #ee1515 30%, #cc0000 100%);
      border-color: rgba(34, 34, 36, 0.8);
      box-shadow: -2px -2px 4px rgba(255, 255, 255, 0.4),
        2px 2px 4px rgba(0, 0, 0, 0.2), inset -1px -1px 2px rgba(0, 0, 0, 0.2),
        inset 1px 1px 2px rgba(255, 255, 255, 0.3);
    }

    .image-container img {
      transform: scale(1.1);
      filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3));
    }
  }
`;

export const Card = memo(({ pokemon }) => {
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
      <div className="image-container">
        {isLoading && (
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent" />
        )}
        <img
          onLoad={handleImageLoad}
          src={pokemon.front}
          alt={pokemon.name}
          className={isLoading ? "hidden" : "block"}
        />
      </div>
      <div className="info-container">
        <div className="pokemon-name">
          <span className="name-text">{pokemon.name}</span>
          <div className="favorite-button">
            <FavoriteButton pokemonId={pokemon.id} />
          </div>
        </div>
        <div className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</div>
      </div>
    </CardContainer>
  );
});
