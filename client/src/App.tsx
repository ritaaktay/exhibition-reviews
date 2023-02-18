import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { Routes, Route } from "react-router-dom";
import ExhibitionList from "./components/ExhibitionList";
import ReviewForm from "./components/ReviewForm";
import Navbar from "./components/Navbar";
import Exhibition from "./components/Exhibition";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element=<ExhibitionList /> />
          <Route path="/exhibitions" element=<ExhibitionList /> />
          <Route path="/exhibitions/:id" element=<Exhibition /> />
          <Route path="/new" element=<ReviewForm /> />
        </Routes>
      </div>
    </div>
  );
}

export default App;
