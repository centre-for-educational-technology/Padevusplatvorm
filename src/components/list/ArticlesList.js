import React from 'react';
import {Container, Dimmer, Loader, Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Article from './Article';
import './ArticlesList.css';

const ArticlesList = (props) => {
    if (props.failed) {
        return (
            <Segment textAlign="center">
                <h2>
                    {props.errorMessage}
                </h2>
            </Segment>
        );
    }
    if (props.items.length < 1 && !props.isLoading) {
        return (
            <Segment textAlign="center">
                <h2>
                    No articles to display. Check back later.
                </h2>
            </Segment>
        );
    }
    const articles = props.items.map((item, key) => {
        return (
            <Article key={key} item={item}/>
        );
    });
    return (
        <Container fluid>
            <Dimmer inverted style={{height: "100vh"}} active={props.isLoading}>
                <Loader active={props.isLoading}/>
            </Dimmer>
            <div className="articles-list">
                {articles}
            </div>
        </Container>
    );
};

ArticlesList.propTypes = {
    items: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    failed: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired
};

ArticlesList.defaultProps = {
    items: [],
    isLoading: true,
    failed: false,
    errorMessage: ''
};

export default ArticlesList;
