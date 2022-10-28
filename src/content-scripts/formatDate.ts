import { DateFormat, TimeAgoFormat } from "../constants/types";
import {
  getRelativeTimeHtmlElems,
  getTimeAgoHtmlElems,
  getTimeColumnHtmlElems,
} from "./elementQueries";
import { getWidthByDateStyle } from "../components/util";

const unifyDates = (
  html: HTMLElement,
  dateStyle: DateFormat,
  timeAgoFormat: TimeAgoFormat,
  showAmPm: boolean
) => {
  if (html.classList.contains("unfriendly_date")) {
    return html;
  }

  html.classList.add("unfriendly_date");

  const dateTimeObject = new Date(Date.parse(html.title));
  const unfriendlyDate = dateTimeObject.toLocaleString(
    showAmPm ? "en-US" : "en-GB",
    {
      dateStyle: dateStyle,
      timeStyle: dateStyle,
    }
  );

  const unifiedDateElement = document.createElement("span");
  unifiedDateElement.innerHTML =
    (timeAgoFormat === TimeAgoFormat.Before ? " - " : "") +
    unfriendlyDate +
    (timeAgoFormat === TimeAgoFormat.After ? " - " : "");
  html.parentElement?.appendChild(unifiedDateElement);

  html.parentElement?.removeChild(html);
  if (timeAgoFormat === TimeAgoFormat.Before) {
    unifiedDateElement.prepend(html);
  }
  if (timeAgoFormat === TimeAgoFormat.After) {
    unifiedDateElement.appendChild(html);
  }
};

export const formatDates = () => {
  chrome.storage.sync.get(
    ["dateTimeStyle", "timeAgoFormat", "showAmPm"],
    (result) => {
      const dateTimeStyle = result.dateTimeStyle || DateFormat.Short;
      const timeAgoFormat =
        result.timeAgoFormat !== undefined
          ? result.timeAgoFormat
          : TimeAgoFormat.Hide;
      const showAmPm = result.showAmPm !== undefined ? result.showAmPm : false;

      getRelativeTimeHtmlElems().forEach((element) => {
        unifyDates(element, dateTimeStyle, timeAgoFormat, showAmPm);
      });
      getTimeAgoHtmlElems().forEach((element) => {
        unifyDates(element, dateTimeStyle, timeAgoFormat, showAmPm);
      });
      getTimeColumnHtmlElems().forEach((element) => {
        element.style.width = getWidthByDateStyle(dateTimeStyle);
      });
    }
  );
};
