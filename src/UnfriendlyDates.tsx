import React from "react";
import { DateFormat } from "./constants/types";

let dateTimeStyle = DateFormat.Short;

chrome.storage.sync.get(["dateTimeStyle"], function (result) {
  dateTimeStyle = result.dateTimeStyle;
});

const UnfriendlyDates = () => {
  const setDateTimeStyle = (style: DateFormat) => {
    chrome.storage.sync.set({ dateTimeStyle: style }, function () {
      chrome.tabs.reload();
    });
  };
  return (
    <div className="unfriendly__dates">
      <body>
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              dateStyle: { value: string };
            };
            const dateStyle = target.dateStyle.value;
            setDateTimeStyle(parseDateFormat(dateStyle));
          }}
        >
          <select id="dateStyle" defaultValue={dateTimeStyle}>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </body>
    </div>
  );
};

const parseDateFormat = (dateformat: string) => {
  switch (dateformat) {
    case "short":
      return DateFormat.Short;
    case "medium":
      return DateFormat.Medium;
    case "long":
      return DateFormat.Long;
    default:
      return DateFormat.Short;
  }
};

export default UnfriendlyDates;
