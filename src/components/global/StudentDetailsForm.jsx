import { InputLabel } from "@mui/material";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import FormLabel from "@mui/joy/FormLabel";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
export default function StudentDetailsForm({ formik, classes, loading }) {
  return (
    <Stack component={"form"} onSubmit={formik.handleSubmit} spacing={2}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          variant="outlined"
          name="name"
          required
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </FormControl>
      {formik.values.addSt ? (
        <FormControl>
          <FormLabel>Id</FormLabel>
          <Input
            name="st_id"
            required
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.st_id}
            onBlur={formik.handleBlur}
            error={formik.touched.st_id && Boolean(formik.errors.st_id)}
            helperText={formik.touched.st_id && formik.errors.st_id}
          />
        </FormControl>
      ) : null}
      <FormControl>
        <FormLabel>Date of birth</FormLabel>
        <Input
          name="birth_date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          type="date"
          required
          onChange={formik.handleChange}
          value={formik.values.birth_date}
          onBlur={formik.handleBlur}
          error={formik.touched.birth_date && Boolean(formik.errors.birth_date)}
          helperText={formik.touched.birth_date && formik.errors.birth_date}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Pathological case</FormLabel>
        <Input
          name="pathological_case"
          variant="outlined"
          required
          onChange={formik.handleChange}
          value={formik.values.pathological_case}
          onBlur={formik.handleBlur}
          error={
            formik.touched.pathological_case &&
            Boolean(formik.errors.pathological_case)
          }
          helperText={
            formik.touched.pathological_case && formik.errors.pathological_case
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Phone</FormLabel>
        <Input
          name="phone"
          required
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.phone}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && formik.errors.phone}
          helperText={formik.touched.phone && formik.errors.phone}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Address</FormLabel>
        <Input
          name="address"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.address}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Medicines</FormLabel>
        <Input
          name="medicines"
          required
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.medicines}
          onBlur={formik.handleBlur}
          error={formik.touched.medicines && Boolean(formik.errors.medicines)}
          helperText={formik.touched.medicines && formik.errors.medicines}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Parent Id</FormLabel>
        <Input
          name="parent_id"
          required
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.parent_id}
          onBlur={formik.handleBlur}
          error={formik.touched.medicines && Boolean(formik.errors.medicines)}
          helperText={formik.touched.parent_id && formik.errors.parent_id}
        />
      </FormControl>
      {classes[0] ? (
        <FormControl sx={{ mt: 2 }}>
          <InputLabel id="class-select-label">Class</InputLabel>
          <Select
            labelId="class-select-label"
            id="class-select"
            name="class_id"
            onChange={(event, newValue) =>
              formik.setFieldValue("class_id", newValue)
            }
            value={formik.values.class_id}
            onBlur={formik.handleBlur}
            error={formik.touched.class_id && Boolean(formik.errors.class_id)}
            helperText={formik.touched.class_id && formik.errors.class_id}
            label="Class"
          >
            {classes.map(({ class_id: classId, name }) => (
              <Option key={classId} value={classId}>
                {name}
              </Option>
            ))}
          </Select>
        </FormControl>
      ) : (
        <></>
      )}
      <Button sx={{ mt: "1rem", py: "0.7rem" }} type="submit" variant={"solid"}>
        Submit
      </Button>
    </Stack>
  );
}
