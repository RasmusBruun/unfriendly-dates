import React from "react";
import "./App.css";
import { DateFormat } from "./constants/types";

let dateTimeStyle = DateFormat.Short;

chrome.storage.sync.get(["dateTimeStyle"], function (result) {
  dateTimeStyle = result.dateTimeStyle;
  console.log(result);
});

function App() {
  const setDateTimeStyle = (style: DateFormat) => {
    chrome.storage.sync.set({ dateTimeStyle: style }, function () {
      console.log("Value is set to " + style);
    });
  };
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

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

export default App;
