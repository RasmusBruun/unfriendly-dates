import DateFormatButton from "./components/ButtonDateFormat";
import Divider from "./components/Divider";
import TimeFormatButton from "./components/ButtonTimeFormat";
import ToggleTimeAgo from "./components/ToggleTimeAgo";
import { DateFormat } from "./constants/types";

const UnfriendlyDates = () => {
  return (
    <div className="w-52 h-80 bg-gray-100 shadow">
      <body>
        <div className="flex flex-col justify-between items-center">
          <p className="my-4 text-sm">Please choose a date format</p>
          <DateFormatButton dateFormat={DateFormat.Short} />
          <DateFormatButton dateFormat={DateFormat.Medium} />
          <DateFormatButton dateFormat={DateFormat.Long} />
          <Divider />
          <TimeFormatButton />
          <Divider />
          <ToggleTimeAgo />
        </div>
      </body>
    </div>
  );
};

export default UnfriendlyDates;
