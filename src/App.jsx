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
    <div className="min-h-screen bg-gradient-to-b from-[#1a1b1e] via-[#202124] to-[#1a1b1e]">
      <header className="relative overflow-hidden bg-gradient-to-r from-[#ff0000] to-[#CC0000] shadow-lg">
        <h1 className="text-center py-6 text-4xl font-bold text-gray-900 drop-shadow-[0_2px_2px_rgba(255,255,255,0.15)]">
          포켓몬 도감
        </h1>
        <nav className="bg-white py-3 px-4 flex justify-center gap-8 items-center relative z-20">
          <Link
            to="/"
            className="text-gray-900 hover:text-black text-lg transition-all duration-200 font-bold relative group"
          >
            <span>메인</span>
            <span className="absolute bottom-0 left-[50%] w-0 h-[2px] bg-gradient-to-r from-gray-600 to-gray-900 group-hover:w-[50%] transition-all duration-300 origin-right"></span>
            <span className="absolute bottom-0 right-[50%] w-0 h-[2px] bg-gradient-to-r from-gray-600 to-gray-900 group-hover:w-[50%] transition-all duration-300 origin-left"></span>
          </Link>
          <Link
            to="/favorite"
            className="text-gray-900 hover:text-black text-lg transition-all duration-200 font-bold relative group"
          >
            <span>찜목록</span>
            <span className="absolute bottom-0 left-[50%] w-0 h-[2px] bg-gradient-to-r from-gray-600 to-gray-900 group-hover:w-[50%] transition-all duration-300 origin-right"></span>
            <span className="absolute bottom-0 right-[50%] w-0 h-[2px] bg-gradient-to-r from-gray-600 to-gray-900 group-hover:w-[50%] transition-all duration-300 origin-left"></span>
          </Link>
          <div className="relative">
            <input
              onChange={handleSearchChange}
              placeholder="포켓몬 검색..."
              className="w-[200px] px-4 py-2 rounded-full border-2 border-gray-300 focus:border-gray-400 focus:outline-none shadow-inner text-gray-900 placeholder-gray-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔍
            </span>
          </div>
        </nav>
      </header>
      <main className="w-full py-8 relative bg-gradient-to-b from-[#1a1b1e] via-[#202124] to-[#1a1b1e]">
        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <Suspense
            fallback={
              <div className="text-center py-10 text-2xl text-gray-200 loading-animation backdrop-blur-sm">
                포켓몬을 찾고 있습니다...
                <div className="pokeball-loading"></div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/detail/:pokemonId" element={<Detail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorite" element={<Favorite />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;
