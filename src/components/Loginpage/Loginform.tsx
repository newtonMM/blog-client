import React, { useContext } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const Loginform: React.FC = () => {
  const { setToken } = useContext(AuthContext);
  const loginSchema = Yup.object().shape({
    name: Yup.string().trim().required("Please enter a valid username"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum."),
  });
  const navigate = useNavigate();

  const loginHandler = async (values: FormikValues) => {
    const data = { username: values.name, password: values.password };
    console.log(values);
    console.log(data);
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      const serverData = await response.json();
      const { token, expirationTime } = serverData;
      setToken(token, expirationTime);
      navigate("/admin");
    } else {
      console.log(response);
    }
  };

  return (
    <div className="shadow-sm px-4 mt-4">
      <Formik
        validationSchema={loginSchema}
        initialValues={{
          name: "",
          password: "",
        }}
        onSubmit={loginHandler}
      >
        <Form className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-start mb-2">
            <label className="font-medium text-blue-700">Username</label>
            <Field
              name="name"
              className="rounded-md border-2 p-2"
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col items-start mb-2">
            <label className="font-medium text-blue-700">Password</label>
            <Field
              type="password"
              name="password"
              className="rounded-md border-2 p-2"
              placeholder="password"
            />
          </div>

          <button
            className="rounded-md bg-indigo-500 font-medium text-white my-2 p-2"
            type="submit"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Loginform;
