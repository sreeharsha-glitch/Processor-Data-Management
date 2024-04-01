import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home';
import BarChartPage from "./components/bar-chart";
import PieChartPage from "./components/pie-chart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route  path="/barchart" element={<BarChartPage/>}/>
          <Route  path="/piechart" element={<PieChartPage/>} />
      </Routes>
    </BrowserRouter >

  );
}

export default App;
