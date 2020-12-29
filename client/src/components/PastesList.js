import React, { useState, useEffect, useCallback } from "react";
import Pastes from "./Pastes";
import api from "../api/index";
import Search from "./Search";
import "react-notifications/lib/notifications.css";
import Notifications from "./Notifications";
import debounce from "lodash.debounce";
import axios from "axios";
import moment from "moment";

function PastesList() {
  const [pastes, setPastes] = useState([]);
  const [searchText, setSearchText] = useState([]); // search input text
  const [faildLogs, setFailedLogs] = useState([]);
  const [keyword1, setKeyword1] = useState([]);
  const [allNotitfications, setAllNotitfications] = useState([]);
  const [options, setOptions] = useState([]);

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
          text: `scroller ${log.status}`,
          _id: log._id,
          date: log.date,
          type: "log",
        };
      });
      setFailedLogs(maped);
      return maped;
    } catch (err) {
      console.error(err);
    }
  };

  const searchKeyword1 = async (keyword) => {
    try {
      const { data } = await axios.post(`/api/v1/pastes/lable1`, keyword);
      const maped = data.map((array) => {
        return array[0].map((paste) => {
          return {
            text: `keyword ${array[1].keyword} found - ${paste.exact} match`,
            Title: paste.Title,
            _id: paste._id,
            date: paste.Date,
            type: "keyword",
          };
        });
      });
      const joinedArr = [];
      maped.forEach((arr) => {
        joinedArr.push(...arr);
      });
      setKeyword1(joinedArr);
      return joinedArr;
    } catch (err) {
      console.error(err);
    }
  };

  const debounceSave = useCallback(
    debounce((nextValue) => searchPaste(nextValue), 1000),
    []
  );

  const handleChange = (e) => {
    const nextValue = e.target.value;
    setSearchText(nextValue);
    debounceSave(nextValue);
  };

  const searchPaste = async (value) => {
    try {
      const { data } = await api.getPastes(`/pastes/search?search=${value}`);
      const allFiltered = data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setPastes(allFiltered);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchAll = async () => {
    const promises = [fetchLogs("faild"), searchKeyword1(options)];
    Promise.all(promises).then((data) => {
      getAllNotifications(data);
    });
  };

  const getAllNotifications = useCallback((arr) => {
    let joinedArr = [];
    arr.forEach((array) => {
      joinedArr.push(...array);
    });
    const allFiltered = joinedArr.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    setAllNotitfications(joinedArr);
  }, []);

  useEffect(() => {
    try {
      if (options.length !== 0) {
        fetchAll();
      }
      const interval = setInterval(async () => {
        if (options.length !== 0) {
          fetchAll();
        }
      }, 30000);
      return () => {
        clearInterval(interval);
      };
    } catch (e) {
      console.error(e);
    }
  }, [options]);

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
        handleChange={handleChange}
        searchText={searchText}
        fetchAll={fetchAll}
        options={options}
        setOptions={setOptions}
      />
      {faildLogs.length > 0 && (
        <div style={{ marginTop: "5rem" }}>
          <Notifications keyword1={keyword1} faildLogs={faildLogs} />
        </div>
      )}
      <div
        className="mainArea"
        style={{
          marginTop: "3rem",
        }}
      >
        <div
          className="allPastes"
          style={{
            overflowY: "auto",
            // width: "600px",
          }}
        >
          {pastes.length !== 0 &&
            pastes.map((paste, i) => {
              return <Pastes key={i} paste={paste} />;
            })}
        </div>
        {/* <div
          style={{
            overflowY: "auto",
            // width: "600px",
          }}
        >
          <Logs />
        </div> */}
      </div>
    </div>
  );
}

export default PastesList;
