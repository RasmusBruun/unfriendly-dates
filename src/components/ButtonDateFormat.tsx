import React from "react";
import { DateFormat } from "../constants/types";
import { parseDateFormat } from "./util";

const BUTTON_ACTIVE =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold w-48 p-2 mb-4 border border-blue-700 rounded";
const BUTTON_INACTIVE =
  "bg-white hover:bg-gray-100 text-gray-800 font-semibold w-48 p-2 mb-4 border border-gray-400 rounded shadow";

type DateFormatButtonType = {
  dateFormat: DateFormat;
};

export default function DateFormatButton({ dateFormat }: DateFormatButtonType) {
  const [dateTimeStyle, setdateTimeStyle] = React.useState(DateFormat.Short);
  const [showAmPm, setShowAmPm] = React.useState(DateFormat.Short);

  chrome.storage.sync.get(["dateTimeStyle", "showAmPm"], function (result) {
    setdateTimeStyle(result.dateTimeStyle);
    setShowAmPm(result.showAmPm);
  });

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

  return (
    <button
      className={dateTimeStyle === dateFormat ? BUTTON_ACTIVE : BUTTON_INACTIVE}
      onClick={setStoredDateTimeStyle(dateFormat)}
    >
      {new Date().toLocaleString(showAmPm ? "en-US" : "en-GB", {
        dateStyle: dateFormat,
        timeStyle: dateFormat,
      })}
    </button>
  );
}
