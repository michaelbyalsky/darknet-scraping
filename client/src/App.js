import { useState, useEffect } from "react"
import Pastes from "./components/Pastes";
import api from "./api/index";
import Search from "./components/Search";
function App() {
  const [pastes, setPastes] = useState([]);
  const [searchText, setSearchText] = useState([]); // search input text

  const fetchPastes = async () => {
    try {
      const { data } = await api.getPastes("/pastes");
      console.log(data);
      setPastes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const searchTicket = async () => {
    try {
      const { data } = await api.getPastes(`/pastes/search?search=${searchText}`);
      console.log(data);
      setPastes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // search for ticket in the list
  
    searchTicket();
  }, [searchText]);

  useEffect(() => {
    fetchPastes();
  }, []);
  return (
    <div className="App">
      <Search
          setSearchText={setSearchText}
          searchText={searchText}
        />
        <div style={{marginTop: "5rem"}}>
      {pastes.length !== 0 &&
        pastes.map((paste, i) => {
          return <Pastes key={i} paste={paste} />;
        })}
        </div>
    </div>
  );
}

export default App;
