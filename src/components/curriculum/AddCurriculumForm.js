import React, {Component} from "react";
import {Form, List, Button, Radio, Dropdown} from "semantic-ui-react";


import AddModule from "./AddModule";

export default class AddCurriculumForm extends Component {

    componentWillReceiveProps() {
        this.setState({
            isValid: true
        });
    }

    validateAndSave(curriculum) {
        this.setState({
            isValidating: true
        });
        const form = document.getElementById("add-curriculum-form");
        let isValid = true;
        Object.keys(form.elements).forEach((el) => {
            const formElement = form.elements[el];
            if (formElement.validity && !formElement.validity.valid) {
                isValid = false;
            }
        });
        if (curriculum.modules.length < 1 || curriculum.standard.length < 1) {
            isValid = false;
        }
        if (isValid) {
            this.props.curriculumActions.saveCurriculum(curriculum);
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
        const {curriculum, standard, course, curriculumActions} = this.props;
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
                <Form id="add-curriculum-form">
                    <h3 className="tlu red narrow subtitle">Üldinfo</h3>
                    <Form.Field>
                        <Form.Input
                            required
                            type="text"
                            min={3}
                            max={64}
                            label="Õppekava nimi"
                            placeholder="Õppekava nimi"
                            value={curriculum.title}
                            onChange={e => curriculumActions.changeField("title", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            required
                            type="text"
                            min={3}
                            max={16}
                            label="Kood"
                            placeholder="Kood"
                            value={curriculum.code}
                            onChange={e => curriculumActions.changeField("code", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            required
                            type="text"
                            min={1}
                            max={11}
                            label="Koordinaator"
                            placeholder="Koordinaator"
                            value={curriculum.coordinator}
                            onChange={e => curriculumActions.changeField("coordinator", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            required
                            type="text"
                            min={3}
                            max={64}
                            label="Õppekavagrupp"
                            placeholder="Õppekavagrupp"
                            value={curriculum.programmeGroup}
                            onChange={e => curriculumActions.changeField("programmeGroup", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            required
                            type="number"
                            label="Kestus"
                            placeholder="Kestus"
                            value={curriculum.duration}
                            onChange={e => curriculumActions.changeField("duration", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            required
                            type="number"
                            label="Valiidsusperioodi algus"
                            placeholder="Valiidsusperioodi algus"
                            value={curriculum.validityStart}
                            onChange={e => curriculumActions.changeField("validityStart", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            required
                            type="number"
                            label="Valiidsusperioodi lõpp"
                            placeholder="Valiidsusperioodi lõpp"
                            value={curriculum.validityEnd}
                            onChange={e => curriculumActions.changeField("validityEnd", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Õppetase</label>
                        <Radio
                            label="Bakalaureuseõpe"
                            name="studyLevel"
                            value="autumn"
                            checked={curriculum.studyLevel === "bachelor"}
                            onChange={() => curriculumActions.changeField("studyLevel", "bachelor")}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label="Magistriõpe"
                            name="studyLevel"
                            value="spring"
                            checked={curriculum.studyLevel === "masters"}
                            onChange={() => curriculumActions.changeField("studyLevel", "masters")}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label="Doktoriõpe"
                            name="studyLevel"
                            value="spring"
                            checked={curriculum.studyLevel === "phd"}
                            onChange={() => curriculumActions.changeField("studyLevel", "phd")}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Kutsestandard</label>
                        <Dropdown
                            min={1}
                            placeholder="Kutsestandard"
                            fluid
                            search
                            selection
                            value={curriculum.standard}
                            options={
                                standard.standardsList.map((std) => {
                                    return {
                                        key: std.id,
                                        value: std.id,
                                        text: std.name
                                    };
                                })
                            }
                            onChange={(e, {value}) => curriculumActions.changeField("standard", value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <h3 className="tlu red narrow subtitle">Moodulid</h3>
                        <List divided relaxed>
                            {curriculum.modules.map((item, key) => {
                                return (
                                    <List.Item key={key}>
                                        <List.Icon
                                            name="minus"
                                            size="large"
                                            verticalAlign="middle"
                                            circular link
                                            onClick={() => curriculumActions.removeModule(key)}/>
                                        <AddModule
                                            index={key}
                                            module={item}
                                            courses={course.courseList}
                                            changeField={curriculumActions.changeModuleField}
                                            setCourses={curriculumActions.setModuleCourses}
                                        />
                                    </List.Item>
                                );
                            })}
                        </List>
                        <Button onClick={curriculumActions.addModule}>Lisa moodul</Button>
                    </Form.Field>
                    <Button
                        className="red-bg"
                        type="submit"
                        loading={this.state.isValidating}
                        disabled={!this.state.isValid}
                        onClick={() => this.validateAndSave(curriculum)}>
                        Salvesta
                    </Button>
                </Form>
            </div>
        );
    }
}

