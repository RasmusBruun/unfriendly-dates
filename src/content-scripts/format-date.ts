import { DateFormat } from "../constants/types";

function getRelativeTimeHtmlElems(): HTMLElement[] {
  return Array.from(document.querySelectorAll("relative-time"));
}

function getTimeAgoHtmlElems(): HTMLElement[] {
  return Array.from(document.querySelectorAll("time-ago"));
}

function unifyDates(html: HTMLElement, dateStyle: DateFormat) {
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
}

function main() {
  chrome.storage.sync.get(["dateTimeStyle"], function (result) {
    const dateTimeStyle = result.dateTimeStyle || DateFormat.Short;
    getRelativeTimeHtmlElems().forEach((element) => {
      unifyDates(element, dateTimeStyle);
    });
    getTimeAgoHtmlElems().forEach((element) => {
      unifyDates(element, dateTimeStyle);
    });
  });
}

const observer = new MutationObserver((mutations, observer) => {
  if (mutations[0].type === "attributes") {
    main();
  }
});

observer.observe(document, {
  subtree: true,
  attributes: true,
});
