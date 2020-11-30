import { useState, useEffect } from "react"
import Pastes from "./components/Pastes";
import api from "./api/index";
function App() {
  const [pastes, setPastes] = useState([]);
  const fetchPastes = async () => {
    try {
      const { data } = await api.getPastes("/pastes");
      console.log(data);
      setPastes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPastes();
  }, []);
  return (
    <div className="App">
      {pastes.length !== 0 &&
        pastes.map((paste, i) => {
          return <Pastes key={i} paste={paste} />;
        })}
    </div>
  );
}

export default App;
