import * as yup from "yup";

const phoneRegExp =
  /^(\+?\d{1,4}[-.\s]?)?((\d{10})|(\d{3}[-.\s]\d{3}[-.\s]\d{4}))$/;

export const signUpSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  // role: yup.string().default("parent"),
  id: yup
    .number()
    .required("Parent id is required")
    .transform((value, originalValue) => {
      // Try to convert the value to a number
      const convertedValue = Number(value);
      // Check if the conversion was successful and if the value is a valid number
      if (!isNaN(convertedValue) && Number.isInteger(convertedValue)) {
        return convertedValue;
      }
      // Return an error if the conversion failed or the value is not an integer
      throw new yup.ValidationError(
        "ID must be a valid integer number",
        value,
        "id"
      );
    })
    .min(8, "ID must be at least 8 characters"),
});
export const signInSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const editStudentSchema = yup.object({
  name: yup.string().required("Student name is required"),
  birth_date: yup.string().required("Date of birth is required"),
  medicines: yup.string().required("Medicines are required"),
  phone: yup.string().required("Phone number is required"),
  pathological_case: yup.string().required("Pathological case required"),
  parent_id: yup.string().required("Parent ID is required"),
  class_id: yup.number().required("Class is required"),
});

export const addStudentSchema = yup.object({
  name: yup.string().required("Student name is required"),
  st_id: yup
    .string()
    .required("Student ID is required")
    .min(9, "ID must be at least 9 characters"),
  birth_date: yup.string().required("Date of birth is required"),
  medicines: yup.string().required("Medicines are required"),
  phone: yup.string().required("Phone number is required"),
  pathological_case: yup.string().required("Pathological case required"),
  parent_id: yup.string().required("Parent ID is required"),
  class_id: yup.number().required("Class is required"),
});

export const createClassSchema = yup.object({
  className: yup.string().required("Class Name is required"),
  selectedTeacher: yup.object().nullable().required("Teacher is required"),
});
