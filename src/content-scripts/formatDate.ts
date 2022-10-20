import { DateFormat } from "../constants/types";
import {
  getRelativeTimeHtmlElems,
  getTimeAgoHtmlElems,
  getTimeColumnHtmlElems,
} from "./elementQueries";
import { getWidthByDateStyle } from "./util";

const unifyDates = (
  html: HTMLElement,
  dateStyle: DateFormat,
  showTimeAgo: boolean
) => {
  if (html.classList.contains("unfriendly_date")) {
    return html;
  }

  html.classList.add("unfriendly_date");

  const dateTimeObject = new Date(Date.parse(html.title));
  const unfriendlyDate = dateTimeObject.toLocaleString("en-GB", {
    dateStyle: dateStyle,
    timeStyle: dateStyle,
  });

  const unifiedDateElement = document.createElement("span");
  unifiedDateElement.innerHTML = showTimeAgo
    ? unfriendlyDate + " - "
    : unfriendlyDate;
  html.parentElement?.appendChild(unifiedDateElement);

  html.parentElement?.removeChild(html);
  if (showTimeAgo) {
    unifiedDateElement.appendChild(html);
  }
};

export const formatDates = () => {
  chrome.storage.sync.get(["dateTimeStyle", "showTimeAgo"], (result) => {
    console.log(result);
    const dateTimeStyle = result.dateTimeStyle || DateFormat.Short;
    const showTimeAgo =
      result.showTimeAgo !== undefined ? result.showTimeAgo : false;
    getRelativeTimeHtmlElems().forEach((element) => {
      unifyDates(element, dateTimeStyle, showTimeAgo);
    });
    getTimeAgoHtmlElems().forEach((element) => {
      unifyDates(element, dateTimeStyle, showTimeAgo);
    });
    getTimeColumnHtmlElems().forEach((element) => {
      element.style.width = getWidthByDateStyle(dateTimeStyle);
    });
  });
};
