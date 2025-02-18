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
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950">
      <header className="relative overflow-hidden">
        {/* 헤더 배경 */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)]"></div>
        </div>
        
        {/* 포켓볼 하단 장식 */}
        <div className="absolute bottom-0 left-0 w-full h-[50px] bg-gradient-to-r from-gray-800 via-gray-850 to-gray-900 border-t-[3px] border-gray-700/50 shadow-[inset_0_5px_10px_rgba(0,0,0,0.15)]"></div>
        
        {/* 포켓볼 중앙 버튼 */}
        <div className="absolute left-1/2 bottom-[15px] transform -translate-x-1/2 w-[50px] h-[50px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-[3px] border-gray-700/70 z-10 shadow-[0_4px_10px_rgba(0,0,0,0.25),inset_-2px_-2px_6px_rgba(0,0,0,0.2),inset_2px_2px_6px_rgba(255,255,255,0.05)]">
          <div className="w-[30px] h-[30px] bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border-[3px] border-gray-700/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),inset_2px_2px_4px_rgba(255,255,255,0.05)]"></div>
        </div>

        {/* 타이틀 */}
        <h1 className="text-center py-6 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-300 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] relative z-10">
          포켓몬 도감
        </h1>

        {/* 네비게이션 */}
        <nav className="bg-gradient-to-b from-gray-800/95 via-gray-850/95 to-gray-900/95 backdrop-blur-sm py-3 px-4 flex justify-center gap-6 items-center relative z-20 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_-1px_2px_rgba(255,255,255,0.03)]">
          <Link
            to="/"
            className="text-gray-200 hover:text-white text-lg transition-all duration-200 font-bold relative group overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">메인</span>
            <span className="absolute bottom-0 left-[50%] w-0 h-[2px] bg-gradient-to-r from-gray-400 to-gray-300 group-hover:w-[50%] transition-all duration-300 origin-right"></span>
            <span className="absolute bottom-0 right-[50%] w-0 h-[2px] bg-gradient-to-r from-gray-400 to-gray-300 group-hover:w-[50%] transition-all duration-300 origin-left"></span>
          </Link>
          <Link
            to="/favorite"
            className="text-gray-200 hover:text-white text-lg transition-all duration-200 font-bold relative group overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">찜목록</span>
            <span className="absolute bottom-0 left-[50%] w-0 h-[2px] bg-gradient-to-r from-gray-400 to-gray-300 group-hover:w-[50%] transition-all duration-300 origin-right"></span>
            <span className="absolute bottom-0 right-[50%] w-0 h-[2px] bg-gradient-to-r from-gray-400 to-gray-300 group-hover:w-[50%] transition-all duration-300 origin-left"></span>
          </Link>
          <div className="relative">
            <input
              onChange={handleSearchChange}
              placeholder="포켓몬 검색..."
              className="w-[200px] px-4 py-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 border-2 border-gray-600 focus:border-gray-500 focus:outline-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.05)] text-gray-200 placeholder-gray-500 transition-all duration-300 focus:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.1)]"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              🔍
            </span>
          </div>
        </nav>
      </header>
      <main className="w-full py-8 relative bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_70%)]"></div>
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
