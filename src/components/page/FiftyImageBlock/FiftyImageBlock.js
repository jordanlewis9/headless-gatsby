import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from './FiftyImageBlock.module.scss';

const FiftyImageBlock = ({ headingTag, heading, content, image }) => {
    const renderedImage = getImage(image.localFile);
    console.log(headingTag);
    console.log(heading);

    // const renderHeading = () => {
    //     return (
    //         <{headingTag}>
    //             {heading}
    //         </{headingTag}>
    //     );
    // }

    let header = React.createElement(
        headingTag,
        { className: styles.heading},
        heading
    )

    return (
        <section className={styles.sectionContainer}>
            <div className={styles.contentContainer}>
                {header}
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
            <div className={styles.imageContainer}>
                <GatsbyImage className={styles.image} image={renderedImage} alt={image.altText} />
            </div>
        </section>
    )
}

export default FiftyImageBlock;