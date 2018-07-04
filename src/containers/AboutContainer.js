import React, {Component} from "react";
import "./AboutContainer.css";

export default class AboutContainer extends Component {
	componentDidMount(){
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div className="about-container content-container">
				<h3>
					About us
				</h3>
				<p>
					Asd
				</p>
			</div>
		);
	}
}