import React from 'react';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';

const Image = (props) => {
    console.log(props.image);
    const photo = getImage(props.image.localFile);

    return (
        <div>
            <GatsbyImage image={photo} alt={props.image.alt} />
        </div>
    )
}

export default Image;