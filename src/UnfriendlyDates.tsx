import DateFormatButton from "./components/ButtonDateFormat";
import Divider from "./components/Divider";
import SwitchButtonTimeFormat from "./components/SwitchButtonTimeFormat";
import SwitchButtonTimeAgo from "./components/SwitchButtonTimeAgo";
import { DateFormat } from "./constants/types";

const UnfriendlyDates = () => {
  return (
    <div className="w-52 h-92 bg-gray-100 shadow">
      <body>
        <div className="flex flex-col justify-between items-center">
          <p className="my-4 text-sm">Please choose a date format</p>
          <DateFormatButton dateFormat={DateFormat.Short} />
          <DateFormatButton dateFormat={DateFormat.Medium} />
          <DateFormatButton dateFormat={DateFormat.Long} />
          <Divider />
          <SwitchButtonTimeFormat />
          <Divider />
          <p className="mt-4 text-sm">Show time ago?</p>
          <SwitchButtonTimeAgo />
        </div>
      </body>
    </div>
  );
};

export default UnfriendlyDates;
