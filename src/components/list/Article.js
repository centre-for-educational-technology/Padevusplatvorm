import React from 'react';
import {Grid} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './Article.css';
import {isMobile} from '../../common/helper';
import TimeAgo from 'react-timeago';
import moment from 'moment';

const rowClick = (link) => {
    if (isMobile()) {
        window.location.href = link;
    } else {
        window.open(link, '_blank');
    }
};

const Article = (props) => {
    let max = moment().subtract(24, 'hours');
    let added = moment.utc(props.item.date_added, moment.defaultFormatUtc);
    const style = {
        padding: "0"
    };
    if (props.admin) {
        style.margin = "auto";
    }
    return (
        <div
            onClick={() => {
                rowClick(props.item.link)
            }}
            className="article"
            key={props.item.id}
            style={style}
        >
            <Grid.Column textAlign="center" className="article-image-container">
                <img alt={props.item.title}
                     className="article-image"
                     src={props.item.image}
                />
            </Grid.Column>
            <Grid.Column className="article-title">
                <h3>{props.item.title}</h3>
            </Grid.Column>
            <Grid.Column className="article-description">
                {props.item.description}
            </Grid.Column>
            <Grid.Column className="article-footer">
                <div className="article-date">
                    Added&nbsp;
                    {added.isAfter(max) ?
                        <TimeAgo live={true} date={props.item.date_added}/> :
                        added.format('DD MMM YYYY')
                    }
                </div>
                {props.item.hasOwnProperty("site_name") ? (
                    <div className="article-source">
                        Source: {props.item.site_name}
                    </div>
                ) : null}
            </Grid.Column>
        </div>
    );
};

Article.propTypes = {
    item: PropTypes.object.isRequired,
    admin: PropTypes.bool
};

Article.defaultProps = {
    item: {}
};

export default Article;
