import React from "react";
import { withFormik, Form, Field } from "formik";

import * as Yup from "yup";

import axios from "axios";
import { BASE_URL } from "../../../utils/baseURL";

import states from "./states";

//styles
import { FormContainer } from "../../styled-components/form";
import * as styled from "../../styled-components/general";

const formStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const segmentWrapper = {
  width: "50%",
  display: "flex",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
};

const formSegment = {
  width: "320px%",
};

const inputStyle = {
  width: "20rem",
  height: "2.5rem",
  fontSize: "1.5rem",
  marginBottom: "1.2rem",
};

const pStyle = {
  fontSize: "1.3rem",
  color: "red",
};
function Register({ touched, errors, status }) {
  return (
    <FormContainer>
      <Form style={formStyle}>
        <div style={segmentWrapper}>
          <div style={formSegment}>
            <p style={pStyle}>{touched.email && errors.email}</p>
            <Field
              placeholder="Enter your email"
              name="email"
              type="email"
              style={inputStyle}
            />
            <p style={pStyle}>{touched.user_name && errors.user_name}</p>
            <Field
              placeholder="Enter your username"
              name="user_name"
              type="text"
              style={inputStyle}
            />
            <p style={pStyle}>{touched.password && errors.password}</p>
            <Field
              placeholder="Password"
              name="password"
              type="password"
              style={inputStyle}
            />
          </div>
          <div style={formSegment}>
            <p style={pStyle}>{touched.street && errors.street}</p>
            <Field
              placeholder="street"
              name="street"
              type="text"
              style={inputStyle}
            />
            <p style={pStyle}>{touched.apartment && errors.apartment}</p>
            <Field
              placeholder="apartment"
              name="apartment"
              type="text"
              style={inputStyle}
            />
            <p style={pStyle}>{touched.city && errors.city}</p>
            <Field
              placeholder="city"
              name="city"
              type="text"
              style={inputStyle}
            />
            <p style={pStyle}>{touched.state && errors.state}</p>
            <Field
              placeholder="state"
              name="state"
              component="select"
              style={inputStyle}
            >
              {states.map((state) => {
                return <option value={state[0]}>{state[1]}</option>;
              })}
            </Field>
            <p style={pStyle}>{touched.zip && errors.zip}</p>
            <Field
              placeholder="zipcode"
              name="zip"
              type="text"
              style={inputStyle}
            />
          </div>
        </div>
        <div>
          <br />
          <styled.Button type="submit" w={"10rem"} h={"3rem"}>
            Register
          </styled.Button>
          {status && (
            <h3 style={{ color: "red" }}>
              Please try again, error during signup
            </h3>
          )}
        </div>
      </Form>
    </FormContainer>
  );
}

const FormikRegister = withFormik({
  mapPropsToValues({
    email,
    user_name,
    password,
    street,
    apartment,
    city,
    state,
    zip,
  }) {
    return {
      email: email || "",
      user_name: user_name || "",
      password: password || "",
      street: street || "",
      apartment: apartment || "",
      city: city || "",
      state: state || "",
      zip: zip || "",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required("Email required "),
    user_name: Yup.string()
      .min(6, "Minumum 6 characters")
      .required("Username required"),
    password: Yup.string()
      .min(6, "Minumum 6 characters")
      .required("Password required"),
    street: Yup.string().required("Street required"),
    apartment: Yup.string(),
    city: Yup.string().required("City required "),
    state: Yup.string(),
    zip: Yup.string().matches(/^[0-9]{5}$/, "Must be 5 digit Zip"),
  }),

  handleSubmit(values, props) {
    console.log(values);
    console.log(props);
    const url = `${BASE_URL}/api/user/register`;
    axios
      .post(url, values)
      .then((res) => {
        console.log(res);
        props.props.history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        props.setStatus(error);
      });
    props.props.history.push("/login");
  },
})(Register);

export default FormikRegister;
