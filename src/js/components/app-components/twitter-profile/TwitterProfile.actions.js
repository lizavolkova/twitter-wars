var config = require('config')

export function getProfileData(userName) {
    return function(dispatch) {
        dispatch(fetchingData(userName))
        var url = config.serverUrL + '/getProfileData/' + userName

            fetch(url, {
                method: 'get'
            }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw 'request failed'
                }
            }).then((successResponse) => {
                dispatch(setProfileData(successResponse))
            }).catch(err => {
                dispatch(fetchError(userName))
            })


        return null
    }
}

export function createNewUser(user) {
    return {
        type: 'USER_DATA_CREATE',
        payload: user
    }
}

export function fetchingData(userName) {
    return {
        type: 'USER_DATA_FETCHING',
        payload: userName
    }
}

export function setProfileData(data) {
    var imgUrl = data.profile_image_url_https.replace('_normal', '')
    var userData = {
        description: data.description,
        name: data.name,
        screen_name: data.screen_name,
        profile_image_url: imgUrl,
        background_image_url: data.profile_banner_url,
        display_url: data.entities.url.urls[0].display_url,
        url: data.entities.url.urls[0].expanded_url

    }

    return {
        type: 'USER_DATA_FETCHED',
        payload: userData
    }
}

export function fetchError(userName) {
    return {
        type: 'USER_DATA_FETCH_ERROR',
        payload: userName
    }
}




















