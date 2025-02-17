import { createSelector } from "@reduxjs/toolkit";

/**
 * 이 셀렉터 팩토리는 각 포켓몬의 ID를 인자로 받아,
 * 해당 ID에 매칭되는 포켓몬 데이터를 상태에서 추출할 수 있도록 구성됩니다.
 *
 * 여기서 인자(pokemonId)는 포켓몬 상세정보 페이지에서 특정 포켓몬을 식별하기 위한 식별자(ID)를 의미합니다.
 */
export const SelectpokemonById = (pokemonId) =>
  createSelector(
    (state) => state.pokemon.data,
    (pokemon) => pokemon.find((el) => el.id === pokemonId)
  );

export const selecPokemonByRegExp = (reg) =>
  createSelector(
    (state) => state.pokemon.data,
    (pokemon) => pokemon.filter((el) => el.name.match(reg))
  );
