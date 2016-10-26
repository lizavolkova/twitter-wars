import React from 'react';
import classNames from "classnames";

/**
 * Fade in image on load
 * http://buildwithreact.com/article/fade-in-image-recipe
 */
class ImgFade extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
    }

    onLoad() {
        this.setState({
            loaded: true
        })
    }

    /**
     * Render component
     * @returns {XML}
     */
    render() {

        const imgClass = classNames(this.props.className, {
            'image-fade': true,
            'loaded': this.state.loaded
        })

        return (
            <img ref="img" src={this.props.src} className={imgClass} onLoad={this.onLoad.bind(this)} />
        )

    }
}
export default ImgFade;














