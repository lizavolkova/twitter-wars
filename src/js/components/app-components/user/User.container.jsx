import React from 'react';
import TwitterProfile from '../twitter-profile/TwitterProfile.container.jsx'
import TwitterWidget from '../twitter-widget/TwitterWidget.container.jsx'

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {
                userName: this.props.userName,
                description: 'description',
                name: 'name',
                screen_name: '@user',
                // profile_image_url: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png',
                profile_image_url: ''
            },
            tweetData: {
                userName: this.props.userName,
                sinceDate: this.props.sinceDate,
                untilDate: this.props.untilDate,
                tweet_id: this.props.tweet_id
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tweetData: {
                userName: this.props.userName,
                sinceDate: nextProps.sinceDate,
                untilDate: nextProps.untilDate,
                tweet_id: this.props.tweet_id
            }
        })
    }

    setTweetId(tweet_id) {
        this.props.tweetIdReceived(tweet_id)
    }

    /**
     * Render component
     * @returns {XML}
     */
    render() {
        if (twttr.events) {
            return (
                <div className="comp-user">
                    <TwitterProfile userData={this.state.userData} />
                    <TwitterWidget
                        tweetData={this.state.tweetData}
                        hasFetchedTweetData={this.setTweetId.bind(this)}/>
                </div>
            )
        } else {
            return (
                <div className="comp-user">
                    <TwitterProfile userData={this.state.userData} />
                </div>
            )
        }

    }
}

export default User;







