import React, {Component} from "react";
import {Grid, List, Form, Button, Radio, Checkbox, Dropdown} from "semantic-ui-react";

import "./AddCourseForm.css";

export default class AddCourseForm extends Component {

    componentWillReceiveProps() {
        this.setState({
            isValid: true
        });
    }

    validateAndSave(course) {
        this.setState({
            isValidating: true
        });
        const form = document.getElementById("add-course-form");
        let isValid = true;
        Object.keys(form.elements).forEach((el) => {
            const formElement = form.elements[el];
            if (formElement.validity && !formElement.validity.valid) {
                isValid = false;
            }
        });
        if (course.competencies.length < 1 || course.standard.length < 1) {
            isValid = false;
        }
        if (isValid) {
            this.props.courseActions.saveCourse(course)
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
        const {course, selectedStandard, standards, freeformCompetencies, courseActions} = this.props;
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
                <Form id="add-course-form">
                    <h3 className="tlu red narrow subtitle">Üldinfo</h3>
                    <Form.Field>
                        <Form.Input
                            required
                            type="text"
                            min={3}
                            max={64}
                            label="Aine nimi"
                            placeholder="Aine nimi"
                            value={course.title}
                            onChange={e => courseActions.changeField("title", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            required
                            type="text"
                            min={3}
                            max={16}
                            label="Ainekood"
                            placeholder="Ainekood"
                            value={course.code}
                            onChange={e => courseActions.changeField("code", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            required
                            type="number"
                            label="EAP"
                            placeholder="EAP"
                            value={course.volume}
                            onChange={e => courseActions.changeField("volume", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            required
                            type="number"
                            label="Kontakttundide arv"
                            placeholder="Kontakttundide arv"
                            value={course.contactHours}
                            onChange={e => courseActions.changeField("contactHours", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Semester</label>
                        <Radio
                            label="Sügis"
                            name="semester"
                            value="autumn"
                            checked={course.semester === "autumn"}
                            onChange={() => courseActions.changeField("semester", "autumn")}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label="Kevad"
                            name="semester"
                            value="spring"
                            checked={course.semester === "spring"}
                            onChange={() => courseActions.changeField("semester", "spring")}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Arvestuse tüüp</label>
                        <Radio
                            label="Eksam"
                            name="assessment"
                            value="exam"
                            checked={course.assessment === "exam"}
                            onChange={() => courseActions.changeField("assessment", "exam")}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label="Arvestus"
                            name="assessment"
                            value="assessment"
                            checked={course.assessment === "assessment"}
                            onChange={() => courseActions.changeField("assessment", "assessment")}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            required
                            type="text"
                            label="Lektor"
                            placeholder="Lektor"
                            value={course.lecturer}
                            onChange={e => courseActions.changeField("lecturer", e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <h3 className="tlu red narrow subtitle">Kutsestandard ja pädevused</h3>
                        <label>Kutsestandard</label>
                        {standards
                            ? (<Dropdown
                                placeholder="Kutsestandard"
                                fluid
                                search
                                selection
                                value={course.standard}
                                options={
                                    standards.map((std) => {
                                        return {
                                            key: std.id,
                                            value: std.id,
                                            text: std.name + ", tase " + std.level
                                        };
                                    })
                                }
                                onChange={(e, {value}) => {
                                    courseActions.changeField("standard", value);
                                    this.props.getStandard(value);
                                }}
                            />)
                            : null}
                    </Form.Field>
                    {selectedStandard ? (
                            <List>
                                {selectedStandard.competencies.map((competency) => {
                                    return (
                                        <List.Item key={competency.id}>
                                            <h3 className="tlu">
                                                {competency.name}
                                            </h3>
                                            <Grid>
                                                <Grid.Row columns={2}>
                                                    <Grid.Column>
                                                        <b>Teadmised</b>
                                                        <ul>
                                                            {competency.knowledge.map((knowledge, knowledgeKey) => {
                                                                return (
                                                                    <li key={knowledgeKey}>
                                                                        <Checkbox
                                                                            value={knowledge.id}
                                                                            label={knowledge.name}
                                                                            checked={course.competencies.indexOf(knowledge.id) > -1}
                                                                            onChange={() => {
                                                                                if (course.competencies.indexOf(knowledge.id) > -1) {
                                                                                    courseActions.removeCourseCompetency(knowledge.id);
                                                                                } else {
                                                                                    courseActions.addCourseCompetency(knowledge.id);
                                                                                }
                                                                            }}
                                                                        />
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <b>Oskused</b>
                                                        <ul>
                                                            {competency.skills.map((skill, skillKey) => {
                                                                return (
                                                                    <li key={skillKey}>
                                                                        <Checkbox
                                                                            value={skill.id}
                                                                            label={skill.name}
                                                                            checked={course.competencies.indexOf(skill.id) > -1}
                                                                            onChange={() => {
                                                                                if (course.competencies.indexOf(skill.id) > -1) {
                                                                                    courseActions.removeCourseCompetency(skill.id);
                                                                                } else {
                                                                                    courseActions.addCourseCompetency(skill.id);
                                                                                }
                                                                            }}
                                                                        />
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </List.Item>
                                    );
                                })}
                            </List>)
                        : null}
                    {freeformCompetencies ? (
                        <Form.Field>
                            <label>Lisapädevused</label>
                            <Dropdown
                                options={freeformCompetencies.map((cmp) => {
                                    return {
                                        key: cmp.id,
                                        value: cmp.id,
                                        text: cmp.name
                                    };
                                })}
                                placeholder="Vali või lisa pädevus"
                                search
                                selection
                                fluid
                                multiple
                                allowAdditions
                                value={course.freeformCompetencies}
                                onAddItem={(e, {value}) => {
                                    courseActions.saveFreeformCompetency({name: value})
                                }}
                                onChange={(e, {value}) => {
                                    courseActions.setFreeformCompetencies(value);
                                }}
                            />
                        </Form.Field>
                    ) : null}
                    <Button
                        className="red-bg"
                        type="submit"
                        loading={this.state.isValidating}
                        disabled={!this.state.isValid}
                        onClick={() => this.validateAndSave(course)}>
                        Salvesta
                    </Button>
                </Form>
            </div>
        );
    }
}

