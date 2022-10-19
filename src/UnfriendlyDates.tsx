import React from "react";
import { DateFormat } from "./constants/types";
import { parseDateFormat } from "./content-scripts/util";

let dateTimeStyle = DateFormat.Short;

chrome.storage.sync.get(["dateTimeStyle"], function (result) {
  dateTimeStyle = result.dateTimeStyle;
});

const ACTIVE =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold w-48 py-2 px-4 mb-4 border border-blue-700 rounded";
const INACTIVE =
  "bg-white hover:bg-gray-100 text-gray-800 font-semibold w-48 py-2 px-4 mb-4 border border-gray-400 rounded shadow";

const setDateTimeStyle = (style: DateFormat) => {
  chrome.storage.sync.set({ dateTimeStyle: style }, function () {
    window.location.reload();
    chrome.tabs.reload();
  });
};

const handleClick = (dateStyle: DateFormat) => {
  return (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDateTimeStyle(parseDateFormat(dateStyle));
  };
};

const UnfriendlyDates = () => {
  return (
    <div className="w-52 h-52 bg-gray-100 shadow">
      <body>
        <div className="flex flex-col justify-between items-center">
          <p className="my-4">Please choose a date format:</p>
          <button
            className={dateTimeStyle === DateFormat.Short ? ACTIVE : INACTIVE}
            onClick={handleClick(DateFormat.Short)}
          >
            {new Date().toLocaleString("en-GB", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </button>
          <button
            className={dateTimeStyle === DateFormat.Medium ? ACTIVE : INACTIVE}
            onClick={handleClick(DateFormat.Medium)}
          >
            {new Date().toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "medium",
            })}
          </button>
          <button
            className={dateTimeStyle === DateFormat.Long ? ACTIVE : INACTIVE}
            onClick={handleClick(DateFormat.Long)}
          >
            {new Date().toLocaleString("en-GB", {
              dateStyle: "long",
              timeStyle: "long",
            })}
          </button>
        </div>
      </body>
    </div>
  );
};

export default UnfriendlyDates;
