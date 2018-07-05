import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";

class IntroContainer extends Component {

	render() {
		return <div>IntroContainer</div>;
	}
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(IntroContainer)
);
