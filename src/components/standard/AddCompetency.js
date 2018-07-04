import React, {Component} from "react";
import {Grid, Icon, List, Form} from "semantic-ui-react"

export default class AddCompetency extends Component {

    render() {
        const {competency, index, standardActions} = this.props;
        return (
            <List.Content style={{width: "100%"}}>
                <Form.Input
                    required
                    type="text"
                    min={3}
                    max={256}
                    label="Pädevus"
                    width={8}
                    value={competency.name}
                    onChange={e => standardActions.changeCompetency(index, e.target.value)}/>
                <hr/>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column width={8}>
                            <label>Oskused&nbsp;
                                <Icon name="plus" size="small" inverted circular link
                                      onClick={() => standardActions.addSkill(index)}/>
                            </label>
                            <ul>
                                {competency.skills.map((item, key) => {
                                    return (
                                        <li key={key}>
                                            <Form.Input
                                                required
                                                type="text"
                                                min={3}
                                                max={512}
                                                placeholder="Oskus"
                                                icon={<Icon name="minus" inverted circular link
                                                            onClick={() => standardActions.removeSkill(index, key)}/>}
                                                value={item.name}
                                                onChange={e => standardActions.setSkill(index, key, e.target.value)}/>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <label>Teadmised&nbsp;
                                <Icon name="plus" size="small" inverted circular link
                                      onClick={() => standardActions.addKnowledge(index)}/>
                            </label>
                            <ul>
                                {competency.knowledge.map((item, key) => {
                                    return (
                                        <li key={key}>
                                            <Form.Input
                                                required
                                                type="text"
                                                min={3}
                                                max={512}
                                                placeholder="Teadmine"
                                                icon={<Icon name="minus" inverted circular link
                                                            onClick={() => standardActions.removeKnowledge(index, key)}/>}
                                                value={item.name}
                                                onChange={e => standardActions.setKnowledge(index, key, e.target.value)}/>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </List.Content>
        );
    }
}


