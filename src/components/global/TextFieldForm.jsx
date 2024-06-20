import QuillEditor from "./QuillEditor";
import { Button, Option, Select, FormControl, FormLabel } from "@mui/joy";

export default function TextFieldForm({
  value,
  setValue,
  setContent,
  selected,
  onSubmit,
  type,
  options,
}) {
  return (
    <div className="flex min-h-[60vh]">
      <div className="w-full p-10">
        <QuillEditor setContent={setContent} />

        <div className="flex justify-between items-center gap-5 mt-4">
          {type !== "report" && options.length ? (
            <FormControl sx={{ minWidth: "10rem" }}>
              <FormLabel>Choose Class</FormLabel>
              <Select
                size="md"
                defaultValue={value}
                onChange={(event, newValue) => setValue(newValue)}
              >
                {options.map(({ class_id, name }) => (
                  <Option key={class_id} value={class_id}>
                    {name}
                  </Option>
                ))}
              </Select>
            </FormControl>
          ) : (
            ""
          )}

          <Button onClick={onSubmit} sx={{ px: 3, fontSize: "1rem" }}>
            Submit
          </Button>
        </div>
      </div>
      {type === "report" ? (
        <div className="w-[30%] flex flex-col items-center pt-24 bg-gradient-to-b from-primary to-white">
          <img className="w-[150px]" src="/assets/user.png" alt="" />
          <h1 className="font-Itim text-4xl mt-8 px-6 text-center">
            {selected}
          </h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
