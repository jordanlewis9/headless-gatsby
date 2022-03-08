module.exports = () => {
    return `
    image {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(formats: WEBP)
          }
        }
      }
    `
  }