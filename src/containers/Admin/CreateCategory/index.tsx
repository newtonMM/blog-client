import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// const apiUrl = process.env.REACT_APP_API_URL;
type values = {
  name: string;
};

const CreateCategory: React.FC = () => {
  const categorySchema = Yup.object().shape({
    name: Yup.string().trim().required("name cannot be blank"),
  });

  const handleSubmit = async (values: values) => {
    // console.log("....", JSON.parse(values.name));
    const data = { name: values.name };
    const response = await fetch("http://localhost:3000/new-category", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("saved");
    } else {
      console.log(response);
    }
  };
  return (
    <div>
      <h1>Create category</h1>
      <div>
        <Formik
          validationSchema={categorySchema}
          initialValues={{
            name: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-start mb-2">
              <label className="font-medium text-blue-700">Name</label>
              <Field
                name="name"
                className="rounded-md border-2 p-2"
                placeholder="e.g fiction"
              />
            </div>

            <button
              className="rounded-md bg-indigo-500 font-medium text-white my-2 p-2"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateCategory;
