import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectingDate } from "../store/slices/plannerSlice";

const Calendar = () => {
  //   const [selectDate, setSelectDate] = React.useState(new Date());
  const { selectDate } = useSelector((state) => state.planner);
  console.log(typeof selectDate);
  console.log(selectDate);
  const dispatch = useDispatch();
  const handleChange = (date) => {
    dispatch(selectingDate(date));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        sx={{
          backgroundColor: "#FFFFFFBF",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
        orientation="portrait"
        openTo="day"
        value={selectDate}
        onChange={handleChange}
        textField={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
