import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";
import api from "../api/index";

const PastesByName = () => {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const { data } = await api.getPastes(`/pastes/ner`);
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
      <h1 className="header">Pastes by ner analysies</h1>

      <div className="chartWrapper">
      <BarChart width={900} height={250} data={sessions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sum" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default PastesByName;
