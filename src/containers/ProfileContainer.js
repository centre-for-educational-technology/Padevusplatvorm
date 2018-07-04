import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as profileActions from "../actions/profile";
import {withRouter} from "react-router";
import history from "../config/history";
import AddProfileForm from "../components/profile/AddProfileForm";
import {Container, Segment, Dimmer, Loader} from "semantic-ui-react";


class ProfileContainer extends Component {

    componentDidMount() {
        if (!this.props.userId || this.props.userId < 1) {
            history.push("/login");
        }
        const userId = this.props.match.params.userId;
        if (userId) {
            this.props.profileActions.getProfile(userId);
        } else {
            this.props.profileActions.getProfile(this.props.userId);
        }
    }

    render() {
        const {isLoading, selectedProfile} = this.props.profile;
        const title = selectedProfile
            ? selectedProfile.firstName + " " + selectedProfile.lastName
            : "Minu profiil";
        return (
            <Container>
                <h1 className="tlu narrow red">
                    {title}
                </h1>
                <Segment>
                    {isLoading
                        ? (
                            <Dimmer active inverted>
                                <Loader inverted>Laen...</Loader>
                            </Dimmer>
                        )
                        : null}
                    {selectedProfile && selectedProfile.user !== this.props.userId
                        ? selectedProfile.firstName
                        : (
                            <AddProfileForm
                                userId={this.props.userId}
                                token={this.props.token}
                                profile={selectedProfile
                                    ? selectedProfile
                                    : this.props.profile.addProfileForm}
                                profileActions={this.props.profileActions}
                            />
                        )
                    }

                </Segment>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.user.userId,
        profile: state.profile
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch)
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
);
