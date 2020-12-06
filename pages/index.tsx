import React from "react";
import { Box, Card, CardContent } from "@material-ui/core";
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

const sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={initialValues}
          onSubmit={async (values, formikhelpers) => {
            await sleep(3000);
            console.log("values", values);
          }}
        >
          <FormikStep label="Personal Data">
            <Box paddingBottom={2}>
              <Field
                name="firstName"
                component={TextField}
                label="First Name"
                fullWidth
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                name="lastName"
                component={TextField}
                label="Last Name"
                fullWidth
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                name="millionaire"
                component={CheckboxWithLabel}
                Label={{ label: "I am a millionaire" }}
                type="checkbox"
              />
            </Box>
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
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="money"
                type="number"
                component={TextField}
                label="All the money I have"
              />
            </Box>
          </FormikStep>

          <FormikStep label="More Info">
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="description"
                component={TextField}
                label="Description"
              />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}
