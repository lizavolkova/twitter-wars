import React from 'react';

class Main extends React.Component {

    /**
     * Render component
     * @returns {XML}
     */
    render() {

        return (
            <div className="container">
                {this.props.children}
            </div>
        )
    }
}

export default Main;