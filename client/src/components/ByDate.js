import React, { useState, useEffect } from "react";
import {
    LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";
import api from "../api/index";

const PastesByDate = () => {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const { data } = await api.getPastes(`/pastes/by-day`);
      setSessions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  console.log(sessions);

  return (
    <div>
      <h1 className="header">Pastes by date</h1>

      <div className="chartWrapper">
      <LineChart width={1200} height={250} data={sessions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="sum" fill="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default PastesByDate;
