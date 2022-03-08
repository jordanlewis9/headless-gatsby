import React from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import GravityForm from '../../../gravityForms/GravityForm';
import * as styles from './genericContent.module.scss';

const GenericContent = ({ content }) => {
  const data = useStaticQuery(graphql` query {
  wpGfForm(databaseId: { eq: 1 }) {
    databaseId,
    ...GravityFormFields
  }
}`);

  // pageContext = gravityFormId;

  console.log(data);
  return (
    <section id="generic-content">
      <div dangerouslySetInnerHTML={{__html: content}} className={styles.bannerHeader}></div>
      <h1>{data.wpGfForm.title}</h1>
      <GravityForm form={data.wpGfForm} />
    </section>
  )
}

// export const query = graphql`query {
//   wpGfForm(databaseId: { eq: 1 }) {
//     ...GravityFormFields
//   }
// }`

export default GenericContent
