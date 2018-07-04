import React, {Component} from 'react';
import {Button, Dimmer, Loader, Segment, Grid, Divider} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from "moment/moment";

export default class ArticlesList extends Component {
	constructor(){
		super();
		this.removeItem = this.removeItem.bind(this);
	}


	removeItem(id){
		if (window.confirm("Are you sure you want to delete this item?")) {
            this.props.removeItem(id);
		}
	}

	render() {
		if (this.props.failed) {
			return (
				<Segment textAlign="center">
					<h2>
						{this.props.errorMessage}
					</h2>
				</Segment>
			);
		}
		if (this.props.items.length < 1) {
			return (
				<Segment textAlign="center">
					<h2>
						No articles to display.
					</h2>
				</Segment>
			);
		}
		const articles = this.props.items.map((item, key) => {
            let added = moment.utc(item.date_added, moment.defaultFormatUtc);
            return [
            	<Grid.Row key={key+"-img"}>
                    <Grid.Column width={16} verticalAlign="middle" textAlign="center">
                        <img alt={item.title} src={item.image}/>
                    </Grid.Column>
				</Grid.Row>,
            	<Grid.Row key={key+"-title"}>
                    <Grid.Column width={16} verticalAlign="middle">
                        <b>{item.title}</b>
                    </Grid.Column>
				</Grid.Row>,
				<Grid.Row key={key+"-header"} verticalAlign="middle">
					<Grid.Column width={16}>
						Added by <b>{item.user}</b>
					</Grid.Column>
				</Grid.Row>,
				<Grid.Row key={key+"-date"} verticalAlign="middle">
					<Grid.Column width={10}>
						Added on <b>{added.format('MMM Do YYYY [at] HH:mm:ss')}</b>
					</Grid.Column>
                    <Grid.Column width={6} textAlign="right">
                        <Button color="red" size="tiny" onClick={() => {
                            this.removeItem(item.id)
                        }}>Delete</Button>
                    </Grid.Column>
				</Grid.Row>,
				<Divider section key={key+"-divider"} />
            ];
		});
		return (
			<Segment>
				<Dimmer style={{height: "100vh"}} active={this.props.isLoading}>
					<Loader active={this.props.isLoading}/>
				</Dimmer>
				<Grid columns={2}>
					{articles}
				</Grid>
			</Segment>
		);
	}
}

ArticlesList.propTypes = {
	items: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
	failed: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string.isRequired,
	removeItem: PropTypes.func.isRequired
};

ArticlesList.defaultProps = {
	items: [],
	isLoading: true,
	failed: false,
	errorMessage: '',
	removeItem: () => {
		console.log('MISSING REMOVE ITEM ACTION.')
	}
};
