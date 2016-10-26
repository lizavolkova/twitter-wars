import React from 'react';

class Footer extends React.Component {

    /**
     * Render component
     * @returns {XML}
     */
    render() {

        return (
            <footer>
                {this.props.children}
            </footer>
        )
    }
}

export default Footer;