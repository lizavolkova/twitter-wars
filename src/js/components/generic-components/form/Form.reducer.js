export default function reducer(state={
    fetching: false,
    fetched: false,
    error: false,

}, action) {

    switch (action.type) {
        case 'SET_FORM_DATA': {
            return {
                ...state,
                formData: action.payload
            }
        }
            break;
        case 'FORM_SUBMITTING': {
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: false,
                response: null
            }
        }
            break;
        case 'FORM_SUBMIT_SUCCESS': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: false,
                response: action.payload
            }
        }
        case 'FORM_SUBMIT_ERROR': {
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
