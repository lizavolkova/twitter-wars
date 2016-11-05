import React from 'react';
import Main from './components/generic-components/main/Main.container.jsx'
import User from './components/app-components/user/User.container.jsx'
import Footer from './components/generic-components/footer/Footer.container.jsx'
import base64 from 'base-64'

//import FormInput from './components/generic-components/form/FormInput.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        const tweetIds = this.getQueryParams()

        this.state = {
            // sinceDate: '2014-10-15',
            // untilDate: '2016-10-16'
            permalink: 'https://localhost:8080/index.html?link=NjY3MDIzOTU3MzY3OTE0NDk2JjY2NjYzNjQyMzgxOTIwMjU2MA==',
            sinceDate: '2015-11-17',
            untilDate: '2015-11-19',
            userLeft: {
                userName: 'realDonaldTrump',
                tweet_id: tweetIds[0]
            },
            userRight: {
                userName: 'HillaryClinton',
                tweet_id: tweetIds[1]
            }
        }
    }

    getQueryParams() {
        return this.getPermalinkIds(window.location.href)
    }

    componentDidMount() {
        twttr.ready(() => {
            this.shuffleTweets()
        });

    }

    shuffleTweets() {
        var campaignStartDate = new Date("June 16, 2015");
        var today = new Date();
        var untilDate = new Date(campaignStartDate.getTime() + Math.random() * (today.getTime() - campaignStartDate.getTime()))
        var sinceDate = new Date(untilDate.getTime());
        sinceDate.setDate(sinceDate.getDate() - 1)
        this.setState({
            sinceDate: sinceDate.toISOString().slice(0,10),
            untilDate: untilDate.toISOString().slice(0,10),
            userLeft: {
                userName: 'realDonaldTrump',
                tweet_id: ''
            },
            userRight: {
                userName: 'HillaryClinton',
                tweet_id: ''
            }
        })
    }

    onShuffle(e) {
        e.preventDefault()
        if (window.location.search) {
            history.pushState(null, "", location.href.split("?")[0]);
        }

        this.shuffleTweets()
    }

    getPermalinkIds(url) {
        let ids = [];
        const searchQuery = /link=(.*)/.exec(url)

        if (searchQuery && searchQuery[0].substring(0,5) == 'link=') {
            const decodedUrl = base64.decode(searchQuery[0].substring(5, searchQuery[0].length))
            if (decodedUrl.split('&').length === 2) {
                ids = decodedUrl.split('&').slice(0)
            }
        }

        return ids
    }

    setTweetPermalink(tweet) {
        const pastTweetIds = this.getPermalinkIds(this.state.permalink)
        let newTweetIds = pastTweetIds.slice(0)

        if (tweet.userName === 'realDonaldTrump') {
            newTweetIds[0] = tweet.tweet_id
        } else {
            newTweetIds[1] = tweet.tweet_id
        }

        this.generatePermalink(newTweetIds)
    }

    generatePermalink(ids) {
        var urlParam = ids[0] + '&' + ids[1]
        var encodedUrlParam = base64.encode(urlParam)
        this.setState({
            permalink: 'http://' + window.location.host + '/index.html?link=' + encodedUrlParam
        })
    }

    render() {
        console.log('APP.JS RENDERING!')
        return (
                <Main>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-6 col-left no-float">
                            <User
                            userName={this.state.userLeft.userName}
                            sinceDate={this.state.sinceDate}
                            untilDate={this.state.untilDate}
                            tweet_id={this.state.userLeft.tweet_id}
                            tweetIdReceived={this.setTweetPermalink.bind(this)}/>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6 col-right no-float">
                            <User
                            userName={this.state.userRight.userName}
                            sinceDate={this.state.sinceDate}
                            untilDate={this.state.untilDate}
                            tweet_id={this.state.userRight.tweet_id}
                            tweetIdReceived={this.setTweetPermalink.bind(this)}/>
                        </div>
                    </div>

                    <div className="shuffle-button">

                        <a href="#" className="white-button" onClick={this.onShuffle.bind(this)}>
                            <i className="fa fa-star" ></i>
                            <span>Shuffle</span>
                            <i className="fa fa-star" ></i>
                        </a>

                    </div>

                    <Footer permalink={this.state.permalink} />
                </Main>

        )

    }
}