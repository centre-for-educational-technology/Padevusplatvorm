import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Button} from "semantic-ui-react";

export default class RegistrationForm extends Component {
    state = {
        email: '',
        password: ''
    };

    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
    }

    register() {
        this.props.register(this.state.email, this.state.password);
    }

    render() {
        return (
            <Form id="registration-form">
                <Form.Input
                    placeholder="Email"
                    onChange={e => this.setState({...this.state, email: e.target.value})}
                />
                <Form.Input
                    placeholder="Parool"
                    type="password"
                    onChange={e => this.setState({...this.state, password: e.target.value})}
                />
                <Button
                    fluid
                    className="red-bg"
                    type="submit"
                    onClick={this.register}>
                    Registreeri
                </Button>
            </Form>
        );
    }
}

RegistrationForm.propTypes = {
    register: PropTypes.func.isRequired,
};

RegistrationForm.defaultProps = {
    register: () => {
        console.log("Unset registration function!");
    }
};
