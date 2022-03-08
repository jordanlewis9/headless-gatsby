import React from 'react'
import * as styles from './banner.module.scss';

const Banner = ({ title, description }) => {
  return (
    <section id="banner">
      <h1 className={styles.header}>{title}</h1>
      <p>{description}</p>
    </section>
  )
}

export default Banner
