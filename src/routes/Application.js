import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import LoginContainer from '../containers/LoginContainer';
import ListContainer from '../containers/ListContainer';
import DashboardContainer from "../containers/DashboardContainer";
import StandardContainer from "../containers/StandardContainer";
import CourseContainer from "../containers/CourseContainer";
import CurriculumContainer from "../containers/CurriculumContainer";
import ProfileContainer from "../containers/ProfileContainer";

class Application extends Component {

	render() {
        if (this.props.userId > 0) {
            return (
                <Switch>
                    <Route exact path="/standard/view/:standardId(\d+)" component={StandardContainer}/>
                    <Route path="/standard" component={StandardContainer}/>
                    <Route exact path="/course/view/:courseId(\d+)" component={CourseContainer}/>
                    <Route path="/course" component={CourseContainer}/>
                    <Route exact path="/curriculum/view/:curriculumId(\d+)" component={CurriculumContainer}/>
                    <Route path="/curriculum" component={CurriculumContainer}/>
                    <Route exact path="/profile/view/:userId(\d+)" component={ProfileContainer}/>
                    <Route path="/profile" component={ProfileContainer}/>
                    <Route path="/dashboard" component={DashboardContainer}/>
                    <Route component={DashboardContainer}/>
                </Switch>
            );
        }
		return (
			<Switch>
                <Route exact path="/" component={ListContainer}/>
                <Route exact path="/login" component={LoginContainer}/>
				<Route component={ListContainer}/>
			</Switch>
		);
	}
}

function mapStateToProps(state) {
    return {
        userId: state.user.userId
    }
}

export default withRouter(connect(mapStateToProps)(Application));
