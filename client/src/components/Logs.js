import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import api from "../api/index"; 
import { List, ListItem, ListItemText } from "@material-ui/core";

const columns = [
  { field: "id", headerName: "Mongo Id", width: 130 },
  { field: "_id", headerName: "Mongo Id", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "new_pastes", headerName: "New Pastes", width: 130 },
  { field: "date", headerName: "Date", width: 180 },

];

const Logs = () => {
  const [logs, setLogs] = useState([]);
 

  const fetchLogs = async () => {
    try {
      const { data } = await api.getPastes(`http://localhost:5000/api/v1/logs`);
      
      const maped = data.map((log, i) => {
          return {
              id: i + 1,
              _id: log._id,
              status: log.status,
              new_pastes: log.new_pastes,
              date: log.date
          }
      })
      const sorted = maped.sort((a,b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
      setLogs(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
    <DataGrid  id={Math.random()} rows={logs} columns={columns} pageSize={5} checkboxSelection />
  </div>
  );
};

export default Logs;
