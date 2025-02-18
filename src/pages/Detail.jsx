import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SelectpokemonById } from "../RTK/selector";
import FavoriteButton from "../component/FavoriteButton";
import FlipCard from "../component/FlipCard";
import styled from "styled-components";

const DetailCard = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #ee1515, #cc0000);
  }

  .content-container {
    padding: 0;
    max-width: 800px;
    margin: 0 auto;
  }

  .image-container {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .section-divider {
    padding: 0.5rem 1rem;
    margin: 0;
    background: linear-gradient(to right, rgba(238, 21, 21, 0.1), transparent);
    color: #333;
    font-weight: bold;
    text-align: center;
  }

  .pokemon-header {
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: relative;

    .favorite-button {
      position: absolute;
      right: 1rem;
    }
  }

  .pokemon-name {
    font-size: 2.5rem;
    color: #222224;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .star-rating {
    display: flex;
    gap: 2px;
    justify-content: center;
    margin-top: 0.5rem;

    .star {
      font-size: 1.2rem;
      color: #ffd700;
      -webkit-text-stroke: 1px #b8860b;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3),
        -1px -1px 1px rgba(255, 255, 255, 0.3);
    }
  }

  .pokemon-types {
    display: flex;
    gap: 0.8rem;
    margin: 0.5rem 0;
    justify-content: center;
  }

  .type-badge {
    padding: 0.5rem 1.2rem;
    border-radius: 25px;
    color: white;
    font-size: 1rem;
    text-transform: capitalize;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-weight: bold;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
    text-align: center;
  }

  .stat-item {
    background: #f8f8f8;
    padding: 0.8rem;
    border-radius: 10px;
    border: 1px solid rgba(238, 21, 21, 0.1);

    .stat-label {
      color: #666;
      font-size: 1rem;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    .stat-value {
      font-size: 1.4rem;
      color: #222;
      font-weight: bold;
    }

    .stat-bar {
      height: 6px;
      background: #ddd;
      border-radius: 3px;
      margin-top: 0.8rem;
      overflow: hidden;

      .stat-fill {
        height: 100%;
        background: linear-gradient(90deg, #ee1515, #cc0000);
        border-radius: 3px;
        transition: width 0.5s ease;
      }
    }
  }

  .pokemon-description {
    text-align: center;
    padding: 1rem;
    line-height: 1.6;
    color: #333;
  }

  .flip-guide {
    margin-top: 0.5rem;
    text-align: center;
    color: #666;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
  }
`;

const getTypeColor = (type) => {
  const colors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };
  return colors[type] || "#A8A878";
};

const calculateRating = (stats) => {
  const totalStats = stats.hp + stats.attack + stats.defense + stats.speed;
  if (totalStats >= 400) return 5;
  if (totalStats >= 350) return 4;
  if (totalStats >= 300) return 3;
  if (totalStats >= 250) return 2;
  return 1;
};

export default function Detail() {
  /**
   * useParams는 react-router-dom에서 제공하는 훅입니다.
   * 이 훅은 URL 내에서 동적으로 전달된 파라미터 값을 추출할 수 있게 해줍니다.
   * 예를 들어, '/detail/:pokemon' 경로에서는 'pokemon' 값이 동적으로 할당되어
   * useParams를 통해 { pokemon: 값 } 형태로 접근할 수 있습니다.
   */
  const { pokemonId } = useParams();
  console.log(typeof pokemonId);
  const pokemon = useSelector(SelectpokemonById(Number(pokemonId))) || {
    name: "",
    description: "",
    front: "",
    back: "",
    types: [],
    stats: { hp: 0, attack: 0, defense: 0, speed: 0 },
    height: 0,
    weight: 0,
    baseExperience: 0,
    abilities: [],
  };

  const rating = calculateRating(pokemon.stats);

  return (
    <DetailCard>
      <div className="content-container">
        <div className="pokemon-header">
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <div className="favorite-button">
            <FavoriteButton pokemonId={Number(pokemonId)} />
          </div>
        </div>

        <div className="star-rating">
          {[...Array(rating)].map((_, index) => (
            <span key={index} className="star">
              ★
            </span>
          ))}
        </div>

        <div className="section-divider">Type</div>
        <div className="pokemon-types">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="type-badge"
              style={{ backgroundColor: getTypeColor(type) }}
            >
              {type}
            </span>
          ))}
        </div>

        <div className="section-divider">Image</div>
        <div className="image-container">
          <FlipCard front={pokemon.front} back={pokemon.back} />
          <div className="flip-guide">
            <span className="icon">👆</span>
            클릭하면 뒷모습을 볼 수 있습니다
          </div>
        </div>

        <div className="section-divider">Description</div>
        <div className="pokemon-description">{pokemon.description}</div>

        <div className="section-divider">Stats</div>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-label">HP</div>
            <div className="stat-value">{pokemon.stats.hp}</div>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{ width: `${(pokemon.stats.hp / 255) * 100}%` }}
              />
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">공격력</div>
            <div className="stat-value">{pokemon.stats.attack}</div>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{ width: `${(pokemon.stats.attack / 255) * 100}%` }}
              />
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">방어력</div>
            <div className="stat-value">{pokemon.stats.defense}</div>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{ width: `${(pokemon.stats.defense / 255) * 100}%` }}
              />
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">속도</div>
            <div className="stat-value">{pokemon.stats.speed}</div>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{ width: `${(pokemon.stats.speed / 255) * 100}%` }}
              />
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">신장</div>
            <div className="stat-value">{pokemon.height}m</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">체중</div>
            <div className="stat-value">{pokemon.weight}kg</div>
          </div>
        </div>
      </div>
    </DetailCard>
  );
}
