export function saveForm(formData) {
    //
    return function(dispatch) {
        dispatch(formSubmitting())

        setTimeout(() => {
            fetch('http://demo4009259.mockable.io/reactTest', {
                method: 'post',
                body: JSON.stringify({
                    formData
                })
            }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw 'reuqest failed'
                }
            }).then((successResponse) => {
                dispatch(formSubmitted(successResponse))
            }).catch(err => {
                dispatch(formSubmittedError())
            })
        }, 2000);

        return null
    }
 }

export function setFormData(data) {
    return {
        type: 'SET_FORM_DATA',
        payload: data
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