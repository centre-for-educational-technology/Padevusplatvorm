import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Button} from "semantic-ui-react";

export default class LoginForm extends Component {
	state = {
		email: "",
		password: ""
	};

	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
	}

	login() {
		this.props.login(this.state.email, this.state.password);
	}

	render() {
		return (
			<Form id="login-form">
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
                    onClick={this.login}>
                    Logi sisse
                </Button>
			</Form>
		);
	}
}

LoginForm.propTypes = {
	login: PropTypes.func.isRequired
};

LoginForm.defaultProps = {
	login: () => {
		console.log("Unset login function!");
	}
};
