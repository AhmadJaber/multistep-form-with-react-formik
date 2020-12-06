import React, { Children, useState } from "react";
import { FormikConfig, FormikValues, Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import { FormikStepProps } from "./FormikStep";

export default function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  console.log("childreen:", currentChild.props);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, formikHelpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, formikHelpers);
        } else {
          setStep((s) => s + 1);
          // !something to try
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          {currentChild}

          {step > 0 ? (
            <Button variant="contained" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
