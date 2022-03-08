import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import './photo.scss';

const Photos = ({ image }) => {
    console.log(image);
    const photo = getImage(image.localFile)
    return (
        <div>
            <GatsbyImage image={photo} alt={image.altText} />
            <iframe src="//headless.local/gfembed/?f=1" width="100%" height="500" frameBorder="0" className="gfiframe"></iframe>
<script src="//headless.local/wp-content/plugins/gravity-forms-iframe/assets/scripts/gfembed.min.js" type="text/javascript"></script>
        </div>
    )
}

export default Photos