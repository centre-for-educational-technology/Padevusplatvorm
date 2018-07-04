import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";

class ListContainer extends Component {

	render() {
		return <div>ListContainer</div>;
	}
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ListContainer)
);
