import React from 'react';

var FormButton = React.createClass({
    render: function() {
        return (
            <button
                className="button"
                type={this.props.type}
                disabled={this.props.disabled}
            >{this.props.value}</button>
        );
    }
});

export default FormButton;