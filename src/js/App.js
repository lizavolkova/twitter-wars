import React from 'react';
import Nav from './components/generic-components/nav/Nav.container.jsx'
import Footer from './components/generic-components/footer/Footer.container.jsx'
import Main from './components/generic-components/main/Main.container.jsx'
import User from './components/app-components/user/User.container.jsx'
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
        console.log(this.state)
    }

    getQueryParams() {
        const searchQuery = window.location.search;
        let ids = '';

        if (searchQuery.substring(0,6) == '?link=') {
            const decodedUrl = base64.decode(searchQuery.substring(6, window.location.search.length))
            if (decodedUrl.split('&') === 2) {
                ids =decodedUrl.split('&')
            }
        }

        return ids

    }

    componentDidMount() {
        this.shuffleTweets()
    }


    shuffleTweets() {
        var campaignStartDate = new Date("June 16, 2015");
        var today = new Date();
        var untilDate = new Date(campaignStartDate.getTime() + Math.random() * (today.getTime() - campaignStartDate.getTime()))
        var sinceDate = new Date(untilDate.getTime());
        sinceDate.setDate(sinceDate.getDate() - 1)
        this.setState({
            // userRight: {
            //     tweet_id: ''
            // },
            // userLeft: {
            //     tweet_id: ''
            // },
            sinceDate: sinceDate.toISOString().slice(0,10),
            untilDate: untilDate.toISOString().slice(0,10)
        }, this.logState())
    }

    onShuffle(e) {
        e.preventDefault()
        this.shuffleTweets()
    }

    setTweetPermalink(tweet) {
        // console.log('SET TWEET PERMALINK', tweet)
        // console.log('NEXT LINE AFTER SET')
        // const isRightUser = this.state.userRight.userName === tweet.userName
        // console.log('isRightUser?', isRightUser)
        //
        // if (isRightUser) {
        //     this.setState({
        //         userRight: {
        //             tweet_id: tweet.tweet_id,
        //             userName: tweet.userName
        //         }
        //     }, )
        // } else {
        //     this.setState({
        //         userLeft: {
        //             tweet_id: tweet.tweet_id,
        //             userName: tweet.userName
        //         }
        //     })
        // }
        //this.generatePermalink()
    }

    componentWillReceiveProps() {
        //console.log('APP:componentWillReceiveProps')
    }
    componentDidUpdate() {
        //console.log('APP:componentDidUpdate', this.state)
    }

    generatePermalink() {
        const var1 = '667023957367914496' //T
        const var2 = '666636423819202560' //H

        var urlParam = var1 + '&' + var2
        var encodedUrlParam = base64.encode(urlParam)
        //console.log('APP:generatePermalink', this.state)
       // console.log(window.location.protocol + '//' + window.location.host + '/' + encodedUrlParam)
    }

    logState() {
        //console.log('APP:logState:', this.state)
    }

    render() {
        return (
                <Main>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12 col-left no-float">
                            <User
                            userName={this.state.userLeft.userName}
                            sinceDate={this.state.sinceDate}
                            untilDate={this.state.untilDate}
                            tweet_id={this.state.userLeft.tweet_id}
                            tweetIdReceived={this.setTweetPermalink.bind(this)}/>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12 col-right no-float">
                            <User
                            userName={this.state.userRight.userName}
                            sinceDate={this.state.sinceDate}
                            untilDate={this.state.untilDate}
                            tweet_id={this.state.userRight.tweet_id}
                            tweetIdReceived={this.setTweetPermalink.bind(this)}/>
                        </div>
                    </div>

                    <div className="shuffle-button">
                        <a href="#" className="white-button" onClick={this.onShuffle.bind(this)}>Shuffle</a>
                        <a href={this.state.permalink}></a>
                    </div>
                    {/*<div className="permalink">*/}
                        {/*<a href={this.state.permalink}> </a>*/}
                    {/*</div>*/}
                </Main>

        )

    }
}








