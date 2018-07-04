import React from 'react';
import './Menu.css';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../../actions/user';
import {Icon} from "semantic-ui-react";

const Menu = ({userId, actions}) => (
    <div className="menu">
        <h1 className="tlu title">
            <span className="narrow">Pädevusplatvorm</span>
            {userId > 0
                ? (
                    <div className="right-item">
                        <a style={{color: "#ffffff", marginRight: "12px"}} href="/dashboard">Esileht</a>
                        <a style={{color: "#ffffff", marginRight: "12px"}} href="/profile">Minu profiil</a>
                        <span onClick={() => actions.logout()}>Logout</span>
                    </div>
                )
                : null}
        </h1>
    </div>
);


function mapStateToProps(state) {
    return {
        userId: state.user.userId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Menu)
);