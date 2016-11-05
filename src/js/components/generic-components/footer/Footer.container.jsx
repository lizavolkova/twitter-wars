import React from 'react';
import Social from '../social-media/SocialLink.container.jsx'
class Footer extends React.Component {

    /**
     * Render component
     * @returns {XML}
     */
    render() {
        var facebookUrl = 'https://www.facebook.com/dialog/share?app_id=1222226654508373&display=popup&href=' + this.props.permalink;
        var twitterUrl = 'https://twitter.com/share?url=' + this.props.permalink + '&text=See what the candidates talked about on the same random day'

        return (
            <footer className="comp-footer">
                <div className="social-links">
                    <Social
                        type="fa-link"
                        url={this.props.permalink}
                        tooltipCopy="Copy"/>
                    <Social
                        type="fa-facebook"
                        url={facebookUrl}
                        tooltipCopy="Share" />
                    <Social
                        type="fa-twitter"
                        url={twitterUrl}
                        tooltipCopy="Tweet" />
                </div>

                {/*<a href=>PERMALINK!</a>*/}
            </footer>
        )
    }
}

export default Footer;