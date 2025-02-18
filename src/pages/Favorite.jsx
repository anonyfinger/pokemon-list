import { memo } from "react";
import { useSelector } from "react-redux";
import { selectFavoritepokemons } from "../RTK/selector";
import { Card } from "../component/Card";

const Favorite = memo(function Favorite() {
  const pokemon = useSelector(selectFavoritepokemons);
  return (
    <>
      {pokemon.map((el) => (
        <Card key={el.id} pokemon={el} />
      ))}
    </>
  );
});

export default Favorite;
