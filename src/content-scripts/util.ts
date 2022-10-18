import { DateFormat } from "../constants/types";

export const getWidthByDateStyle = (dateStyle: DateFormat): string => {
  switch (dateStyle) {
    case DateFormat.Short:
      return "250px";
    case DateFormat.Medium:
      return "300px";
    case DateFormat.Long:
      return "350px";
  }
};
