import React from 'react';
import classNames from "classnames";

class Social extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false
        }
    }

    componentDidMount() {
        this.watchForNativeMouseLeave();
    }

    componentDidUpdate() {
        this.watchForNativeMouseLeave();
    }

    watchForNativeMouseLeave() {
        this.refs.hoverElement.addEventListener('mouseleave', () => {
            if (this.props.disabled) {
                this.handleMouseOut();
            }
        });
    }

    handleMouseEnter() {
        this.setState({
            hover: true
        })
    }

    handleMouseLeave() {
        this.setState({
            hover: false
        })
    }

    share() {
        switch (this.props.type) {
            case 'fa-facebook':
                this.facebookShare()
                break;
            case 'fa-twitter':
                this.twitterShare()
                break;
            case 'fa-link':
                this.copyLink()
                break;
        }

    }

    facebookShare() {
        window.open(this.props.urlTest , 'Share on Facebook','width=560,height=636');
    }

    twitterShare() {
        window.open(this.props.urlTest , 'Share on Twitter','width=670,height=430');
    }

    copyLink() {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", this.props.url);
    }


    /**
     * Render component
     * @returns {XML}
     */
    render() {
        const socialClassName = classNames(this.props.type, {
            'fa': true
        })

        const tooltipClass = classNames({
            'social-tooltip': true,
            'show':  this.state.hover
        })

        return (
            <div className="comp-social">
                <div className={tooltipClass}>
                    {this.props.tooltipCopy}
                </div>
                <i
                    ref='hoverElement'
                    className={socialClassName}
                    onMouseEnter={this.handleMouseEnter.bind(this)}
                    onMouseLeave={this.handleMouseLeave.bind(this)}
                    onClick={this.share.bind(this)}
                    aria-hidden="true"></i>
                {/*<a href={this.props.permalink}>PERMALINK!</a>*/}
            </div>
        )
    }
}

export default Social;