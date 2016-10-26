const user = (state = {}, action) => {
    switch (action.type) {
        case 'USER_DATA_CREATE':
            return
    }
}

export default function reducer(state=[
    {
        fetching: false,
        fetched: false,
        error: false,
        text: 'Check out Moisture Therapy Calming Relief Hand Cream via@AvonInsider',
        date: '17 Nov 2015',
        userName: 'lvolkova',
        profileImg: '',
        name: '',
        atReply: {
            href: ''
        },
        link: {
            href: ''
        },
        hashtags: {
            href: ''
        },
        img: '',
        iframe: {
            src: ''
        },
        tweet_id: ''
    }
], action) {




    switch (action.type) {
        case 'TWEET_CREATE_USER':
            const user = {
                ...state[0],
                userName: action.payload
            }
            return [
                ...state,
                user
            ]
            break;

        case 'TWEET_DATA_FETCHING': {
            // return {
            //     ...state,
            //     fetching: true,
            //     fetched: false,
            //     error: false,
            //     response: null
            // }
        }
            break;
        case 'TWEET_DATA_FETCHED': {
            console.log(action.payload)
            return state.map(user =>
                user.userName === action.payload.userName ?
                    Object.assign({}, user, {
                        text: action.payload.text,
                        date: action.payload.date,
                        profileImg: action.payload.profileImg,
                        name: action.payload.name,
                        tweet_id: action.payload.tweet_id,
                        atReply: {
                            href: action.payload.atReply.href,
                            text: action.payload.atReply.text
                        },
                        link: {
                            href: action.payload.link.href,
                            text: action.payload.link.text
                        },
                        hashtags: {
                            href: action.payload.hashtags.href,
                            text: action.payload.hashtags.text
                        },
                        img : action.payload.img,
                        iframe: {
                            src: action.payload.iframe.src
                            // src: "//twitter.com/i/cards/tfw/v1/650773877296091136?cardname=summary&autoplay_disabled=true&forward=true&earned=true&lang=en&card_height=130&scribe_context=%7B%22client%22%3A%22web%22%2C%22page%22%3A%22search%22%2C%22section%22%3A%22default%22%2C%22component%22%3A%22tweet%22%7D#xdm_e=https%3A%2F%2Ftwitter.com&xdm_c=default5605&xdm_p=1"
                        }
                    }) : user
            )
        }
        case 'USER_DATA_FETCH_ERROR': {
            console.log('ERRO HANDLE ME!')
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: true
            }
        }
    }

    return state
}
