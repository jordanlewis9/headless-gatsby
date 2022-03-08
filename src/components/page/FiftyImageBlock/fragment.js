module.exports = () => {
    return `
    headingTag
    heading
    content
    image {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(formats: WEBP)
          }
        }
      }
    `
};