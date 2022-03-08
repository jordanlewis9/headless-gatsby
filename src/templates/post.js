import React from 'react'
import { graphql } from 'gatsby'
import { combineFields } from '../utils/combine-fields'
import Banner from '../components/post/Banner'
import Content from '../components/post/Content';

const NewsTemplate = pageProps => {
  const data = combineFields(pageProps.data.wpPost, 'post')
  console.log(data);
  return (
    <>
      <Banner {...data} />
      <Content {...data} />
    </>
  )
}

export default NewsTemplate

export const query = graphql`
  query PostQuery($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      date(formatString: "MMMM D, YYYY")
      content
    }
  }
`
