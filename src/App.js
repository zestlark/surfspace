import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './view/HomeView';
import AlertBox from './overpages/Alert'

function App() {


  return (
    <div className="App min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>

      <AlertBox />
    </div>
  );
}

export default App;
