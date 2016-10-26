import React from 'react';
import classNames from "classnames"

export default class FormError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.customErrorMessage
        }
    }

    render() {
        var errorClass = classNames(this.props.className, {
           'error-message': true,
            'hide': !this.props.visible
        })

        var requiredErrorClass = classNames({
            'error-message-required': true,
            'hide': !this.props.showRequiredError
        })

        var customErrorClass = classNames({
            'error-message-custom': true,
            'hide': !this.props.showCustomError
        })

        return (
            <div className={errorClass}>
                <span className={requiredErrorClass}>This field is required</span>
                <span className={customErrorClass}>{this.props.errorMessage}</span>
            </div>
        );
    }
}