import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as userActions from "../actions/user";
import history from "../config/history";
import LoginForm from "../components/login/LoginForm";

import {withRouter} from "react-router";

class LoginContainer extends Component {
	componentDidMount() {
		if (this.props.userId > 0) {
			history.push("/admin");
		}
	}

	render() {
		return (
			<LoginForm login={this.props.actions.login}/>
		);
	}
}

function mapStateToProps(state) {
	return {
		isLoading: state.user.isLoggingIn,
		errorMessage: state.user.loginErrorMessage,
		userId: state.user.userId
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(userActions, dispatch)
	};
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
);
