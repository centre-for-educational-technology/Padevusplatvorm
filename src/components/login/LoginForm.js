import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './LoginForm.css';

export default class LoginForm extends Component {
	state = {
		email: '',
		password: ''
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
			<Form id="login-form" onSubmit={this.login}>
				<Form.Input
					placeholder="Email"
					onChange={e => this.setState({...this.state, email: e.target.value})}
				/>
				<Form.Input
					placeholder="Password"
					type="password"
					onChange={e => this.setState({...this.state, password: e.target.value})}
				/>
				<Form.Button id="login-form-button">
					Login
				</Form.Button>
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
