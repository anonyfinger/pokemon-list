import { getRegExp } from "korean-regexp";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selecPokemonByRegExp } from "../RTK/selector";
import { Card } from "../component/Card";
import { useMemo } from "react";

export default function Search() {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("pokemon");

  const reg = useMemo(() => getRegExp(param), [param]);
  const pokemon = useSelector(selecPokemonByRegExp(reg));

  return (
    <div className="pokemon-grid">
      {pokemon.map((el) => (
        <Card key={el.id} pokemon={el} />
      ))}
    </div>
  );
}
