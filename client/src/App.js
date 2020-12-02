import { useState, useEffect } from "react";
import Pastes from "./components/Pastes";
import api from "./api/index";
import Search from "./components/Search";
import Logs from "./components/Logs";
import "react-notifications/lib/notifications.css";
import Notifications from "./components/Notifications";
import moment from "moment";

function App() {
  const [pastes, setPastes] = useState([]);
  const [searchText, setSearchText] = useState([]); // search input text
  const [faildLogs, setFailedLogs] = useState([]);
  const [faildLogsLength, setFailedLogsLength] = useState([]);
  const [keyword1, setKeyword1] = useState([]);
  const [keyword2, setKeyword2] = useState([]);
  const [allNotitfications, setAllNotitfications] = useState([]);
  const fetchPastes = async () => {
    try {
      const { data } = await api.getPastes("/pastes");
      const sorted = data.sort((a, b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.Date) - new Date(a.Date);
      });
      setPastes(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLogs = async (status) => {
    try {
      const { data } = await api.getPastes(`/logs/${status}`);
      const maped = data.map((log) => {
        return {
          text: `scroller ${log.status} || ${moment(log.date).format("ddd DD-MMM-YYYY, hh:mm A")}`,
          _id: log._id,
          date: log.date,
          type: "log"
        };
      });
      setFailedLogs(maped);
    } catch (err) {
      console.error(err);
    }
  };

  const searchKeyword1 = async (keyword) => {
    try {
      const { data } = await api.getPastes(`/pastes/lable1?search=${keyword}`);
      const maped = data.map((paste) => {
        return {
          text: `word with keyword ${keyword} || ${moment(paste.Date).format("ddd DD-MMM-YYYY, hh:mm A")}`,
          _id: paste._id,
          date: paste.Date,
          type: "keyword"
        };
      });
      setKeyword1(maped);
    } catch (err) {
      console.error(err);
    }
  };

  const searchKeyword2 = async (keyword) => {
    try {
      const { data } = await api.getPastes(`/pastes/lable2?search=${keyword}`);
      const maped = data.map((paste) => {
        return {
          text: `word with keyword ${keyword} || ${moment(paste.Date).format("ddd DD-MMM-YYYY, hh:mm A")}`,
          _id: paste._id,
          date: paste.Date,
          type: "keyword"
        };
      });
      setKeyword2(maped);
    } catch (err) {
      console.error(err);
    }
  };

  const searchPaste = async () => {
    try {
      if (searchText.length > 0) {
        const { data } = await api.getPastes(
          `/pastes/search?search=${searchText}`
        );
        setPastes(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getAllNotifications = async () => {
    console.log(faildLogs);
    const all = [...keyword1, ...keyword2, ...faildLogs]
    const allFiltered = all.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    })
    setAllNotitfications(allFiltered);
  };

  useEffect(() => {
    getAllNotifications();
  }, [keyword1, keyword2, faildLogs]);
const fetchAll = () => {
  fetchLogs("faild");
  searchKeyword1("Money");
  searchKeyword2("Guns");
}
  useEffect(() => {
    try {
      fetchAll()
      const interval = setInterval(async () => {
        fetchAll()

      }, 30000);
      return () => {
        clearInterval(interval);
      };
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    // search for ticket in the list
    searchPaste();
  }, [searchText]);

  useEffect(() => {
    fetchPastes();
  }, []);
  return (
    <div className="App">
      <Search
      setAllNotitfications={setAllNotitfications}
        allNotitfications={allNotitfications}
        setPastes={setPastes}
        pastes={pastes}
        faildLogs={faildLogs}
        setSearchText={setSearchText}
        searchText={searchText}
        fetchAll={fetchAll}
      />
      {faildLogs.length > 0 && (
        <div style={{ marginTop: "5rem" }}>
          <Notifications
            keyword1={keyword1}
            keyword2={keyword2}
            faildLogs={faildLogs}
          />
        </div>
      )}
      <div className="mainArea">
        <div
          className="allPastes"
          style={{
            overflowY: "auto",
            // height: "700px",
            // width: "600px",
            marginTop: "5rem",
          }}
        >
          {pastes.length !== 0 &&
            pastes.map((paste, i) => {
              return <Pastes key={i} paste={paste} />;
            })}
        </div>
        <Logs />
        {/* <div
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
        </div> */}
      </div>
    </div>
  );
}

export default App;
