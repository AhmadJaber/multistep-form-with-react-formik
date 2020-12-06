import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { object, mixed, number } from "yup";
import { FieldInfo } from "../src/constants/FieldInfo";
import { FormikStepper, FormikStep } from "../src/components";

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
        <FormikStepper initialValues={initialValues} onSubmit={() => {}}>
          <FormikStep label="Personal Data">
            <Field name="firstName" component={TextField} label="First Name" />
            <Field name="lastName" component={TextField} label="Last Name" />
            <Field
              name="millionaire"
              component={CheckboxWithLabel}
              Label={{ label: "I am a millionaire" }}
              type="checkbox"
            />
          </FormikStep>

          <FormikStep
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
            label="Money Amount"
          >
            <Field
              name="money"
              type="number"
              component={TextField}
              label="All the money I have"
            />
          </FormikStep>

          <FormikStep label="More Info">
            <Field
              name="description"
              component={TextField}
              label="Description"
            />
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}
