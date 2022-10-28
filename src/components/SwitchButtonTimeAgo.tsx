import React from "react";
import { TimeAgoFormat } from "../constants/types";

const SWITCH_BUTTON_ACTIVE =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold w-16 p-2 border border-blue-700";
const SWITCH_BUTTON_INACTIVE =
  "bg-white hover:bg-gray-100 text-gray-800 font-semibold w-16 p-2 border border-gray-400 shadow";

export default function SwitchButtonTimeAgo() {
  const [timeAgoFormat, setTimeAgoFormat] = React.useState(TimeAgoFormat.Hide);

  chrome.storage.sync.get(["timeAgoFormat"], function (result) {
    setTimeAgoFormat(result.timeAgoFormat);
  });

  const setStoredTimeAgoFormat = (newTimeAgo: TimeAgoFormat) => {
    setTimeAgoFormat(newTimeAgo);
    chrome.storage.sync.set({ timeAgoFormat: newTimeAgo }, function () {
      window.location.reload();
      chrome.tabs.reload();
    });
  };

  return (
    <span className="my-4">
      <button
        disabled={timeAgoFormat === TimeAgoFormat.Before}
        className={
          (timeAgoFormat === TimeAgoFormat.Before
            ? SWITCH_BUTTON_ACTIVE
            : SWITCH_BUTTON_INACTIVE) + " rounded-l"
        }
        onClick={(_) => setStoredTimeAgoFormat(TimeAgoFormat.Before)}
      >
        Before
      </button>
      <button
        disabled={timeAgoFormat === TimeAgoFormat.Hide}
        className={
          timeAgoFormat === TimeAgoFormat.Hide
            ? SWITCH_BUTTON_ACTIVE
            : SWITCH_BUTTON_INACTIVE
        }
        onClick={(_) => setStoredTimeAgoFormat(TimeAgoFormat.Hide)}
      >
        Hide
      </button>
      <button
        disabled={timeAgoFormat === TimeAgoFormat.After}
        className={
          (timeAgoFormat === TimeAgoFormat.After
            ? SWITCH_BUTTON_ACTIVE
            : SWITCH_BUTTON_INACTIVE) + " rounded-r"
        }
        onClick={(_) => setStoredTimeAgoFormat(TimeAgoFormat.After)}
      >
        After
      </button>
    </span>
  );
}
