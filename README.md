# Unfriendly dates

This chrome extension replaces instances of "Friendly dates" on GitHub with a unified date format, which displays both the precise time and the calculated time.

As of this initial version it is possible to choose between three date/time styles: Short, Medium, Long.
These styles utilise the stringified version of the JavaScript built-in [Date object's](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) -> [toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
