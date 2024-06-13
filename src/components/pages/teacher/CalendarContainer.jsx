import React, { useEffect, useState } from "react";
import Calendar from "../../global/Calendar";
import useGetTreatmentPlan from "../../queries/useGetTreatmentPlan.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function CalendarContainer({
  date,
  onCalendarChange,
  classes,
  setTreatmentPlan,
}) {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState(classes[0].class_id);

  const { treatment } = useGetTreatmentPlan(selectedClass, user?.userId, date);

  useEffect(() => {
    setTreatmentPlan(treatment);
  }, [setTreatmentPlan, treatment]);

  return (
    <>
      {classes[0] ? (
        <Calendar
          onCalendarChange={onCalendarChange}
          image={"teacher-calendar.png"}
          date={date}
          type={"treatment"}
          classes={classes}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
      ) : (
        ""
      )}
    </>
  );
}
