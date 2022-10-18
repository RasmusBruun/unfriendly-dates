import { DateFormat } from "../constants/types";
import {
  getRelativeTimeHtmlElems,
  getTimeAgoHtmlElems,
  getTimeColumnHtmlElems,
} from "./elementQueries";
import { getWidthByDateStyle } from "./util";

const unifyDates = (html: HTMLElement, dateStyle: DateFormat) => {
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
  unifiedDateElement.innerHTML = unfriendlyDate + " - ";
  html.parentElement?.appendChild(unifiedDateElement);

  html.parentElement?.removeChild(html);
  unifiedDateElement.appendChild(html);
};

export const formatDates = () => {
  chrome.storage.sync.get(["dateTimeStyle"], (result) => {
    const dateTimeStyle = result.dateTimeStyle || DateFormat.Short;
    getRelativeTimeHtmlElems().forEach((element) => {
      unifyDates(element, dateTimeStyle);
    });
    getTimeAgoHtmlElems().forEach((element) => {
      unifyDates(element, dateTimeStyle);
    });
    getTimeColumnHtmlElems().forEach((element) => {
      element.style.width = getWidthByDateStyle(dateTimeStyle);
    });
  });
};
