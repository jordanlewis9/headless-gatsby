import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import GravityForm from '../../../gravityForms/GravityForm';
// import * as styles from './genericContent.module.scss';

const Form2 = ({ content }) => {
    const data = useStaticQuery(graphql` query {
        wpGfForm(databaseId: { eq: 2 }) {
            databaseId,
            ...GravityFormFields
        }
    }`);

    console.log(data);

    return (
        <section>
            <h1>{data.wpGfForm.title}</h1>
            <GravityForm form={data.wpGfForm} />
        </section>
    )
}

export default Form2;