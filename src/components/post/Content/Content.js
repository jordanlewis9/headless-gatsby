import React from 'react';

const Content = ({ content }) => {
    return (
        <article dangerouslySetInnerHTML={{__html: content}}>

        </article>
    )
}

export default Content;