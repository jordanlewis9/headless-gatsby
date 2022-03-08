import React from "react";

import { GravityFormProvider } from "./hooks/useGravityForm";
import GravityFormsForm from "./GravityFormsForm";


export default function GravityForm(props) {
  return (
    <GravityFormProvider>
      <GravityFormsForm {...props} />
    </GravityFormProvider>
  );
}
