import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favoriteSlice } from "../RTK/slice";

const FavoriteButton = memo(function FavoriteButton({ pokemonId }) {
  const isFavorite = useSelector((state) =>
    state.favorite.some((item) => item === pokemonId)
  );
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(
        isFavorite
          ? favoriteSlice.actions.removeFromFavorite({ pokemonId })
          : favoriteSlice.actions.addToFavorite({ pokemonId })
      );
    },
    [dispatch, isFavorite, pokemonId]
  );

  return <button onClick={handleClick}>{isFavorite ? "❤️" : "🤍"}</button>;
});

export default FavoriteButton;
