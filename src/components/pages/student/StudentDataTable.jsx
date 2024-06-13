export default function StudentDataTable({ studentData }) {
  const array = [
    { title: "Name:", data: studentData.name },
    { title: "Id:", data: studentData.st_id },
    { title: "Birth Date:", data: studentData.birth_date },
    { title: "Pathological case:", data: studentData.pathological_case },
    { title: "Phone:", data: studentData.phone },
    { title: "Address:", data: studentData.address },
    {
      title: "Medicines:",
      data: studentData.medicines,
    },
  ];

  return (
    <div className="h-full mr-8">
      {array.map((field) => {
        return (
          <div
            key={field.title}
            className="flex border-b border-b-lightgray my-5 p-5"
          >
            <p className=" text-gray text-2xl mr-3">{field.title}</p>
            <p className=" text-2xl overflow-hidden">{field.data}</p>
          </div>
        );
      })}
    </div>
  );
}
