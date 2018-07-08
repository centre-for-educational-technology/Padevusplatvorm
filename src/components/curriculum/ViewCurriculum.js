import React, {Component} from "react";
import {Grid, Card, Label, Message, Statistic, Progress, Icon, Divider} from "semantic-ui-react";
import PieChart from "react-minimal-pie-chart";

export default class ViewCurriculum extends Component {

    studyLevels = {
        bachelor: "bakalaureuseõpe",
        masters: "magistriõpe",
        phd: "doktoriõpe"
    };

    getModules(curriculumId) {
        this.props.curriculumActions.getCurriculumModules(curriculumId);
        this.props.curriculumActions.getCurriculumCourses(curriculumId);
    }

    getCompetencies(curriculumId, standardId) {
        this.props.curriculumActions.getCurriculumCompetencies(curriculumId);
        this.props.standardActions.getStandard(standardId);
    }

    render() {
        const {curriculum, standard} = this.props;
        return (
            <Grid columns={2} divided stackable>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <h3 className="tlu red narrow subtitle">Üldinfo</h3>
                        <b>Koordinaator:</b> {curriculum.coordinator}<br/>
                        <b>Grupp:</b> {curriculum.programme_group}<br/>
                        <b>Kood:</b> {curriculum.code}<br/>
                        <b>Kestus:</b> {curriculum.duration} aastat<br/>
                        <b>Õppetase:</b> {this.studyLevels[curriculum.study_level]}<br/>
                        <b>Kirjeldus:</b>
                        <p style={{textAlign: "justify"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec tempus metus tellus, in
                            lacinia lorem porttitor quis. In magna ligula, pulvinar in leo et, cursus volutpat est.
                            Nullam id tristique tortor, interdum ultrices mi. Phasellus non dui vitae arcu tincidunt
                            mattis ut vel diam. Nullam congue purus at tortor venenatis, sit amet consequat sem
                            rhoncus. Donec non nisl suscipit, varius velit a, pulvinar est. Vivamus vehicula
                            sagittis nunc, sed blandit lorem rhoncus et. Ut eu nisl convallis, tempor est eu,
                            pulvinar nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus.
                        </p>
                    </Grid.Column>
                    {curriculum.compliance
                        ? (
                            <Grid.Column width={8}>
                                <h3 className="tlu red narrow subtitle">Kutsestandard</h3>
                                <div style={{marginLeft: "auto", marginRight: "auto", width: "200px"}}>
                                    <Statistic size="small"
                                               style={{marginLeft: "auto", marginRight: "auto", width: "200px"}}>
                                        <Statistic.Label>
                                            {curriculum.standardName}
                                            <br/>
                                            Tase {curriculum.standardLevel}
                                        </Statistic.Label>
                                    </Statistic>
                                    <div>
                                        <PieChart
                                            animate
                                            startAngle={70}
                                            lengthAngle={-360}
                                            totalValue={curriculum.compliance.standardCount}
                                            lineWidth={20}
                                            style={{height: "200px", width: "200px"}}
                                            data={[
                                                {value: curriculum.compliance.curriculumCount, color: "#b71234"},
                                                {
                                                    value: curriculum.compliance.standardCount - curriculum.compliance.curriculumCount,
                                                    color: "#efeaeb"
                                                }
                                            ]}
                                        />
                                        <div style={{
                                            width: "200px",
                                            height: "100px",
                                            position: "absolute",
                                            marginTop: "-135px"
                                        }}>
                                            <Statistic size="small"
                                                       style={{width: "100%", marginLeft: "auto", marginRight: "auto"}}>
                                                <Statistic.Label>Vastavus</Statistic.Label>
                                                <Statistic.Value>
                                                    {curriculum.compliance.curriculumCount} / {curriculum.compliance.standardCount}
                                                </Statistic.Value>
                                            </Statistic>
                                        </div>
                                    </div>
                                </div>
                            </Grid.Column>
                        )
                        : null}
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <h3 className="tlu red narrow subtitle" onClick={() => this.getModules(curriculum.id)}>
                            Moodulid ja õppeained
                        </h3>
                        {!curriculum.modules
                            ? (
                                <Message
                                    className="clickable"
                                    onClick={() => this.getModules(curriculum.id)}
                                    icon="arrow circle outline down"
                                    header="Vaata"
                                />
                            )
                            : null}
                    </Grid.Column>
                </Grid.Row>
                {curriculum.modules
                    ? (
                        <Grid.Row>
                            <Grid.Column width={15}>
                                <Card.Group>
                                    {curriculum.modules.map((module) => {
                                        return (
                                            <Card key={module.id}
                                                  fluid color="red">
                                                <Card.Content header={module.name + " (" + module.volume + " EAP)"}/>
                                                <Card.Content style={{color: "black", textAlign: "justify"}}>
                                                    {module.outcomes
                                                        ? (
                                                            <p>
                                                                <b>Õpitulemused:</b> {module.outcomes}
                                                            </p>
                                                        )
                                                        : null}
                                                    {module.objectives
                                                        ? (
                                                            <p>
                                                                <b>Eesmärgid:</b> {module.objectives}
                                                            </p>
                                                        )
                                                        : null}

                                                    <Divider/>
                                                    {curriculum.courses
                                                        ? (
                                                            <div>
                                                                <p>
                                                                    <b>Ained: </b>
                                                                </p>
                                                                <ul>
                                                                    {curriculum.courses
                                                                        .filter(e => e.module === module.id)
                                                                        .map((course) => {
                                                                            return (
                                                                                <li key={course.id}>
                                                                                    <a href={"/course/view/" + course.id}>
                                                                                        {course.code} {course.title} ({course.volume} EAP)
                                                                                    </a>
                                                                                </li>
                                                                            );
                                                                        })}
                                                                </ul>
                                                            </div>
                                                        )
                                                        : null}
                                                </Card.Content>
                                            </Card>
                                        );
                                    })}
                                </Card.Group>
                            </Grid.Column>
                        </Grid.Row>
                    )
                    : null}
                <Grid.Row>
                    <Grid.Column width={8}>
                        <h3 className="tlu red narrow subtitle"
                            onClick={() => this.getCompetencies(curriculum.id, curriculum.standard)}>
                            Vastavus kutsestandardiga
                            "{curriculum.standardName},
                            tase {curriculum.standardLevel}"</h3>
                        {!standard || !standard.competencies
                            ? (
                                <Message
                                    className="clickable"
                                    onClick={() => this.getCompetencies(curriculum.id, curriculum.standard)}
                                    icon="arrow circle outline down"
                                    header="Vaata"
                                />
                            )
                            : null}
                    </Grid.Column>
                </Grid.Row>
                {standard && standard.competencies && curriculum.competencies ? standard.competencies.map((item, key) => {
                    return (
                        <Grid.Row key={key}>
                            <Grid.Column width={15}>
                                <h4>{item.name}</h4>
                                <Progress
                                    indicating
                                    value={curriculum.competencies
                                        .filter(e => e.competency === item.id).length}
                                    total={item.skills.length + item.knowledge.length}
                                    progress="ratio"/>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <u>Teadmised</u>
                                <ul>
                                    {item.skills.map((skill) => {
                                        const hasSkill = curriculum.competencies
                                            .filter(e => e.id === skill.id).length > 0;
                                        return (
                                            <li style={{
                                                color: hasSkill
                                                    ? "#21ba45"
                                                    : "#b71234"
                                            }}
                                                key={skill.id}>
                                                <Icon
                                                    name={hasSkill
                                                        ? "check circle outline"
                                                        : "close"}/>
                                                {skill.name}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <u>Oskused</u>
                                <ul>
                                    {item.knowledge.map((knowledge) => {
                                        const hasKnowledge = curriculum.competencies
                                            .filter(e => e.id === knowledge.id).length > 0;
                                        return (
                                            <li style={{
                                                color: hasKnowledge
                                                    ? "#21ba45"
                                                    : "#b71234"
                                            }}
                                                key={knowledge.id}>
                                                <Icon
                                                    name={hasKnowledge
                                                        ? "check circle outline"
                                                        : "close"}/> {knowledge.name}
                                            </li>
                                        );
                                    })}
                                </ul>
                                <br/>
                            </Grid.Column>
                        </Grid.Row>
                    );
                }) : null}
                {standard && standard.competencies && curriculum.competencies
                    ? (
                        <Grid.Row>
                            <Grid.Column width={15}>
                                <h3 className="tlu red narrow subtitle">Lisapädevused</h3>
                                {curriculum.competencies.filter(freeform => freeform.type === "freeform")
                                    .map((freeform, freeformKey) => {
                                        return (
                                            <Label className="competency-label" key={freeformKey}>
                                                {freeform.name}
                                            </Label>
                                        );
                                    })}
                            </Grid.Column>
                        </Grid.Row>
                    )
                    : null}
            </Grid>
        );
    }
}

