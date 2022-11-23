# Unfriendly dates

This chrome extension replaces instances of "Friendly dates" on GitHub with a unified date format, which displays both the precise time and the calculated time.

As of this initial version it is possible to choose between three date/time styles: Short, Medium, Long.
It's also possible to toggle between the AM/PM (12-hour) and 24-hour formats.
These styles utilise the stringified version of the JavaScript built-in [Date object's](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) -> [toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).

Lastly the friendly date (time ago) format, which is appended to the date, can be toggled on/off.

## Local installation

In a terminal:
1. Clone this repository
2. Run `npm run build`
3. If that fails try running `npm run build`

In Chrome:
1. Go to chrome://extensions/
2. Enable Developer mode (top right corner)
3. Click `Load unpacked`
4. Choose the `/build` folder, resulting from `npm run build`
