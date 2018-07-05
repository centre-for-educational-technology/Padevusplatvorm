import React from 'react';
import './Menu.css';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../../actions/user';
import {Dropdown} from "semantic-ui-react";

const Menu = ({userId, email, actions}) => (
    <div className="menu">
        <h1 className="tlu title">
            <span className="narrow">Pädevusplatvorm</span>
            {userId > 0
                ? (
                    <div className="right-item">
                        <a style={{color: "#ffffff", marginRight: "12px"}} href="/dashboard">Esileht</a>
                        <Dropdown item text={email}>
                            <Dropdown.Menu>
                                {/*<Dropdown.Item href="/profile">Minu profiil</Dropdown.Item>*/}
                                <Dropdown.Item onClick={() => actions.logout()}>Logi välja</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )
                : null}
        </h1>
    </div>
);


function mapStateToProps(state) {
    return {
        userId: state.user.userId,
        email: state.user.email
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