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
    5px 5px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;

  // 클릭 영역
  .card-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 75%;
    z-index: 15;
    cursor: pointer;
  }

  &:hover {
    transform: translateY(-5px);

    .image-container img {
      transform: scale(1.05);
    }
  }

  // 이미지 컨테이너
  .image-container {
    width: 140px;
    height: 140px;
    position: absolute;
    top: 63%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;

    img {
      width: 130px;
      height: 130px;
      object-fit: contain;
      transition: transform 0.3s ease;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    }
  }

  // 상단 헤더 컨테이너
  .header-container {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    z-index: 3;
  }

  // 포켓몬 이름
  .pokemon-title {
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.7)
    );
    padding: 8px 20px;
    border-radius: 12px;
    font-size: 1.1rem;
    color: #222;
    font-weight: 600;
    backdrop-filter: blur(4px);
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  // 별점 컨테이너
  .star-rating {
    display: flex;
    gap: 2px;
    justify-content: center;

    .star {
      font-size: 0.9rem;
      color: #ffd700;
      -webkit-text-stroke: 1px #b8860b;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3),
        -1px -1px 1px rgba(255, 255, 255, 0.3);
    }
  }

  // 하단 정보 컨테이너
  .info-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0.4rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    border-radius: 0 0 15px 15px;

    .pokemon-id {
      font-size: 0.9rem;
      font-weight: bold;
      color: #666;
    }

    .favorite-button {
      position: relative;
      margin-left: auto;
      z-index: 10; // 가장 앞으로
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
`;

const calculateRating = (stats) => {
  const totalStats = stats.hp + stats.attack + stats.defense + stats.speed;
  if (totalStats >= 400) return 5;
  if (totalStats >= 350) return 4;
  if (totalStats >= 300) return 3;
  if (totalStats >= 250) return 2;
  return 1;
};

export const Card = memo(({ pokemon }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const rating = calculateRating(pokemon.stats);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleClick = useCallback(() => {
    navigate(`/detail/${pokemon.id}`);
  }, [pokemon.id, navigate]);

  return (
    <CardContainer>
      <div className="card-link" onClick={handleClick} />
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
      <div className="header-container">
        <div className="pokemon-title">{pokemon.name}</div>
        <div className="star-rating">
          {[...Array(rating)].map((_, index) => (
            <span key={index} className="star">
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="info-container">
        <div className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</div>
        <div className="favorite-button">
          <FavoriteButton pokemonId={pokemon.id} />
        </div>
      </div>
    </CardContainer>
  );
});
