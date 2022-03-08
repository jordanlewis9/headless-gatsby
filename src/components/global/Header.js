import React from 'react';
// import * as styles from './header.module.scss';
import NavMenu from './navs/NavMenu';

const Header = React.memo(() => {
    return (
        <div>
            <NavMenu />
        </div>
    )
})

export default Header;