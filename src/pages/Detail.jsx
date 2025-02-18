import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SelectpokemonById } from "../RTK/selector";
import FavoriteButton from "../component/FavoriteButton";
import FlipCard from "../component/FlipCard";
import styled from "styled-components";

const DetailCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 1000px;
  margin: 2rem auto;
  position: relative;
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
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .pokemon-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid rgba(238, 21, 21, 0.1);
  }

  .pokemon-name {
    font-size: 2.5rem;
    color: #222224;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .pokemon-types {
    display: flex;
    gap: 0.8rem;
    margin: 0.3rem 0;
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
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    margin-top: 0.3rem;
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
    background: #f8f8f8;
    padding: 1rem;
    border-radius: 12px;
    font-size: 1.1rem;
    line-height: 1.5;
    color: #444;
    border: 1px solid rgba(238, 21, 21, 0.1);
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(to bottom, #ee1515, #cc0000);
      border-radius: 2px 0 0 2px;
    }
  }

  .section-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0.5rem 0;
    color: #666;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;

    &::before,
    &::after {
      content: "";
      height: 1px;
      flex: 1;
      background: linear-gradient(
        90deg,
        rgba(238, 21, 21, 0.1) 0%,
        rgba(238, 21, 21, 0.3) 50%,
        rgba(238, 21, 21, 0.1) 100%
      );
    }
  }

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.3rem 0;

    .flip-guide {
      margin-top: 0.3rem;
      color: #666;
      font-size: 0.9rem;
      opacity: 0.8;
      display: flex;
      align-items: center;
      gap: 0.3rem;

      .icon {
        font-size: 1rem;
        color: #ee1515;
      }
    }
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

  return (
    <DetailCard>
      <div className="content-container">
        <div className="pokemon-header">
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <FavoriteButton pokemonId={Number(pokemonId)} />
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
