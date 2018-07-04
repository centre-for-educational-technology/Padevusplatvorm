import React, {Component} from 'react';
import {Button, Form, Input, Transition} from 'semantic-ui-react';
import Article from '../list/Article';
import PropTypes from 'prop-types';

import './AddItemForm.css';

export default class AddItemForm extends Component {
    state = {
        link: ''
    };

    input = undefined;

    constructor(props) {
        super(props);
        this.addLink = this.addLink.bind(this);
        this.checkLink = this.checkLink.bind(this);
        this.clearLink = this.clearLink.bind(this);
    }

    addLink() {
        this.props.addItem(this.state.link);
        this.clearLink();
    }

    checkLink() {
        this.props.checkItem(this.state.link);
    }

    clearLink() {
        if (this.input) {
            this.input.inputRef.value = '';
        }
        this.props.clearPreview();
    }

    render() {
        return (
            <div>
                <Form unstackable id="add-item-form" onSubmit={this.checkLink}>
                    <Form.Group>
                        <Input
                            ref={input => {
                                this.input = input
                            }}
                            loading={this.props.addItem.previewLoading}
                            className="add-item-input"
                            placeholder="Insert link..."
                            onChange={e => this.setState({...this.state, link: e.target.value})}
                        />
                        <Form.Button color="black" loading={this.props.model.previewLoading} id="add-item-form-button">
                            Verify
                        </Form.Button>
                    </Form.Group>
                </Form>
                <Transition visible={this.props.model.showPreview} animation='slide down' duration={500}>
                    <div style={{textAlign: "center"}}>
                        <Article admin={true} item={this.props.model.preview}/>
                        <Button onClick={this.clearLink} style={{marginTop: "20px"}} color="red">Cancel</Button>
                        <Button loading={this.props.addItem.isLoading} onClick={this.addLink}
                                style={{marginTop: "20px", marginLeft: "50px"}} color="green">Add</Button>
                    </div>
                </Transition>
            </div>
        );
    }
}

AddItemForm.propTypes = {
    model: PropTypes.object.isRequired,
    checkItem: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    clearPreview: PropTypes.func.isRequired
};

AddItemForm.defaultProps = {
    checkItem: () => {
        console.log("Unset checkItem function!");
    },
    addItem: () => {
        console.log("Unset addItem function!");
    },
    clearPreview: () => {
        console.log("Unset clearPreview function!");
    }
};
