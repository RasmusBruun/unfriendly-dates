import React from "react";

const SWITCH_BUTTON_ACTIVE =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold w-24 p-2 border border-blue-700";
const SWITCH_BUTTON_INACTIVE =
  "bg-white hover:bg-gray-100 text-gray-800 font-semibold w-24 p-2 border border-gray-400 shadow";

export default function SwitchButtonTimeFormat() {
  const [showAmPm, setShowAmPm] = React.useState(true);

  chrome.storage.sync.get(["showAmPm"], function (result) {
    setShowAmPm(result.showAmPm);
  });

  const setStoredShowAmPm = (show: boolean) => {
    setShowAmPm(show);
    chrome.storage.sync.set({ showAmPm: show }, function () {
      window.location.reload();
      chrome.tabs.reload();
    });
  };

  return (
    <span className="my-4">
      <button
        disabled={showAmPm}
        className={
          (showAmPm ? SWITCH_BUTTON_ACTIVE : SWITCH_BUTTON_INACTIVE) +
          " rounded-l"
        }
        onClick={(_) => setStoredShowAmPm(true)}
      >
        12-hour
      </button>
      <button
        disabled={!showAmPm}
        className={
          (!showAmPm ? SWITCH_BUTTON_ACTIVE : SWITCH_BUTTON_INACTIVE) +
          " rounded-r"
        }
        onClick={(_) => setStoredShowAmPm(false)}
      >
        24-hour
      </button>
    </span>
  );
}
