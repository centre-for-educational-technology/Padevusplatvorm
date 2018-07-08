import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as curriculumActions from "../actions/curriculum";
import * as standardActions from "../actions/standard";
import * as courseActions from "../actions/course";
import {withRouter} from "react-router";
import history from "../config/history";
import {Container, Segment, Dimmer, Loader} from "semantic-ui-react";
import AddCurriculumForm from "../components/curriculum/AddCurriculumForm";
import ViewCurriculum from "../components/curriculum/ViewCurriculum";

class CurriculumContainer extends Component {

    componentWillMount() {
        const curriculumId = this.props.match.params.curriculumId;
        if (!curriculumId) {
            this.props.standardActions.getAllStandards();
        } else {
            this.props.curriculumActions.getCurriculum(curriculumId);
            this.props.curriculumActions.getCurriculumCompliance(curriculumId);
        }
    }

    componentDidMount() {
        if (!this.props.userId || this.props.userId < 1) {
            history.push("/login");
        }
    }

    render() {
        const {isLoading, selectedCurriculum} = this.props.curriculum;
        const {selectedStandard} = this.props.standard;
        const title = selectedCurriculum ? selectedCurriculum.title : "Uus õppekava";
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
                    {selectedCurriculum
                        ? (
                            <ViewCurriculum
                                curriculum={selectedCurriculum}
                                standard={selectedStandard}
                                curriculumActions={this.props.curriculumActions}
                                standardActions={this.props.standardActions}
                            />
                        )
                        : (
                            <AddCurriculumForm
                                curriculum={this.props.curriculum.addCurriculumForm}
                                standard={this.props.standard}
                                course={this.props.course}
                                curriculumActions={this.props.curriculumActions}
                                courseActions={this.props.courseActions}
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
        curriculum: state.curriculum,
        standard: state.standard,
        course: state.course
    };
}

function mapDispatchToProps(dispatch) {
    return {
        curriculumActions: bindActionCreators(curriculumActions, dispatch),
        standardActions: bindActionCreators(standardActions, dispatch),
        courseActions: bindActionCreators(courseActions, dispatch)
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CurriculumContainer)
);
