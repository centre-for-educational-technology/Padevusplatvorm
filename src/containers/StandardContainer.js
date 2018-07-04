import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as standardActions from "../actions/standard";
import {withRouter} from "react-router";
import history from "../config/history";
import AddStandardForm from "../components/standard/AddStandardForm";
import ViewStandard from "../components/standard/ViewStandard";
import {Container, Segment, Dimmer, Loader} from "semantic-ui-react";


class StandardContainer extends Component {

    componentDidMount() {
        if (!this.props.userId || this.props.userId < 1) {
            history.push("/login");
        }
        const standardId = this.props.match.params.standardId;
        if (standardId) {
            this.props.standardActions.getStandard(standardId);
        }
    }

    render() {
        const {isLoading, selectedStandard} = this.props.standard;
        const title = selectedStandard
            ? selectedStandard.name + ", tase " + selectedStandard.level
            : "Uus kutsestandard";
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
                    {selectedStandard
                        ? <ViewStandard standard={selectedStandard}/>
                        : (
                            <AddStandardForm
                                standard={this.props.standard.addStandardForm}
                                standardActions={this.props.standardActions}
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
        standard: state.standard
    };
}

function mapDispatchToProps(dispatch) {
    return {
        standardActions: bindActionCreators(standardActions, dispatch)
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StandardContainer)
);
