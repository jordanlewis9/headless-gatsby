import React, { useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import SubItem from './SubItem';
import * as styles from './navmenu.module.scss';

const NavMenu = () => {
    const [subMenuLink, setSubMenuLink] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const data = useStaticQuery(graphql`query {
        wpMenu(name: {eq: "Primary"}) {
            menuItems {
              nodes {
                label
                target
                id
                path
                childItems {
                  nodes {
                    path
                    label
                    target
                    id
                    childItems {
                      nodes {
                        path
                        label
                        target
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }`);
      const nodes = data.wpMenu.menuItems.nodes;

      const handleShowSubMenu = (e) => {
          if (window.innerWidth > 768) {
              return;
          }
          if (showSubMenu === false) {
              e.preventDefault();
              setShowSubMenu(true);
          }
      }

      const renderMenu = () => {
          let menuToRender = nodes.map(item => {
            console.log(item);
            if (subMenuLink.includes(item.path)) {
                return null;
            }
            if (item.childItems.nodes.length === 0) {
                return (
                    <li key={item.id} className={styles.listItem}><Link className={styles.listLink} to={item.path} target={item.target} title={item.label}>{item.label}</Link></li>
                )
            } else {
                let subMenus = [];
                for (let i = 0; i < item.childItems.nodes.length; i++) {
                    const { path, label, target, childItems, id } = item.childItems.nodes[i];
                    if (subMenuLink.includes(path)) {
                        subMenus.push(<SubItem setSubMenuLink={setSubMenuLink} subMenuLink={subMenuLink} key={id} id={id} path={path} label={label} target={target} childItems={childItems}></SubItem>)
                    } else {
                    setSubMenuLink([...subMenuLink, path]);
                    subMenus.push(<SubItem setSubMenuLink={setSubMenuLink} subMenuLink={subMenuLink} key={id} id={id} path={path} label={label} target={target} childItems={childItems}></SubItem>)
                    }
                }
                let renderedItem = <li className={`${styles.hasSubMenu} ${showSubMenu ? styles.mobileSubMenu : ''}`} key={item.id}><Link className={styles.listLink} onClick={handleShowSubMenu} to={item.path} target={item.target} title={item.label}>{item.label}</Link><ul className={styles.subMenu}>{subMenus}</ul></li>;
                return renderedItem;
            }

        });
        return menuToRender;
      }

    return (
        <div>
            <ul className={`${styles.navList} ${showMenu ? styles.active : ''}`}>
                {renderMenu()}
            </ul>
            <button className={styles.mobileButton} onClick={() => setShowMenu(!showMenu)}>Click Me</button>
        </div>
    )
}

export default NavMenu;