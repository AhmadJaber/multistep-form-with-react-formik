import { FormikConfig, FormikValues } from "formik";
import React from "react";

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export default function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}
