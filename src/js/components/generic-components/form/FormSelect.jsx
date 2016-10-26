import React from 'react';
import FormError from './FormError.jsx';
import { assign } from 'lodash';

class FormSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.selected,
            showError: false,
            showRequiredError: false,
            showCustomError: false,
            fieldValid: !this.props.required || this.props.selected
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
     * Hide all errors
     */
    hideErrors() {
        this.setState({
            showError: false,
            showRequiredError: false,
            fieldValid: true
        }, () => {
            this.onErrorStateChange()
        })
    }

    /**
     * Handle select change
     * @param e
     */
    onHandleChange(e) {
        this.hideErrors()
        var value = e.currentTarget.options[e.currentTarget.selectedIndex].value
        this.setState({
            value: value
        });

        if (this.props.required && (!value || _.trim(value).length === 0)) {
            this.showRequiredError()
        }
    }

    onErrorStateChange() {
        this.props.onFieldChange(this)
    }

    /**
     * Render select component
     * @returns {XML}
     */
    render() {
        //generate select options
        var options = this.props.options.map(function(option) {
            return (
                <option value={option.id} key={option.id}>{option.title}</option>
            );
        });

        //define optional default options
        var defaultOption = this.props.defaultOptionText ? <option value="" key={-1}>{this.props.defaultOptionText}</option> : undefined

        return (
            <div className={this.props.wrapperClass}>
                <label htmlFor={this.props.id}>{this.props.label}
                    <select
                        onChange={this.onHandleChange.bind(this)}
                        name={this.props.name}
                        id={this.props.id}
                        value={this.state.value}>
                        {defaultOption}
                        {options}
                    </select>
                </label>
                <FormError
                    visible={this.state.showError}
                    showRequiredError={this.state.showRequiredError}
                />
            </div>
        );
    }
}

FormSelect.propTypes = {
//     wrapperClass: React.prototype.string,
//     id: React.prototype.string,
// label: React.prototype.string
// options: React.prototype.string
// selected: React.prototype.string
// onHandleChange: React.prototype.string
// defaultOptionText: React.prototype.string
};

FormSelect.defaultProps = {
    // type:               'text',
    // required:           false
};

export default FormSelect;