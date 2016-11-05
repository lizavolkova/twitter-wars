var config = require('config')

export function getTweets(props) {
    console.log('fetching tweets')
    // var data = {
    //     userName: props.userName,
    //     sinceDate: props.sinceDate,
    //     untilDate: props.untilDate
    // }


    var url = config.serverUrL + '/getTweets?userName=' + props.userName +'&sinceDate=' + props.sinceDate + '&untilDate=' + props.untilDate
    // var url = 'http://localhost:3000/getTweets?userName=' + props.userName + '&sinceDate=2016-09-26&untilDate=2016-09-28'

    return function(dispatch) {
        dispatch(tweetsFetching())

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
            dispatch(tweetFetched(successResponse))
        }).catch(err => {
            //dispatch(formSubmittedError())
        })
        // }, 0);

        return null
    }
}

export function getTweetById(props) {
    // var url = config.serverUrL + '/getTweetById/realDonaldTrump/671809255561932806'
    var url = config.serverUrL  + '/testURL';
    return function(dispatch) {
        dispatch(tweetsFetching())

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
            dispatch(tweetFetchedById(successResponse))
        }).catch(err => {
            //dispatch(formSubmittedError())
        })
        // }, 0);

        return null
    }
}

export function setUser(userName) {
    return {
        type: 'TWEET_CREATE_USER',
        payload: userName
    }
}

export function tweetsFetching() {
    return {
        type: 'TWEET_DATA_FETCHING',
    }
}

export function tweetFetched(data) {
    return {
        type: 'TWEET_DATA_FETCHED',
        payload: data
    }
}

export function tweetFetchedById(data) {
    return {
        type: 'TWEET_DATA_FETCHED',
        payload: data
    }
}

export function formSubmittedError() {
    return {
        type: 'FORM_DATE_FETCH_ERROR'
    }
}