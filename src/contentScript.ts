import { formatDates } from "./content-scripts/formatDate";

const observer = new MutationObserver((mutations, observer) => {
  if (mutations[0].type === "attributes") {
    formatDates();
  }
});

observer.observe(document, {
  subtree: true,
  attributes: true,
});
