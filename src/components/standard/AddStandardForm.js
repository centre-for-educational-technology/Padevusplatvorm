import React, {Component} from "react";
import {Form, Button, List} from "semantic-ui-react";

import "./AddStandardForm.css";
import AddCompetency from "./AddCompetency";

export default class AddStandardForm extends Component {

    componentWillReceiveProps() {
        this.setState({
            isValid: true
        });
    }

    validateAndSave(standard) {
        this.setState({
            isValidating: true
        });
        const form = document.getElementById("add-standard-form");
        let isValid = true;
        Object.keys(form.elements).forEach((el) => {
            const formElement = form.elements[el];
            if (formElement.validity && !formElement.validity.valid) {
                isValid = false;
            }
        });
        if (standard.competencies.length < 1) {
            isValid = false;
        }
        if (isValid) {
            this.props.standardActions.saveStandard(standard);
        } else {
            this.setState({
                isValid: false,
                isValidating: false
            });
            window.scrollTo(0, 0);
        }
    }

    state = {
        isValid: true,
        isValidating: false
    };

    render() {
        const {standard, standardActions} = this.props;
        return (
            <div>
                {!this.state.isValid
                    ? (
                        <div className="ui negative message">
                            <div className="header">
                                Miskit on viltu!
                            </div>
                            <p>
                                Palun kontrolli väljad.
                            </p>
                        </div>
                    )
                    : null}
                <Form id="add-standard-form">
                    <h3 className="tlu red narrow subtitle">Üldinfo</h3>
                    <Form.Field>
                        <Form.Input
                            required
                            type="text"
                            min={3}
                            max={256}
                            label="Kutsestandardi nimi"
                            placeholder="Kutsestandardi nimi"
                            value={standard.name}
                            onChange={e => standardActions.changeField("name", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            required
                            type="number"
                            label="Kutsestandardi tase"
                            placeholder="Kutsestandardi tase"
                            value={standard.level}
                            onChange={e => standardActions.changeField("level", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.TextArea
                            required
                            min={3}
                            max={1024}
                            label="Kutsestandardi kirjeldus"
                            placeholder="Kutsestandardi kirjeldus"
                            value={standard.description}
                            onChange={e => standardActions.changeField("description", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <h3 className="tlu red narrow subtitle">Pädevused</h3>
                        <List divided relaxed>
                            {this.props.standard.competencies.map((item, key) => {
                                return (
                                    <List.Item key={key}>
                                        <List.Icon
                                            name="minus"
                                            size="large"
                                            verticalAlign="middle"
                                            circular link
                                            onClick={() => standardActions.removeCompetency(key)}/>
                                        <AddCompetency
                                            index={key}
                                            standardActions={standardActions}
                                            competency={item}
                                        />
                                    </List.Item>
                                );
                            })}
                        </List>
                        <Button onClick={standardActions.addCompetency}>Lisa pädevus</Button>
                    </Form.Field>
                    <Button
                        className="red-bg"
                        type="submit"
                        loading={this.state.isValidating}
                        disabled={!this.state.isValid}
                        onClick={() => this.validateAndSave(standard)}>
                        Salvesta
                    </Button>
                </Form>
            </div>
        );
    }
}

