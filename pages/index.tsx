import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { object, mixed, number } from "yup";
import { FieldInfo } from "../src/FieldInfo";

const initialValues: FieldInfo = {
  firstName: "",
  lastName: "",
  millionaire: false,
  money: 0,
  description: "",
};

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik
          validationSchema={object({
            money: mixed().when("millionaire", {
              is: true,
              then: number()
                .required()
                .min(
                  1_000_000,
                  "As you said u are a millionaire, u need to have 1milllion"
                ),
              otherwise: number().required(),
            }),
          })}
          initialValues={initialValues}
          onSubmit={() => {}}
        >
          <Form>
            <Field name="firstName" component={TextField} label="First Name" />
            <Field name="lastName" component={TextField} label="Last Name" />
            <Field
              name="millionaire"
              component={CheckboxWithLabel}
              Label={{ label: "I am a millionaire" }}
              type="checkbox"
            />
            <Field
              name="money"
              type="number"
              component={TextField}
              label="All the money I have"
            />
            <Field
              name="description"
              component={TextField}
              label="Description"
            />
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
}
