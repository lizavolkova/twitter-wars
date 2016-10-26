/**
 * Form validation following this implementation:
 * http://christianalfoni.github.io/javascript/2014/10/22/nailing-that-validation-with-reactjs.html
 */
import React from 'react';
import { connect } from 'react-redux';
import FormButton from './FormButton.jsx';
import classNames from "classnames";

require("./Form.scss");

class FormTwo extends React.Component {
    constructor(props) {
        super(props)
        this.inputs = {}
        this.formData = {}
        this.clonedChildren = {}
        this.registerInputs(this.props.children)
        this.state = {
            isFormInvalid: true
        }
    }

    /**
     * On componentWillMount
     */
    componentWillMount() {
        this.updateFormDataModel()
    }

    /**
     * Register all form inputs - clone children and attach new properties to them
     */
    registerInputs() {
        this.clonedChildren = React.Children.map(this.props.children, (child) =>
            React.cloneElement(child, {
                attachToForm: this.attachToForm.bind(this),
                detachFromForm: this.detachFromForm.bind(this),
                onFieldChange: this.onFieldChange.bind(this)
            })
        );
    }

    /**
     * Attach form field to form
     * @param {Object} component
     */
    attachToForm(component) {
        this.inputs[component.props.name] = component
        this.formData[component.props.name] = component.state.value
    }

    /**
     * Detach form field from form
     * @param {Object} component
     */
    detachFromForm(component) {
        delete this.inputs[component.props.name]
        delete this.formData[component.props.name]
    }

    /**
     * Update form data model
     */
    updateFormDataModel() {
        var error = false;
        Object.keys(this.inputs).forEach((name) => {
            this.formData[name] = this.inputs[name].state.value;

            //If any fields are invalid throw an error
            if (this.inputs[name].state.fieldValid === false) {
                error = true
            }
        })

        //If any fields are invalid, prevent form submission
        this.setState({
            isFormInvalid: error
        })
    }

    /**
     * Called anytime a filed is changed
     */
    onFieldChange() {
        this.updateFormDataModel()
    }

    /**
     * Handle form submit
     * @param {Object} e
     */
    onHandleFormSubmit(e) {
        e.preventDefault()
        //this.props.dispatch(saveForm(this.formData))
        //console.log(this.props)
       //this.props.submitForm(this.formData)
        //this.triggerSubmit()
    }

    /**
     * Generic phone validation
     * @param {string} phone
     * @returns {boolean}
     */
    validatePhone(phone) {
        //regular expression from http://stackoverflow.com/questions/18375929/validate-phone-number-using-javascript
        var regEx = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        return regEx.test(phone)
    }

    render() {
        const formClassName = classNames(this.props.className, {
            'comp-form': true
        });

        //handle error message
        const genericErrorClass = classNames({
            'error-message': true
            //'hide': !this.props.form.error
        })
        const genericFormError = this.props.genericFormError ? <span className={genericErrorClass}>{this.props.genericFormError}</span> : ''

        //handle success message
        const successMessageClass = classNames({
            'success-message': true
            //'hide': !this.props.form.fetched || this.props.form.fetched && this.props.form.error
        })

        // const fetched = this.props.form.fetched ? 'fetched!' : 'not fetched'
        // const fetching = this.props.form.fetching ? 'fetching...': 'not fetching'

        return (
            <form onSubmit={this.onHandleFormSubmit.bind(this)} className={formClassName}>
                {this.clonedChildren}
                <FormButton type="submit" value="Submit!" disabled={this.state.isFormInvalid}/>
                <br />
                {genericFormError}<br />
                {/*<span className={successMessageClass}>Thanks! Your form was submitted!</span><br />*/}
            </form>
        )
    }
}

FormTwo.proptypes = {

}


export default FormTwo;