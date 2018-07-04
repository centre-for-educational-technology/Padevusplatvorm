import React, {Component} from "react";
import {Form, Button} from "semantic-ui-react";

export default class AddProfileForm extends Component {

    componentWillReceiveProps() {
        this.setState({
            isValid: true
        });
    }

    validateAndSave(profile) {
        this.setState({
            isValidating: true
        });
        const form = document.getElementById("add-profile-form");
        let isValid = true;
        Object.keys(form.elements).forEach((el) => {
            const formElement = form.elements[el];
            if (formElement.validity && !formElement.validity.valid) {
                isValid = false;
            }
        });
        if (isValid) {
            this.props.profileActions.saveProfile({
                ...profile,
                userId: this.props.userId,
                token: this.props.token
            });
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
        const {profile, profileActions} = this.props;
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
                <Form id="add-profile-form">
                    <h3 className="tlu red narrow subtitle">Üldinfo</h3>
                    <Form.Field>
                        <Form.Input
                            required
                            type="text"
                            min={3}
                            max={64}
                            label="Eesnimi"
                            placeholder="Eesnimi"
                            value={profile.firstName}
                            onChange={e => profileActions.changeField("firstName", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            required
                            type="text"
                            min={3}
                            max={64}
                            label="Perenimi"
                            placeholder="Perenimi"
                            value={profile.lastName}
                            onChange={e => profileActions.changeField("lastName", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.TextArea
                            required
                            type="text"
                            min={3}
                            max={1024}
                            label="Kirjeldus"
                            placeholder="Kirjeldus"
                            value={profile.description}
                            onChange={e => profileActions.changeField("description", e.target.value)}
                        />
                    </Form.Field>
                    <Button
                        className="red-bg"
                        type="submit"
                        loading={this.state.isValidating}
                        disabled={!this.state.isValid}
                        onClick={() => this.validateAndSave(profile)}>
                        Salvesta
                    </Button>
                </Form>
            </div>
        );
    }
}

