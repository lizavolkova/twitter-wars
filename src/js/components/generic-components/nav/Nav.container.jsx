import React from 'react';
import NavItem from './Navitem.jsx'

class Nav extends React.Component {

    /**
     * Render component
     * @returns {XML}
     */
    render() {
 
        return (
            <nav >
                <ul>
                    <NavItem />
                    <NavItem />
                    <NavItem />
                </ul>
            </nav>
        )
    }
}

export default Nav;