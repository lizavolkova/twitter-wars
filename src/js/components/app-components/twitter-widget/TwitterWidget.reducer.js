export default function reducer(state=[
    {
        fetching: false,
        fetched: false,
        error: false,
    }
], action) {




    switch (action.type) {
        case 'TWEET_DATA_CREATE':
            const tweet = {
                ...state[0],
                userName: action.payload
            }
            return [
                ...state,
                tweet
            ]
            break;

        case 'TWEET_DATA_FETCHING':
            return state.map(tweet =>
                tweet.userName === action.payload ?
                    Object.assign({}, tweet, {
                        fetching: true,
                        fetched: false,
                        error: false
                    }) : tweet
            )
            break;
        case 'TWEET_DATA_FETCHED': {
            return state.map(tweet =>
                tweet.userName === action.payload.userName ?
                    Object.assign({}, tweet, {
                        fetching: false,
                        fetched: true,
                        error: false,
                        html: action.payload.html,
                        tweet_id: action.payload.tweet_id
                    }) : tweet
            )
        }
        case 'TWEET_DATA_FETCH_ERROR': {
            return state.map(tweet =>
                tweet.userName === action.payload ?
                    Object.assign({}, tweet, {
                        fetching: false,
                        fetched: true,
                        error: true
                    }) : tweet
            )
        }
    }

    return state
}
