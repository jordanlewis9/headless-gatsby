import React from "react";
import { graphql } from "gatsby";
import Select from "react-select";

import useGravityForm, { ACTION_TYPES } from "../hooks/useGravityForm";

export const MULTI_SELECT_FIELD_FIELDS = graphql`
  fragment MultiSelectFieldFields on WpMultiSelectField {
    id
    label
    description
    cssClass
    isRequired
    choices {
      text
      value
    }
  }
`;

const DEFAULT_VALUE = [];

export default function MultiSelectField({ field, fieldErrors }) {
  const { id, formId, type, label, description, cssClass, isRequired, choices } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue) => fieldValue.id === id);
  const values = fieldValue?.values || DEFAULT_VALUE;
  const options = choices?.map(choice => ({ value: choice?.value, label: choice?.text })) || [];
  const selectedOptions = options.filter(option => values.includes(String(option?.value)));

  function handleChange(value, actionMeta) {
    const values = value.map((option) => option.value);
    dispatch({
      type: ACTION_TYPES.updateMultiSelectFieldValue,
      fieldValue: { id, values },
    });
  }

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId}>{label}</label>
      <Select
        isMulti
        name={String(id)}
        inputId={htmlId}
        required={Boolean(isRequired)}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
      />
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length ? fieldErrors.map(fieldError => (
        <p key={fieldError.id} className="error-message">{fieldError.message}</p>
      )) : null}
    </div>
  );
}
