import React, {Component} from "react";
import {Grid, List} from "semantic-ui-react";

export default class ViewStandard extends Component {

    render() {
        const {standard} = this.props;
        return (
            <div>
                {standard.description}
                <br/>
                <h3 className="tlu red narrow subtitle">
                    Pädevused
                </h3>
                <hr/>
                <List divided>
                    {standard.competencies.map((competency, competencyKey) => {
                        return (
                            <List.Item key={competencyKey}>
                                <h3 className="tlu">
                                    {competency.name}
                                </h3>
                                <Grid>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            <b>Teadmised</b>
                                            {competency.knowledge.map((knowledge, knowledgeKey) => {
                                                return (
                                                    <li key={knowledgeKey}>
                                                        {knowledge.name}
                                                    </li>
                                                )
                                            })}
                                        </Grid.Column>
                                        <Grid.Column>
                                            <b>Oskused</b>
                                            {competency.skills.map((skill, skillKey) => {
                                                return (
                                                    <li key={skillKey}>
                                                        {skill.name}
                                                    </li>
                                                )
                                            })}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </List.Item>
                        );
                    })}
                </List>
            </div>
        );
    }
}

