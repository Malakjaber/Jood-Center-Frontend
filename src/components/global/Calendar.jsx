import { FormControl, FormLabel, Option, Select } from "@mui/joy";
import { Calendar as PrimeCalendar } from "primereact/calendar";
import { useEffect } from "react";

export default function Calendar({
  onCalendarChange,
  date,
  image,
  type,
  classes,
  selectedClass,
  setSelectedClass,
}) {

  return (
    <div
      id="calendar"
      className="calendar min-h-[100vh] flex justify-around mb-32"
    >
      <div className="mt-20 mr-4 max-w-[600px] flex flex-col">
        <div className="border-[3px] mb-14 rounded-lg">
          <p className="font-Itim text-2xl p-4">
            {type === "treatment"
              ? `You can choose from the calendar the date of  treatment
            plans that you want to review.`
              : `You can choose from the calendar the date of report
                that you want to review.`}
          </p>
        </div>
        <div className="self-center">
          {type === "treatment" ? (
            <FormControl sx={{ minWidth: "10rem", mb: "1rem" }}>
              <FormLabel>Choose Class</FormLabel>
              <Select
                size="md"
                defaultValue={selectedClass}
                onChange={(event, newValue) => setSelectedClass(newValue)}
              >
                {classes.map(({ class_id, name }) => (
                  <Option key={class_id} value={class_id}>
                    {name}
                  </Option>
                ))}
              </Select>
            </FormControl>
          ) : (
            ""
          )}

          <PrimeCalendar
            onChange={onCalendarChange}
            value={date}
            inline
            showWeek
          />
        </div>
      </div>
      <div className="my-8">
        <img src={`/assets/calendar/${image}`} alt="" />
      </div>
    </div>
  );
}
