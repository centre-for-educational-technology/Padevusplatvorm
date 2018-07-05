import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Button} from "semantic-ui-react";

export default class RegistrationForm extends Component {

    state = {
        email: "",
        password: "",
        isValid: true,
        isValidating: false
    };

    constructor(props) {
        super(props);
        this.validateAndRegister = this.validateAndRegister.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            isValid: true
        });
    }

    validateAndRegister() {
        this.setState({
            isValidating: true
        });
        const form = document.getElementById("registration-form");
        let isValid = true;
        Object.keys(form.elements).forEach((el) => {
            const formElement = form.elements[el];
            if (formElement.validity && !formElement.validity.valid) {
                isValid = false;
            }
        });
        if (isValid) {
            this.props.register(this.state.email, this.state.password);
        } else {
            this.setState({
                isValid: false,
                isValidating: false
            });
            window.scrollTo(0, 0);
        }
    }

    render() {
        return (
            <Form id="registration-form">
                <Form.Input
                    required
                    pattern=".{3,248}@tlu.ee"
                    placeholder="Kasutajanimi@tlu.ee"
                    onChange={e => this.setState({...this.state, email: e.target.value})}
                />
                <Form.Input
                    required
                    placeholder="Parool"
                    type="password"
                    onChange={e => this.setState({...this.state, password: e.target.value})}
                />
                <Button
                    fluid
                    className="red-bg"
                    type="submit"
                    loading={this.state.isValidating}
                    onClick={this.validateAndRegister}>
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
