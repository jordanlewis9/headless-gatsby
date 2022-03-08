import React from 'react';
import { Link } from 'gatsby';
import * as styles from './subItem.module.scss';

const SubItem = (props) => {
    if (props.childItems) {
        if (props.childItems.nodes.length === 0) {
            return (
                <li key={props.id}><Link to={props.path} title={props.label} target={props.target}>{props.label}</Link></li>
            )
        } else {
            let subMenus = [];
            for (let i = 0; i < props.childItems.nodes.length; i++) {
                const { path, label, target, childItems, id } = props.childItems.nodes[i];
                if (props.subMenuLink.includes(path)) {
                    subMenus.push(<SubItem path={path} key={id} label={label} target={target} childItems={childItems}></SubItem>)
                } else {
                    props.setSubMenuLink([...props.subMenuLink, path])
                    subMenus.push(<SubItem path={path} key={id} label={label} target={target} childItems={childItems}></SubItem>)
                }
            }
            let renderedItem = <li className={styles.hasSubMenu}><Link to={props.path} target={props.target} title={props.label}>{props.label}</Link><ul className={styles.subMenu}>{subMenus}</ul></li>;
            return renderedItem;
        }
    } else {
        return (
            <li><Link to={props.path} title={props.label} target={props.target}>{props.label}ffffffffff</Link></li>
        )
    }
}

export default SubItem;