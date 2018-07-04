import React, {Component} from "react";
import {List, Form, Dropdown} from "semantic-ui-react"

export default class AddModule extends Component {

    render() {
        const {index, module, courses} = this.props;
        return (
            <List.Content style={{width: "100%"}}>
                <Form.Field>
                    <Form.Input
                        required
                        type="text"
                        min={3}
                        max={64}
                        label="Mooduli nimi"
                        placeholder="Mooduli nimi"
                        width={8}
                        value={module.name}
                        onChange={e => this.props.changeField(index, "name", e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        required
                        type="number"
                        label="Ainepunktid"
                        placeholder="Ainepunktid"
                        width={8}
                        value={module.volume}
                        onChange={e => this.props.changeField(index, "volume", e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.TextArea
                        required
                        type="text"
                        min={3}
                        max={256}
                        label="Mooduli eesmärgid"
                        placeholder="Mooduli eesmärgid"
                        width={8}
                        value={module.objectives}
                        onChange={e => this.props.changeField(index, "objectives", e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.TextArea
                        required
                        type="text"
                        min={3}
                        max={1024}
                        label="Mooduli õpiväljundid"
                        placeholder="Mooduli õpiväljundid"
                        width={8}
                        value={module.outcomes}
                        onChange={e => this.props.changeField(index, "outcomes", e.target.value)}
                    />
                </Form.Field>
                <hr/>
                <Form.Field>
                    <Form.Field required>
                        <label>Õppeained</label>
                        <Dropdown placeholder="Õppeained" fluid multiple search selection
                                  options={
                                      courses.map((course) => {
                                          return {
                                              key: course.id,
                                              value: course.id,
                                              text: course.code + " " + course.title
                                          };
                                      })
                                  }
                                  value={module.courses}
                                  onChange={(e, {value}) => this.props.setCourses(index, value)}
                        />
                    </Form.Field>
                </Form.Field>
            </List.Content>
        );
    }
}


