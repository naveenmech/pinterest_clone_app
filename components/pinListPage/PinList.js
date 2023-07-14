
import React from "react";
import PinItem from "./PinItem";
const PinList = ({ listOfPins }) => {
  console.log(listOfPins);
  return (
    <div className=" px-2 mt-7 columns-3 space-y-6">
      {listOfPins.map((item, index) => (
        <div>
          <PinItem pin={item} key={index} />
        </div>
      ))}
    </div>
  );
};

export default PinList;
