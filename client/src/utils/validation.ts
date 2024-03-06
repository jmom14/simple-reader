import * as Yup from "yup";

export const loginValidationSchema = () => {
  return Yup.object({
    email: Yup.string()
    .email("Email is not valid")
    .required("Email is required"),
    password: Yup.string().required("Password is required"),
  })
}


export const signupValidationSchema = () => {
  return Yup.object({
    email: Yup.string()
      .email("Email is wrong")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    repeatPassword: Yup.string()
      .required("Repeat password is required")
      .oneOf([Yup.ref("password")], "Passwords must be the same")
  })
}