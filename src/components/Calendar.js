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
          transform: "translateY(-5px)",
          boxShadow: "0 0 8px 5px #00000015",
          transitionDuration: "0.3s",
          borderRadius: 18,
          p: 5,
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
