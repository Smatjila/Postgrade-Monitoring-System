import { useState } from 'react';
import { DayPicker, Row } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { endOfWeek, isWithinInterval, startOfWeek } from 'date-fns';
import "react-day-picker/dist/style.css";

function CurrentWeekRow(props) {
    const isDateInCurrentWeek = (dateToCheck) => {
        const today = new Date();
        const start = startOfWeek(today);
        const end = endOfWeek(today);
        return isWithinInterval(dateToCheck, { start, end });
    };
    const isNotCurrentWeek = props.dates.every((date) => !isDateInCurrentWeek(date));
    if (isNotCurrentWeek) return <></>;
    return <Row {...props} />;
}

function MyDatePicker() {
  const [selected, setSelected] = useState(new Date());
  return (
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        numberOfMonths={1}
        // components={{ Row: CurrentWeekRow }}
        // showOutsideDays
        disableNavigation= {true}
        style={{ display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center'
        }}
      />
  );
}



export default MyDatePicker;
