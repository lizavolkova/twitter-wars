import React from 'react';
import classNames from "classnames";
import { connect } from 'react-redux';
import { getProfileData, createNewUser } from './TwitterProfile.actions.js'
import ImgFade from '../../generic-components/img-fade/ImageFade.container.jsx'

@connect((store, props) => {
    var userData = store.users.filter(user => user.screen_name === props.userData.userName)[0] ? store.users.filter(user => user.screen_name === props.userData.userName)[0] : store.users[0]
    return {
        user: userData
    }
})


class TwitterProfile extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(createNewUser(this.props.userData))
    }

    componentDidMount() {
        this.props.dispatch(getProfileData(this.props.userData.userName))
    }

    /**
     * Render component
     * @returns {XML}
     */
    render() {
        var fetchingDivClass = classNames({
            'tweet-profile-fetching': true,
            'hide': !this.props.user.fetching
        })

        var errorDivClass = classNames({
            'tweet-profile-error': true,
            'hide': !this.props.user.error
        })

        const profileBackroundStyle = this.props.user.background_image_url ? { backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(' + this.props.user.background_image_url + ')' } : { backgroundImage: 'url(' + this.props.user.background_image_url + ')' }

        const displayName = this.props.user.fetching || this.props.user.error ? '@' + this.props.user.userName : this.props.user.name

        const twitterProfileUrl = 'https://twitter.com/' + this.props.user.userName
        return (
            <div className="tweet-profile-container">

                <div className="tweet-profile-wrapper">
                    <div className="profile-background">
                        <ImgFade src={this.props.user.background_image_url} />
                    </div>

                    <div className="tweet-profile-user-name">
                        {displayName}
                    </div>

                    <div className="tweet-profile-white-bar">
                        <span className="tweet-profile-user-name">
                            {displayName}
                        </span>
                        <span className="tweet-profile-divider-bar first">
                            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        </span>
                            <a className="tweet-profile-screen-name" href={twitterProfileUrl} target="_blank">
                                @{this.props.user.userName}
                            </a>
                        <span className="tweet-profile-divider-bar second">
                            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        </span>
                        <span className="tweet-profile-website">
                            <a href={this.props.user.url} target="_blank">{this.props.user.display_url}</a>
                        </span>
                    </div>

                    <div className="tweet-profile-content">
                        <div className="">
                            <div className="tweet-profile-avatar ">
                                <img src="http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png" className="tweet-profile-placeholder" alt=""/>
                                <ImgFade src={this.props.user.profile_image_url} />
                            </div>
                            <div className="tweet-profile-body">


                                <div className="tweet-profile-bio">
                                    {/*{this.props.user.description}*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )

    }
}
export default TwitterProfile;


