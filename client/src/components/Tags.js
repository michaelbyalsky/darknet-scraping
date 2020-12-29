import React from "react";
import "./Tags.css";
import Chip from "@material-ui/core/Chip";

const Tags = ({ tags }) => {
  return (
    <div className="labelsContainer">
      <div className="labels">
        {tags.map((tag, i) => {
          return (
            <div className="label" key={i}>
              <Chip
                classes={{ root: "label" }}
                label={`${Object.keys(tag)} : ${Object.values(tag)}`}
                color="primary"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;
