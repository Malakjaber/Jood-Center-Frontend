const getFields = (data) => {
  const fields = [
    { title: "Name:", data: data.username },
    { title: "Id:", data: data.teacher_id || data.id },
    { title: "Email:", data: data.email },
    { title: "Phone:", data: data.phone },
    { title: "Address:", data: data.address },
  ];
  return fields;
};

export default function ColleagueInformationPage({ data, position }) {
  const fields = getFields(data);

  return (
    <div className="flex justify-around p-16 min-h-[100vh]">
      <div className="flex flex-col">
        <h1 className="text-4xl font-Itim mb-14">{position} Information</h1>
        <div className="h-full mr-8">
          {fields.map((field) => {
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
      </div>
      <div className="flex flex-col">
        <img className="max-h-[700px]" src="/assets/teacher.png" alt="" />
      </div>
    </div>
  );
}
