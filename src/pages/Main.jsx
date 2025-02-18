import { useSelector } from "react-redux";
import { Card } from "../component/Card";
import styled from "styled-components";
import { useState, useMemo } from "react";

const MainContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  position: relative;
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  margin-bottom: 2.5rem;
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 2px solid #ddd;
  background: white;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 180px;

  &:hover {
    border-color: #cc0000;
  }

  &:focus {
    outline: none;
    border-color: #ee1515;
    box-shadow: 0 0 0 2px rgba(238, 21, 21, 0.1);
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
`;

// 별점 계산 함수
const calculateRating = (stats) => {
  const totalStats = stats.hp + stats.attack + stats.defense + stats.speed;
  if (totalStats >= 400) return 5;
  if (totalStats >= 350) return 4;
  if (totalStats >= 300) return 3;
  if (totalStats >= 250) return 2;
  return 1;
};

export default function Main() {
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const pokemonData = useSelector((state) => state.pokemon.data);

  const sortedPokemon = useMemo(() => {
    const pokemonWithRatings = pokemonData.map((pokemon) => ({
      ...pokemon,
      rating: calculateRating(pokemon.stats),
    }));

    if (sortBy === "default") {
      return [...pokemonWithRatings].sort((a, b) => a.id - b.id);
    }

    return [...pokemonWithRatings].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "rating":
          comparison = b.rating - a.rating;
          break;
        case "attack":
          comparison = b.stats.attack - a.stats.attack;
          break;
        case "defense":
          comparison = b.stats.defense - a.stats.defense;
          break;
        case "speed":
          comparison = b.stats.speed - a.stats.speed;
          break;
        case "hp":
          comparison = b.stats.hp - a.stats.hp;
          break;
        default:
          comparison = a.id - b.id;
      }
      return sortBy === "name" || sortBy === "id"
        ? sortOrder === "asc"
          ? comparison
          : -comparison
        : sortOrder === "desc"
        ? comparison
        : -comparison;
    });
  }, [pokemonData, sortBy, sortOrder]);

  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split("-");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <MainContainer>
      <SortContainer>
        <SortSelect
          value={`${sortBy}-${sortOrder}`}
          onChange={handleSortChange}
        >
          <option value="default-asc">기본보기(카드번호순)</option>
          <option value="id-asc">번호 오름차순</option>
          <option value="id-desc">번호 내림차순</option>
          <option value="name-asc">이름 오름차순</option>
          <option value="name-desc">이름 내림차순</option>
          <option value="rating-desc">별점 높은순</option>
          <option value="rating-asc">별점 낮은순</option>
          <option value="attack-desc">공격력 높은순</option>
          <option value="attack-asc">공격력 낮은순</option>
          <option value="defense-desc">방어력 높은순</option>
          <option value="defense-asc">방어력 낮은순</option>
          <option value="speed-desc">속도 높은순</option>
          <option value="speed-asc">속도 낮은순</option>
          <option value="hp-desc">체력 높은순</option>
          <option value="hp-asc">체력 낮은순</option>
        </SortSelect>
      </SortContainer>
      <GridContainer>
        {sortedPokemon.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </GridContainer>
    </MainContainer>
  );
}
