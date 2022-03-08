import React from 'react';
import { Link } from 'gatsby';
import * as styles from './foodList.module.scss';

const FoodList = ({ foodList }) => {
    console.log(foodList);
    return (
        <ul className={styles.foodListUl}>
            {foodList.map(({ food }) => (
                <li className={styles.foodListItem} key={food.title}><Link to={food.url} title={food.title} target={food.target}>{food.title}</Link></li>
            ))}
        </ul>
    )
}

export default FoodList;