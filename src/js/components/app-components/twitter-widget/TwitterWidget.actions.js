var config = require('config')
import 'whatwg-fetch';

export function createTweet(userName) {
    return {
        type: 'TWEET_DATA_CREATE',
        payload: userName
    }
}

export function getTweet(props) {
    var userName = props.userName
    var url;

    if (props.tweet_id) {
        url = config.serverUrL + '/getTweetById/' + props.tweet_id
    } else {
        url = config.serverUrL + '/getTweet?userName=' + props.userName +'&sinceDate=' + props.sinceDate + '&untilDate=' + props.untilDate
    }

    // var url = config.serverUrL + '/getTweets?userName=' + props.userName + '&sinceDate=2016-09-26&untilDate=2016-09-28'

    return function(dispatch) {
        dispatch(tweetsFetching(userName))

        // setTimeout(() => {
        fetch(url, {
            method: 'get'
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw 'request failed'
            }
        }).then((successResponse) => {
            successResponse.userName = userName
            dispatch(tweetFetched(successResponse))
        }).catch(err => {
            dispatch(tweetFetchError(userName))
        })
        // }, 0);

        return null
    }
}

export function getTweetById(id) {
    var url = config.serverUrL + '/getTweetById/' + id

    return function(dispatch) {
        dispatch(tweetsFetching(userName))
        fetch(url, {
            method: 'get'
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw 'request failed'
            }
        }).then((successResponse) => {
            successResponse.userName = userName
            dispatch(tweetFetched(successResponse))
        }).catch(err => {
            dispatch(tweetFetchError(userName))
        })
        return null
    }
}

export function tweetsFetching(userName) {
    return {
        type: 'TWEET_DATA_FETCHING',
        payload: userName
    }
}

export function tweetFetched(data) {
    const splitUrl = data.url.split('/');
    const tweet_id = splitUrl[splitUrl.length - 1];
    data.tweet_id = tweet_id
    return {
        type: 'TWEET_DATA_FETCHED',
        payload: data
    }
}


export function tweetFetchError(userName) {
    console.log('TWEET ERROR!!')
    return {
        type: 'TWEET_DATA_FETCH_ERROR',
        payload: userName
    }
}