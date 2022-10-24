import React from "react";

export default function ToggleTimeAgo() {
  const [showTimeAgo, setShowTimeAgo] = React.useState(true);

  chrome.storage.sync.get(["showTimeAgo"], function (result) {
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
    <span className="flex my-4 text-sm">
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
  );
}
