import { memo } from "react";
import { useSelector } from "react-redux";
import { selectFavoritepokemons } from "../RTK/selector";
import { Card } from "../component/Card";

const Favorite = memo(function Favorite() {
  const pokemon = useSelector(selectFavoritepokemons);
  return (
    <div className="pokemon-grid">
      {pokemon.map((el) => (
        <Card key={el.id} pokemon={el} />
      ))}
    </div>
  );
});

export default Favorite;
