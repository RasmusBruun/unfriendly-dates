export const getRelativeTimeHtmlElems = (): HTMLElement[] => {
  return Array.from(document.querySelectorAll("relative-time"));
};

export const getTimeAgoHtmlElems = (): HTMLElement[] => {
  return Array.from(document.querySelectorAll("time-ago"));
};

export const getTimeColumnHtmlElems = (): HTMLElement[] => {
  return Array.from(document.querySelectorAll('[role="gridcell"].text-right'));
};
