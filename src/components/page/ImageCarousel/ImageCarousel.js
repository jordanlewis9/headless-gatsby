import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Image from './Image';

const ImageCarousel = ({ carouselImages }) => {

    const renderCarousel = () => {
        return carouselImages.map(image => {
            return <Image image={image.image} />
        })
    }
    return (
        <Carousel>
            {renderCarousel()}
        </Carousel>
    )
}

export default ImageCarousel;