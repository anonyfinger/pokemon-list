import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMultiplePokemonById = createAsyncThunk(
  "pokemon/fetchMultiplePokemonById",
  async () => {
    const numberArray = Array.from({ length: 800 }, (_, i) => i + 1);

    const fetchAPI = async (pokemonId) => {
      // 포켓몬 종 정보 가져오기
      const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
      );
      const speciesData = await speciesResponse.json();

      // 포켓몬 상세 정보 가져오기
      const detailResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
      );
      const detailData = await detailResponse.json();

      const pokemonData = {
        id: pokemonId,
        name: speciesData.names.find((el) => el.language.name === "ko").name,
        description: speciesData.flavor_text_entries.find(
          (el) => el.language.name === "ko"
        ).flavor_text,
        front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
        back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`,
        // 추가 정보
        types: detailData.types.map((type) => type.type.name),
        stats: {
          hp: detailData.stats.find((stat) => stat.stat.name === "hp")
            .base_stat,
          attack: detailData.stats.find((stat) => stat.stat.name === "attack")
            .base_stat,
          defense: detailData.stats.find((stat) => stat.stat.name === "defense")
            .base_stat,
          speed: detailData.stats.find((stat) => stat.stat.name === "speed")
            .base_stat,
        },
        height: detailData.height / 10, // 미터 단위
        weight: detailData.weight / 10, // kg 단위
        baseExperience: detailData.base_experience,
        abilities: detailData.abilities.map((ability) => ability.ability.name),
      };
      return pokemonData;
    };

    return await Promise.all(numberArray.map((el) => fetchAPI(el)));
  }
);
