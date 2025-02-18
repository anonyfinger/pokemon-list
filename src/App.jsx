import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { fetchMultiplePokemonById } from "./RTK/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import Favorite from "./pages/Favorite";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pokemonData = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchMultiplePokemonById(20));
  }, []);

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
            onChange={(e) => navigate(`/search?pokemon=${e.target.value}`)}
            className="w-[120px] border-b border-[darkgray] rounded-[5px] px-2"
          />
          <span>🔎</span>
        </div>
      </nav>
      <main className="pb-[20px] bg-[gray] flex flex-wrap justify-center gap-[20px] pt-[20px]">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:pokemonId" element={<Detail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
