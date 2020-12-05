import React, { useState, useEffect } from "react";
import Select from "react-select";
import api from "../api/index";
import moment from 'moment'
// import network from '../../services/network';

// const options = [
//   { value: "Guns", label: "Guns" },
//   { value: "Money", label: "Money" },
//   { value: "All", label: "All" },
// ];

const ChooseLabels = ({lables, setLables, pastes, setPastes, options, setOptions }) => {


  useEffect(() => {
    (async () => {
      try {
        if (lables.length === 0 || !lables) {
          return;
        }
        if (lables.value === "All") {
          const { data: allPastes } = await api.getPastes(`/pastes`);
          const allFiltered = allPastes.sort((a, b) => {
            console.log(moment(b.Date).toDate())
            return new Date(b.Date) - new Date(a.Date);
          });
          return setPastes(allFiltered);
        }
        const { data: filtered } = await api.getPastes(
          `/pastes/search?search=${lables.value}`
        );
        const allFiltered = filtered.sort((a, b) => {
            return new Date(b.Date) - new Date(a.Date);
          });
        setPastes(allFiltered);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [lables]);
  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: "white",
      backgroundColor: "blue",
      borderBottom: "1px dotted black",
      height: "100%",
      width: "100%",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "neutral30",
    }),
  };
  return (
    <div className="labelFilter">
      <Select
        value={lables}
        className="selectLabels"
        maxMenuHeight={300}
        placeholder="select labels"
        name="labels"
        onChange={(choosens) => setLables(choosens)}
        closeMenuOnSelect={false}
        options={options}
        styles={customStyles}
      />
    </div>
  );
};

export default ChooseLabels;
