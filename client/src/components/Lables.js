import React, { useEffect } from 'react';
import Selector from 'react-select';
// import network from '../../services/network';

const ChooseLabels = ({
//   labels,
}) => {
//   useEffect(
//     // gets existing labels
//     () => {
 
//     }, [],
//   );

const lables = ["Money", "porn"]

//   const selectionChange = (choosens) => {
//     setLabels(choosens);
//   };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      borderBottom: '1px dotted black',
      height: '100%',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'neutral30',
    }),
  };
  return (
    <div className="labelFilter">
      <Selector
        value={lables}
        className="selectLabels"
        maxMenuHeight={300}
        placeholder="select labels"
        isMulti
        name="labels"
        // onChange={selectionChange}
        closeMenuOnSelect={false}
        // options={chooseLabels}
        styles={customStyles}
      />
    </div>
  );
};

export default ChooseLabels;
