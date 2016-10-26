import React from 'react';
import { trim } from 'lodash';
import { defaults } from 'lodash';
import validator from 'validator';

import FormError from './FormError.jsx';

class FormInput extends React.Component {
    /**
     * Constructor method
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            showError: false,
            showRequiredError: false,
            showCustomError: false,
            fieldValid: !this.props.required || (this.props.defaultValue && this.props.defaultValue.length > 0), //assume if default value provided, value is valid
            value: this.props.defaultValue
        }
    }

    /**
     * On componentWillMount
     */
    componentWillMount() {
        this.props.attachToForm(this)
    }

    /**
     * On componentWillUnmount
     */
    componentWillUnmount() {
        this.props.detachFromForm(this)
    }

    /**
     * Show Required Error message
     */
    showRequiredError() {
        this.setState({
            showError: true,
            showRequiredError: true,
            fieldValid: false
        }, () => {
            this.onErrorStateChange()
        })
    }

    /**
     * Show Custom Error message
     */
    showCustomError() {
        this.setState({
            showError: true,
            showCustomError: true,
            fieldValid: false
        }, () => {
            this.onErrorStateChange()
        })
    }

    /**
     * Hide all errors
     */
    hideErrors() {
        this.setState({
            showError: false,
            showRequiredError: false,
            showCustomError: false,
            fieldValid: true
        }, () => {
            this.onErrorStateChange()
        })
    }

    /**
     * Custom field validation
     * Uses validator.js library for validation
     * @param value
     */
    validateCustomField(value) {
        if (!validator[this.props.validation](_.trim(value))) {
            this.showCustomError()
        }
    }

    /**
     * Handle input change
     * @param {Object} e
     */
    handleChange(e) {
        var value = e.target.value
        this.setState({
            value: value
        })
    }

    /**
     * Handle input blur
     * @param {object} e
     */
    handleBlur(e) {
        this.hideErrors()
        this.handleValidation(e.target.value)
    }

    /**
     * Validate input field
     * @param {string} value
     */
    handleValidation(value) {
        switch (true) {
            case (this.props.required && (!value || _.trim(value).length === 0)):
                this.showRequiredError()
                break;
            case (_.trim(value).length > 0 && typeof this.props.validation !== 'undefined'):
                this.validateCustomField(value)
                break;
        }
    }

    /**
     * Handle any change to error state of input
     */
    onErrorStateChange() {
        console.log(this.state);
        this.props.onFieldChange(this)
    }

    /**
     * Render component
     * @returns {XML}
     */
    render() {
        const asterix = this.props.required ? '*' : '';
        const errorClass = this.state.showError ? 'error': '';

        return (
            <div className={this.props.wrapperclass}>
                <label htmlFor={this.props.id}>{this.props.label} {asterix}</label>
                <input
                    type=           {this.props.type}
                    placeholder=    {this.props.placeholder}
                    value=          {this.state.value}
                    checked=        {this.props.checked}
                    id=             {this.props.id}
                    name=           {this.props.name}
                    className=      {errorClass}
                    onChange=       {this.handleChange.bind(this)}
                    onBlur=         {this.handleBlur.bind(this)}>
                </input>
                <FormError
                    visible={this.state.showError}
                    errorMessage={this.props.customErrorMessage}
                    showRequiredError={this.state.showRequiredError}
                    showCustomError={this.state.showCustomError}
                    />
            </div>
        );
    }
}

FormInput.propTypes = {
    name:               React.PropTypes.string,
    wrapperclass:       React.PropTypes.string,
    id:                 React.PropTypes.string,
    label:              React.PropTypes.string,
    placeholder:        React.PropTypes.string,
    type:               React.PropTypes.string,
    value:              React.PropTypes.string,
    validate:           React.PropTypes.func,
    customErrorMessage: React.PropTypes.string,
    required:           React.PropTypes.bool
};

FormInput.defaultProps = {
    type:               'text',
    required:           false
};

export default FormInput;