import React from 'react';
import { connect } from 'react-redux';
import { getTweet, createTweet, getTweetById } from './TwitterWidget.actions.js'
import classNames from "classnames";

@connect((store, props) => {
    var tweet = store.tweets.filter(tweet => tweet.userName === props.tweetData.userName)[0] ? store.tweets.filter(tweet => tweet.userName === props.tweetData.userName)[0] : store.tweets[0]

    return {
        tweet: tweet
    };
})

class TwitterWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fetching: true
        }
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.props.dispatch(createTweet(this.props.tweetData.userName))
        this.props.dispatch(getTweet(this.props.tweetData))

        var _this = this;
        twttr.events.bind(
            'rendered',
            function () {
                _this.setState({
                    fetching: false
                })
            }
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tweetData.sinceDate !== this.props.tweetData.sinceDate && nextProps.tweetData.untilDate !== this.props.tweetData.untilDate) {
            this.setState({
                fetching: true
            }, this.getTweet)
        }
    }

    getTweet() {
        this.props.dispatch(getTweet(this.props.tweetData))
    }

    componentDidUpdate(prevProps) {
        if (twttr && !this.props.tweet.fetching && this.refs.widgetWrapper.getElementsByTagName('blockquote').length > 0) {
            twttr.widgets.load(this.refs.widgetWrapper.getElementsByTagName('blockquote'))
        }


        if (this.props.tweet.tweet_id && this.props.tweet.tweet_id !== prevProps.tweet.tweet_id) {
            var tweet_id = {
                userName: this.props.tweet.userName,
                tweet_id: this.props.tweet.tweet_id
            }
            this.props.hasFetchedTweetData(tweet_id)
        }
    }

    /**
     * Render component
     * @returns {XML}
     */
    render() {
        var compWidgetClass = classNames({
            'comp-twitter-widget fadeIn': true,
            'fadeOut': this.props.tweet.error || this.props.tweet.fetching
        })

        var widgetLoaderClass = classNames({
            'twitter-widget-loader-container': true,
            'hide': !this.state.fetching || this.props.tweet.error
        })

        var widgetErrorClass = classNames({
            'twitter-error-container': true,
            'hide': !this.props.tweet.error || !this.props.tweet.fetched
        })

        var widgetContentClass = classNames({
            'twitter-widget-wrapper': true,
            'hide': this.state.fetching
        })

        console.log(this)

      return (

          <div className={compWidgetClass}  >
              <div className={widgetLoaderClass}>
                  <div className="twitter-widget-loader">
                      <div className="spinner">
                          <div className="rect1"></div>
                          <div className="rect2"></div>
                          <div className="rect3"></div>
                          <div className="rect4"></div>
                          <div className="rect5"></div>
                      </div>
                      <span className="sr-only">Loading...</span>
                  </div>
              </div>

              <div className={widgetErrorClass}>
                  <div className="twitter-error">
                      <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                      An error occurred, please try shuffling again
                  </div>

              </div>

              <div ref="widgetWrapper" className={widgetContentClass} dangerouslySetInnerHTML={{__html: this.props.tweet.html}}></div>
          </div>
        )

    }
}

export default TwitterWidget;












