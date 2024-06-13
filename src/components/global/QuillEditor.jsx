import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function QuillEditor({ setContent }) {
  const [value, setValue] = useState("");

  const handleOnChange = (content, delta, source) => {
    if (source === "user") {
      setValue(content); // Get plain text
      setContent(
        quillEditorRef.current.editor.getText().replace(/\r?\n|\r/g, "")
      );
    }
  };

  const quillEditorRef = React.createRef();

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleOnChange}
      ref={quillEditorRef}
    />
  );
}
