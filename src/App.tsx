import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Home from "./routes/Home";
import Chart from "./routes/chart/chart";
import NewMusicPage from "./routes/chart/newmusic";
import Artist from "./routes/artist/artist";
import Album from "./routes/album/album";
import Track from "./routes/track/track";
import PopularCommentDetail from "./routes/comment/PopularCommentDetail";
import Mypage from "./routes/mypage/MyPage";
import MyPageEdit from "./routes/mypage/MyPageEdit";
import SearchResults from "./routes/search/SearchResults";
import Reviews from "./routes/review/reviews";
import Comments from "./routes/comment/comments";

function App() {
  return (
    <Router>
      <Header />

      <div className="mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Chart" element={<Chart />} />
          <Route path="/newmusic" element={<NewMusicPage />} />
          <Route path="/Artist/:query" element={<Artist />} />
          <Route path="/Album/:query" element={<Album />} />
          <Route path="/Track/:query" element={<Track />} />

          <Route path="/Review/:typeID" element={<Reviews />} />
          <Route path="/Review/:reviewID/Comments" element={<Comments />} />

          <Route
            path="/PopularCommentDetail"
            element={<PopularCommentDetail />}
          />
          <Route path="/MyPage" element={<Mypage />}></Route>
          <Route path="/track/:trackId" element={<Track />} />
          <Route path="/MyPage/Edit" element={<MyPageEdit />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
