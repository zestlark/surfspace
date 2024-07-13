import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './view/HomeView';
import AlertBox from './overpages/Alert'
import ConfIrmBox from "./overpages/ConfIrmBox";
import Auth from './overpages/Auth'
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const background = useSelector(state => state.appsetting.background)
  const selectedBackgroundImageStyleName = useSelector(state => state.appsetting.selectedBackgroundImageStyleName)
  // console.log(background[selectedBackgroundImageStyleName]);
  useEffect(() => {
    if (selectedBackgroundImageStyleName !== 'none') {
      document.body.style.backgroundImage = `url(${background[selectedBackgroundImageStyleName].BodyImageUrl})`;
      document.body.style.backgroundAttachment = 'fixed'
      document.body.style.backgroundSize = 'cover'
    } else {
      document.body.style.background = 'none';
    }
  }, [selectedBackgroundImageStyleName, background])

  return (
    <div className={`App min-h-screen ${selectedBackgroundImageStyleName !== 'none' ? 'bg-[#ffffff88] dark:bg-[#000000aa]' : ''}`}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/:auth" element={<Home />} />
          <Route exact path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>

      <AlertBox />
      <ConfIrmBox />

      <Auth />
    </div>
  );
}

export default App;
