import { useState, useEffect } from "react";
import Pastes from "./components/Pastes";
import api from "./api/index";
import Search from "./components/Search";
function App() {
  const [pastes, setPastes] = useState([]);
  const [searchText, setSearchText] = useState([]); // search input text
  const [faildLogs, setFailedLogs] = useState([]);
  const [faildLogsLength, setFailedLogsLength] = useState([]);

  const fetchPastes = async () => {
    try {
      const { data } = await api.getPastes("/pastes");
      console.log(data);
      setPastes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLogs = async (status) => {
    try {
      const { data } = await api.getPastes(`/logs/${status}`);
      console.log(data);
      setFailedLogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const searchTicket = async () => {
    try {
      const { data } = await api.getPastes(
        `/pastes/search?search=${searchText}`
      );
      console.log(data);
      setPastes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      const interval = setInterval(async () => {
        fetchLogs("faild");
      }, 300000);
      return () => {
        clearInterval(interval)
      }
    } catch (e) {
      console.error(e);
    }
  });

  useEffect(() => {
    // search for ticket in the list
    searchTicket();
  }, [searchText]);

  useEffect(() => {
    fetchPastes();
  }, []);
  return (
    <div className="App">
      <Search faildLogs={faildLogs} setSearchText={setSearchText} searchText={searchText} />
      <div className="mainArea" style={{ maxWidth: "100%", display: "flex" }}>
        <div
          className="allPastes"
          style={{
            overflowY: "auto",
            height: "700px",
            width: "600px",
            marginTop: "5rem",
          }}
        >
          {pastes.length !== 0 &&
            pastes.map((paste, i) => {
              return <Pastes key={i} paste={paste} />;
            })}
        </div>
        <div
          className="customPastes"
          style={{
            marginTop: "5rem",
            display: "grid",
            gridAutoRows: "50% 50%",
          }}
        >
          <div className="first" style={{ overflowY: "auto", height: "300px" }}>
            {pastes.length !== 0 &&
              pastes.map((paste, i) => {
                return <Pastes key={i} paste={paste} />;
              })}
          </div>
          <div
            className="second"
            style={{ overflowY: "auto", height: "300px" }}
          >
            {pastes.length !== 0 &&
              pastes.map((paste, i) => {
                return <Pastes key={i} paste={paste} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
