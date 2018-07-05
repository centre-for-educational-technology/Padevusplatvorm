import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as userActions from "../actions/user";
import history from "../config/history";
import LoginForm from "../components/login/LoginForm";
import {Container, Card, Divider} from "semantic-ui-react";

import {withRouter} from "react-router";

class LoginContainer extends Component {
    componentDidMount() {
        console.log(this.props);
        if (this.props.userId > 0) {
            history.push("/dashboard");
        }
    }

    render() {
        return (
            <Container>
                <Card.Group centered>
                    <Card>
                        <Card.Content>
                            <Card.Header>
                                <h1 className="tlu narrow red">
                                    Logi sisse
                                </h1>
                            </Card.Header>
                            <Divider/>
                            <LoginForm login={this.props.actions.login}/>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Container>
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
