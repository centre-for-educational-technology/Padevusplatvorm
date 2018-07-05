import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as userActions from "../actions/user";
import history from "../config/history";
import {Container, Card, Divider} from "semantic-ui-react";

import {withRouter} from "react-router";
import RegistrationForm from "../components/register/RegistrationForm";

class RegistrationContainer extends Component {

    state = {
        registerSuccess: false
    };

    componentDidMount() {
        if (this.props.userId > 0) {
            history.push("/dashboard");
        }
    }

    componentWillReceiveProps(props) {
        if (this.props.isRegistering && !props.isRegistering) {
            this.setState({registerSuccess: true});
        }
    }


    render() {
        if (this.state.registerSuccess) {
            return (
                <a href="/login">
                    Oled registreeritud. Palun logi sisse.
                </a>
            );
        }
        return (
            <Container>
                <Card.Group centered>
                    <Card>
                        {this.state.registerSuccess
                            ? (<Card.Content>
                                <Card.Header>
                                    <h1 className="tlu narrow red">
                                        Oled registreeritud!
                                    </h1>
                                </Card.Header>
                                <Divider/>
                                <Card.Description>
                                    Palun <a href="/login">logi sisse</a>.
                                </Card.Description>
                            </Card.Content>)
                            : (
                                <Card.Content>
                                    <Card.Header>
                                        <h1 className="tlu narrow red">
                                            Registreerimine
                                        </h1>
                                    </Card.Header>
                                    <Divider/>
                                    <RegistrationForm
                                        register={this.props.actions.register}
                                    />
                                </Card.Content>
                            )}
                    </Card>
                </Card.Group>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isRegistering: state.user.isRegistering,
        errorMessage: state.user.registerErrorMessage,
        userId: state.user.userId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer)
);
