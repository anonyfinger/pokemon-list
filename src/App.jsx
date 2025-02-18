import { lazy, Suspense, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { fetchMultiplePokemonById } from "./RTK/thunk";
import "./App.scss";

const Main = lazy(() => import("./pages/Main"));
const Detail = lazy(() => import("./pages/Detail"));
const Search = lazy(() => import("./pages/Search"));
const Favorite = lazy(() => import("./pages/Favorite"));

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pokemonData = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchMultiplePokemonById(20));
  }, [dispatch]);

  const handleSearchChange = useCallback(
    (e) => {
      navigate(`/search?pokemon=${e.target.value}`);
    },
    [navigate]
  );

  return (
    <>
      <h1 className="border-t-[50px] border-t-[red] bg-black text-white text-[40px] text-center">
        포켓몬 도감
      </h1>
      <nav className="py-[10px] border-b-[3px] border-b-black flex justify-center gap-[20px]">
        <Link to="/">메인</Link>
        <Link to="/favorite">찜목록</Link>
        <div>
          <input
            onChange={handleSearchChange}
            className="w-[120px] border-b border-[darkgray] rounded-[5px] px-2"
          />
          <span>🔎</span>
        </div>
      </nav>
      <main className="pb-[20px] bg-[gray] flex flex-wrap justify-center gap-[20px] pt-[20px]">
        <Suspense fallback={<div>로딩중...</div>}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/detail/:pokemonId" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorite" element={<Favorite />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
