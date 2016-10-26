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
        error: false
    }
], action) {

    switch (action.type) {
        case 'USER_DATA_CREATE':
            state[0] = action.payload
            const user = {
                ...state[0],
                screen_name: action.payload.userName,
                fetching: false,
                fetched: false,
                error: false,
            }

            return [
                ...state,
                user
            ]
            break;

        case 'USER_DATA_FETCHING':
            return state.map(user =>
                user.screen_name === action.payload ?
                    Object.assign({}, user, {
                        fetching: true,
                        fetched: false,
                        error: false
                    }) : user
            )
            break;

        case 'USER_DATA_FETCHED': {
            return state.map(user =>
                user.screen_name === action.payload.screen_name ?
                    Object.assign({}, user, {
                        fetching: false,
                        fetched: true,
                        error: false,
                        profile_image_url: action.payload.profile_image_url,
                        description: action.payload.description,
                        name: action.payload.name,
                        background_image_url: action.payload.background_image_url,
                        display_url: action.payload.display_url,
                        url: action.payload.url
                    }) : user
            )
        }

        case 'USER_DATA_FETCH_ERROR': {

            return state.map(user =>
                user.screen_name === action.payload ?
                    Object.assign({}, user, {
                        fetching: false,
                        fetched: true,
                        error: true
                    }) : user
            )
        }
    }

    return state
}
