import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export function FTextField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          variant="standard"
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
