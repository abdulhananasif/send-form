import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const Form = () => {
  const schema = yup.object().shape({
    fullName: yup
      .string("Full name must be a string")
      .required("Full name is required!"),
    email: yup
      .string("Email must be a string!")
      .email("Email must be a valid email!")
      .required("Email is required!"),
    phoneNumber: yup
      .string("Phone number must be a string!")
      .required("Phone number is required!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    try {
      axios.post("any url from server", data);
    } catch (err) {
      alert(
        "There is an error while submitting the form!. Please open console to see the error."
      );
      console.log({ err });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Full Name</label>
      <input {...register("fullName")} />
      <p style={{ color: "red" }}>{errors.fullName?.message}</p>
      <label>Email</label>
      <input {...register("email")} />
      <p style={{ color: "red" }}>{errors.email?.message}</p>
      <label>Phone Number</label>
      <input {...register("phoneNumber")} />
      <p style={{ color: "red" }}>{errors.phoneNumber?.message}</p>
      <input type="submit" />
    </form>
  );
};

export default Form;
