module.exports = () => {
    return `
        carouselImages {
            image {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
            }
        }
    `
  }