import React, {Component} from "react";
import {Grid, Label} from "semantic-ui-react";

export default class ViewCourse extends Component {

    render() {
        const {course} = this.props;
        const competencyHierarchy = course.competencies
            .filter(competency => competency.type !== "freeform")
            .reduce(function (r, a) {
                r[a.competency] = r[a.competency] || {id: a.competency, name: a.competencyName, subs: []};
                r[a.competency].subs.push(a);
                return r;
            }, Object.create(null));
        console.log(Object.keys(competencyHierarchy));
        return (
            <Grid columns={1} divided>
                <Grid.Row>
                    <Grid.Column>
                        <h3 className="tlu red narrow subtitle">Üldinfo</h3>
                        <b>Õppeaine kood:</b> {course.code}
                        <br/>
                        <b>Õppeaine maht:</b> {course.volume} EAP
                        <br/>
                        <b>Kontakttundide maht:</b> {course.contact_hours}
                        <br/>
                        <b>Semester:</b> {course.semester === "autumn" ? "Sügis" : "Kevad"}
                        <br/>
                        <b>Kontrollivorm:</b> {course.assessment === "exam" ? "Eksam" : "Arvestus"}
                        <br/>
                        <b>Õppejõud:</b> {course.lecturer}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <h3 className="tlu red narrow subtitle">Kutsestandard ja pädevused</h3>
                        <h4>{course.standardName}, tase {course.standardLevel}</h4>
                        <ol>
                            {Object.keys(competencyHierarchy)
                                .map((compKey) => {
                                    return (
                                        <li key={compKey}>
                                            {competencyHierarchy[compKey].name}:<br/>
                                            <ul>
                                                {competencyHierarchy[compKey].subs.map((subComp) => {
                                                    return (
                                                        <li key={subComp.id}>
                                                            - {subComp.name}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </li>
                                    );
                                })}
                        </ol>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <h3 className="tlu red narrow subtitle">Lisapädevused</h3>
                        {course.competencies.filter(freeform => freeform.type === "freeform")
                            .map((freeform, freeformKey) => {
                                return (
                                    <Label className="competency-label" key={freeformKey}>
                                        {freeform.name}
                                    </Label>
                                );
                            })}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

