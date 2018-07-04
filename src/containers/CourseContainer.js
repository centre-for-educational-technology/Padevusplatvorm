import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as standardActions from "../actions/standard";
import * as courseActions from "../actions/course";
import {withRouter} from "react-router";
import history from "../config/history";
import AddCourseForm from "../components/course/AddCourseForm";
import {Container, Segment, Dimmer, Loader} from "semantic-ui-react";
import ViewCourse from "../components/course/ViewCourse";

class CourseContainer extends Component {

    componentDidMount() {
        if (!this.props.userId || this.props.userId < 1) {
            history.push("/login");
        }
        const courseId = this.props.match.params.courseId;
        if (courseId) {
            this.props.courseActions.getCourse(courseId);
        } else {
            this.props.standardActions.getAllStandards();
            this.props.courseActions.getFreeformCompetencies();
        }
    }

    render() {
        const {course, standard} = this.props;
        const title = course.selectedCourse
            ? course.selectedCourse.code + " " + course.selectedCourse.title
            : "Uus aine";
        return (
            <Container>
                <h1 className="tlu narrow red">
                    {title}
                </h1>
                <Segment>
                    {course.isLoading || standard.isLoading
                        ? (
                            <Dimmer active inverted>
                                <Loader inverted>Laen...</Loader>
                            </Dimmer>
                        )
                        : null}
                    {course.selectedCourse
                        ? <ViewCourse course={course.selectedCourse}/>
                        : (
                            <AddCourseForm
                                course={course.addCourseForm}
                                freeformCompetencies={course.freeformCompetencies}
                                standards={standard.standardsList}
                                selectedStandard={standard.selectedStandard}
                                getStandard={this.props.standardActions.getStandard}
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
        course: state.course,
        standard: state.standard,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        standardActions: bindActionCreators(standardActions, dispatch),
        courseActions: bindActionCreators(courseActions, dispatch)
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CourseContainer)
);
