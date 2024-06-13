import Input from "@mui/joy/Input";
import Autocomplete from "@mui/joy/Autocomplete";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Grid from "@mui/joy/Grid";
import { useState } from "react";

export default function EditClassForm({ formik, teachers }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container columns={1} rowGap={3}>
        <Grid xs={12}>
          <FormControl
            error={formik.touched.className && formik.errors.className}
          >
            <FormLabel>Class Name</FormLabel>
            <Input
              size="lg"
              placeholder="Class Name"
              sx={{ width: 400 }}
              {...formik.getFieldProps("className")}
              required
            />
            {formik.touched.className && formik.errors.className ? (
              <FormHelperText>{formik.errors.className}.</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <FormControl>
            <FormLabel>Select Teacher</FormLabel>
            <Autocomplete
              size="lg"
              placeholder="Select Teacher"
              value={formik.values.selectedTeacher}
              onChange={(event, newValue) => {
                formik.setFieldValue("selectedTeacher", newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              getOptionLabel={(option) => option.username || ""}
              options={teachers}
              sx={{ width: 400 }}
              renderInput={(params) => (
                <Input {...params} required placeholder="Select Teacher" />
              )}
              required
            />
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <Button size="lg" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
