
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { httpClient } from "../utils/asyncUtils";
import { DataGrid } from "@material-ui/data-grid";
import { Event } from "../models/event";
import moment from "moment";
import { List, ListItem, ListItemText } from "@material-ui/core";

const columns = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "userUniqueId", headerName: "User Unique ID", width: 130 },
  { field: "name", headerName: "Event Name", width: 130 },
  { field: "browser", headerName: "Browser", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  // },
];


const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [sorting, setSorting] = useState("");
  const [type, setType] = useState("");
  const [browser, setBrowser] = useState("");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState("");

  const fetchLogs = async () => {
    try {
      const { data } = await httpClient.get(`http://localhost:5000/logs`);
      // -filtered?sorting=${sorting}&type=${type}&browser=${browser}&search=${search}&offsFet=${offset}
      let filtered  = [];
      data.forEach((event, index) => {
        filtered.push({
          id: index,
          userUniqueId: event.distinct_user_id,
          name: event.name,
          browser: event.browser,
          date: moment(event.date).format("YYYY-MM-DD"),
        });
      });
      setLogs(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <h1>logs</h1>
      <div className="logsContainer">
       {logs && (
          <InfiniteScroll
            pageStart={0}
            loadMore={fetchLogs}
            hasMore={true}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
      > 
    
          <List style={{ height: "100px" }}>
            {logs && logs.map((log, i) => {
              return (
                <ListItem key={i}>
                  <ListItemText  primary={ `name: ${log.name} || date: ${log.date}`} />
                </ListItem>
              );
            })}
          </List>
        </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Logs;