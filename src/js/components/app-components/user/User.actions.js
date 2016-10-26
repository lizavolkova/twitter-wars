export function getTweets(data) {
    console.log(data)
    //
    return function(dispatch) {
        dispatch(formSubmitting())

        setTimeout(() => {
            fetch('http://localhost:3000/getTweets', {
                method: 'post',
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data
                })
            }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw 'request failed'
                }
            }).then((successResponse) => {
                dispatch(formSubmitted(successResponse))
            }).catch(err => {
                dispatch(formSubmittedError())
            })
        }, 0);

        return null
    }
}

export function formSubmitting() {
    return {
        type: 'FORM_SUBMITTING',
    }
}

export function formSubmitted(response) {
    return {
        type: 'FORM_SUBMIT_SUCCESS',
        payload: response.msg
    }
}

export function formSubmittedError() {
    return {
        type: 'FORM_SUBMIT_ERROR'
    }
}