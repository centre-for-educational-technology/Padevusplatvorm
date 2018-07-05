import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Container, Icon, Button, Divider} from "semantic-ui-react";
import history from "../config/history";

class IntroContainer extends Component {

    render() {
        return (
            <Container text>
                <h1 className="tlu narrow red">
                    Prototüüp
                </h1>
                <Divider/>
                <p>
                    Pädevusplatvormi eesmärk on toetada DTI õppejõude, tudengeid ja teisi osapooli pädevusalase info
                    hankimisel ja kaardistamisel. Õppekava koordinaatorid ja õppejõud saavad võrrelda õppekavade ja
                    -ainete vastavust kutsestandardile ning tõsta oma ainete ja õppekavade nähtavust. Tudengid saavad
                    luua enda Curriculum Vitae, kus kajastub ülevaade nende akadeemilisest progressist ja omandatud
                    pädevustest.
                </p>
                <Divider/>
                <ul>
                    <li>
                        <a style={{textDecoration: "none"}}
                           href="https://github.com/centre-for-educational-technology/Padevusplatvorm/wiki/Project-Purpose-and-Roadmap">
                            <Icon name="info circle"/> Wiki
                        </a>
                    </li>
                    <li>
                        <a style={{textDecoration: "none"}}
                           href="https://github.com/centre-for-educational-technology/Padevusplatvorm">
                            <Icon name="file"/> Front-end repo
                        </a>
                    </li>

                    <li>
                        <a style={{textDecoration: "none"}}
                           href="https://github.com/centre-for-educational-technology/Padevusplatvorm-be">
                            <Icon name="database"/> Back-end repo
                        </a>
                    </li>
                </ul>
                <Divider/>
                <Button.Group size="massive" fluid>
                    <Button className="red-bg" onClick={() => history.push("/login")}>Logi sisse</Button>
                    <Button.Or text='või'/>
                    <Button className="red-border"
                            onClick={() => history.push("/register")}>Registreeri end</Button>
                </Button.Group>
            </Container>
        );
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
