import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Container, Segment, Grid, Dimmer, Loader} from 'semantic-ui-react';
import history from '../config/history';
import * as standardActions from '../actions/standard';
import * as curriculumActions from '../actions/curriculum';
import * as courseActions from '../actions/course';
import {bindActionCreators} from 'redux';

class DashboardContainer extends Component {

    componentWillMount() {
        this.props.standardActions.getAllStandards();
        this.props.curriculumActions.getAllCurricula();
        this.props.courseActions.getAllCourses();
    }

    componentDidMount() {
        if (!this.props.userId || this.props.userId < 1) {
            history.push('/login');
        }
    }

    render() {
        const {standard, curriculum, course} = this.props;
        const dimmer = (
            <Dimmer active inverted>
                <Loader inverted>Laen...</Loader>
            </Dimmer>
        );
        return (
            <Container>
                <Segment>
                <Grid stackable divided columns={3}>
                    <Grid.Column>
                        <h1 className="tlu narrow red">Standardid</h1>
                        <a href="/standard">
                            Lisa uus
                        </a>
                        {!standard.isLoading
                            ? (<ol>
                                {standard.standardsList.map((standard, standardKey) => {
                                    return (
                                        <li key={standardKey}>
                                            <a href={'/standard/view/' + standard.id}>
                                                {standard.name}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ol>)
                            : dimmer}
                    </Grid.Column>
                    <Grid.Column>
                        <h1 className="tlu narrow red">Õppeained</h1>
                        <a href="/course">
                            Lisa uus
                        </a>
                        {!course.isLoading
                            ? (<ol>
                                {course.coursesList.map((course, courseKey) => {
                                    return (
                                        <li key={courseKey}>
                                            <a href={'/course/view/' + course.id}>
                                                {course.title}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ol>)
                            : dimmer}
                    </Grid.Column>
                    <Grid.Column>
                        <h1 className="tlu narrow red">Õppekavad</h1>
                        <a href="/curriculum">
                            Lisa uus
                        </a>
                        {!curriculum.isLoading
                            ? (<ol>
                                {curriculum.curriculaList.map((curriculum, curriculumKey) => {
                                    return (
                                        <li key={curriculumKey}>
                                            <a href={'/curriculum/view/' + curriculum.id}>
                                                {curriculum.title}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ol>)
                            : dimmer}
                    </Grid.Column>
                </Grid>
                </Segment>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.user.userId,
        standard: state.standard,
        curriculum: state.curriculum,
        course: state.course
    };
}

function mapDispatchToProps(dispatch) {
    return {
        standardActions: bindActionCreators(standardActions, dispatch),
        curriculumActions: bindActionCreators(curriculumActions, dispatch),
        courseActions: bindActionCreators(courseActions, dispatch)
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
);
