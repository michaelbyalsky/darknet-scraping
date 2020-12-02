import React, { useState, useEffect } from "react";
import Select from "react-select";
import api from "../api/index";
// import network from '../../services/network';

const options = [
  { value: "Guns", label: "Guns" },
  { value: "Money", label: "Money" },
];

const ChooseLabels = ({ pastes, setPastes }) => {
  const [lables, setLables] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        if (lables.length === 0 || !lables) {
          return;
        }
        console.log(lables.value);
        const { data } = await api.getPastes(`/pastes/search?search=${lables.value}`);
        console.log("---data-----", pastes);
        setPastes(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [lables]);
  const customStyles = {
    option: (provided) => ({
      ...provided,
      borderBottom: "1px dotted black",
      height: "100%",
      width: "100px",
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
