import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SelectpokemonById } from "../RTK/selector";

export default function Detail() {
  /**
   * useParams는 react-router-dom에서 제공하는 훅입니다.
   * 이 훅은 URL 내에서 동적으로 전달된 파라미터 값을 추출할 수 있게 해줍니다.
   * 예를 들어, '/detail/:pokemon' 경로에서는 'pokemon' 값이 동적으로 할당되어
   * useParams를 통해 { pokemon: 값 } 형태로 접근할 수 있습니다.
   */
  const { pokemonId } = useParams();
  console.log(typeof pokemonId);
  const pokemon = useSelector(SelectpokemonById(Number(pokemonId)));
  console.log(pokemon);

  return (
    <div className="flex flex-col items-center justify-center border border-[gray] p-[30px] rounded-[10px]">
      <div className="text-[28px] mb-[10px]">{pokemon.name}</div>
      <div className="whitespace-pre-wrap text-center">
        {pokemon.description}
      </div>
      <img className="w-[200px]" src={pokemon.front} />
    </div>
  );
}
