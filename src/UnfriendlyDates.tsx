import React from "react";
import { DateFormat } from "./constants/types";
import { parseDateFormat } from "./content-scripts/util";

const BUTTON_ACTIVE =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold w-48 py-2 px-4 mb-4 border border-blue-700 rounded";
const BUTTON_INACTIVE =
  "bg-white hover:bg-gray-100 text-gray-800 font-semibold w-48 py-2 px-4 mb-4 border border-gray-400 rounded shadow";

const setStoredDateTimeStyle = (dateStyle: DateFormat) => {
  return (e: React.SyntheticEvent) => {
    e.preventDefault();
    chrome.storage.sync.set(
      { dateTimeStyle: parseDateFormat(dateStyle) },
      function () {
        window.location.reload();
        chrome.tabs.reload();
      }
    );
  };
};

const UnfriendlyDates = () => {
  const [dateTimeStyle, setdateTimeStyle] = React.useState(DateFormat.Short);
  const [showTimeAgo, setShowTimeAgo] = React.useState(true);
  chrome.storage.sync.get(["dateTimeStyle", "showTimeAgo"], function (result) {
    setdateTimeStyle(result.dateTimeStyle);
    setShowTimeAgo(result.showTimeAgo);
  });

  const setStoredShowTimeAgo = () => {
    const newTimeAgo = !showTimeAgo;
    setShowTimeAgo(newTimeAgo);
    chrome.storage.sync.set({ showTimeAgo: newTimeAgo }, function () {
      window.location.reload();
      chrome.tabs.reload();
    });
  };

  return (
    <div className="w-52 h-64 bg-gray-100 shadow">
      <body>
        <div className="flex flex-col justify-between items-center">
          <p className="my-4 text-sm">Please choose a date format</p>
          <button
            className={
              dateTimeStyle === DateFormat.Short
                ? BUTTON_ACTIVE
                : BUTTON_INACTIVE
            }
            onClick={setStoredDateTimeStyle(DateFormat.Short)}
          >
            {new Date().toLocaleString("en-GB", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </button>
          <button
            className={
              dateTimeStyle === DateFormat.Medium
                ? BUTTON_ACTIVE
                : BUTTON_INACTIVE
            }
            onClick={setStoredDateTimeStyle(DateFormat.Medium)}
          >
            {new Date().toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "medium",
            })}
          </button>
          <button
            className={
              dateTimeStyle === DateFormat.Long
                ? BUTTON_ACTIVE
                : BUTTON_INACTIVE
            }
            onClick={setStoredDateTimeStyle(DateFormat.Long)}
          >
            {new Date().toLocaleString("en-GB", {
              dateStyle: "long",
              timeStyle: "long",
            })}
          </button>
          <hr className="w-48 border-2 rounded-sm border-gray-300" />
          <span className="flex mt-4 text-sm">
            <input
              type="checkbox"
              id="showTimeAgo"
              name="showTimeAgo"
              checked={showTimeAgo}
              onChange={setStoredShowTimeAgo}
              className="mr-2"
            />
            Display time ago?
          </span>
        </div>
      </body>
    </div>
  );
};

export default UnfriendlyDates;
