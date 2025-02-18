import { useSelector } from "react-redux";
import { selectFavoritepokemons } from "../RTK/selector";
import { Card } from "../component/Card";

export default function Favorite() {
  const pokemon = useSelector(selectFavoritepokemons);
  return (
    <>
      {pokemon.map((el) => (
        <Card key={el.id} pokemon={el} />
      ))}
    </>
  );
}
