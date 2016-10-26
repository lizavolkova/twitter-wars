import React from 'react';
import { connect } from 'react-redux';
import { getTweets, getTweetById, setUser } from './Tweet.actions.js'


@connect((store, props) => {
    var tweet = store.tweets.filter(tweet => tweet.userName === props.userName)[0] ? store.tweets.filter(tweet => tweet.userName === props.userName)[0] : store.tweets[0]

    return {
        tweet: tweet
    };
})
class TweetContainer extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(setUser(this.props.userName))
        this.props.dispatch(getTweetById(this.props))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sinceDate !== this.props.sinceDate && nextProps.untilDate !== this.props.untilDate) {
            this.props.dispatch(getTweets(this.props))
        }

        if (nextProps.tweet.tweet_id !== this.props.tweet.tweet_id) {
            // console.log('NEW TWEET RECEIVED')
            this.props.updateUrl(this, this.props.tweet_id);
        }
    }

    /**
     * Render component
     * @returns {XML}
     */
    render() {
        var $iframe = this.props.tweet.iframe.src.length > 0 ? <iframe height="129" sandbox="allow-scripts" src={this.props.tweet.iframe.src} frameBorder="0" scrolling="no" width="100%" allowFullScreen ref="iframe" ></iframe> : null

        var $img = this.props.tweet.img.length > 0 ? <img src={this.props.tweet.img} /> : null
        return (
            <div className="comp-tweet">

                <div className="tweet-content">
                    <div className="tweet-header">
                        <a href="#">
                            <img src={this.props.tweet.profileImg} alt=""/>
                            <strong className="tweet-full-name">{this.props.tweet.name}</strong>
                            <span className="tweet-user-name"> &nbsp;@{this.props.userName}</span>
                        </a>
                        <span className="tweet-time">&nbsp;&middot;&nbsp;{this.props.tweet.date}</span>
                    </div>
                    <div className="tweet-body">
                        <div className="twitter-tweet">
                            <p dangerouslySetInnerHTML={{__html: this.props.tweet.text}}></p>
                            {$img}
                            {$iframe}
                        </div>
                    </div>
                    <div className="tweet-footer">
                        {this.props.tweet.tweet_id}
                    </div>
                </div>

            </div>
        )
    }
}
export default TweetContainer;






















