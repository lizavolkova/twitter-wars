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
        console.log(this.state)
    }

    componentWillReceiveProps() {
        // console.log('USER COMP RECEIVED PROPS')
        this.setState({
            tweetData: {
                userName: this.props.userName,
                sinceDate: this.props.sinceDate,
                untilDate: this.props.untilDate,
                tweet_id: this.props.tweet_id
            }
        })
    }

    setTweetId(tweet_id) {
        this.props.tweetIdReceived(tweet_id)
    }

    componentDidUpdate() {
        console.log('USER.CONTAINER:componentDidUpdate', this.state)
    }


    /**
     * Render component
     * @returns {XML}
     */
    render() {
        return (
            <div className="comp-user">
                <TwitterProfile userData={this.state.userData} />
                {/*<Tweet*/}
                    {/*userName={this.props.userName}*/}
                    {/*sinceDate={this.props.sinceDate}*/}
                    {/*untilDate={this.props.untilDate} />*/}
                <TwitterWidget
                    tweetData={this.state.tweetData}
                    hasFetchedTweetData={this.setTweetId.bind(this)}/>
            </div>
        )
    }
}

export default User;







