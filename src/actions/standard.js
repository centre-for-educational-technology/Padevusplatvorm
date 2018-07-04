import * as ActionTypes from '../constants/actionTypes';
import history from '../config/history';
import axios from '../config/axios';

export const getAllStandards = () => {
    return dispatch => {
        dispatch({
            type: ActionTypes.GET_ALL_STANDARDS
        });
        const promises = [];
        promises.push(new Promise((resolve, reject) => {
            axios.get(
                '/standard'
            ).then(response => {
                dispatch({
                    type: ActionTypes.GET_ALL_STANDARDS_SUCCESS,
                    payload: response.data.data
                });
            }).catch(error => {
                dispatch({
                    type: ActionTypes.GET_ALL_STANDARDS_FAILED,
                    payload: error.userMessage
                });
            });
        }));
    };
};

export const getStandard = (standardId) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.GET_STANDARD
        });
        const promises = [];
        promises.push(new Promise((resolve, reject) => {
            axios.get(
                '/standard/' + standardId
            ).then(response => {
                dispatch({
                    type: ActionTypes.GET_STANDARD_SUCCESS,
                    payload: response.data.data
                });
            }).catch(error => {
                dispatch({
                    type: ActionTypes.GET_STANDARD_FAILED,
                    payload: error.userMessage
                });
            });
        }));
    };
};

export const saveStandard = (standard) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SAVE_STANDARD
        });
        axios.post(
            '/standard/add', {standard}
        ).then(response => {
            dispatch({
                type: ActionTypes.SAVE_STANDARD_SUCCESS,
                payload: response.data.data
            });
            history.push('/dashboard');
        }).catch(error => {
            dispatch({
                type: ActionTypes.SAVE_STANDARD_FAILED,
                payload: error.userMessage
            });
        });
    };
};

export const changeField = (fieldName, fieldValue) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CHANGE_STANDARD_FIELD,
            payload: {
                fieldName,
                fieldValue
            }
        });
    };
};

export const addCompetency = () => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ADD_COMPETENCY
        });
    };
};

export const changeCompetency = (index, name) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CHANGE_COMPETENCY_NAME,
            payload: {
                index,
                name
            }
        });
    };
};

export const removeCompetency = (index) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.REMOVE_COMPETENCY,
            payload: {
                index
            }
        });
    };
};

export const addSkill = (competencyIndex) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ADD_SKILL,
            payload: {
                competencyIndex
            }
        });
    };
};

export const addKnowledge = (competencyIndex) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ADD_KNOWLEDGE,
            payload: {
                competencyIndex
            }
        });
    };
};

export const setSkill = (competencyIndex, skillIndex, value) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SET_SKILL,
            payload: {
                competencyIndex,
                skillIndex,
                value
            }
        });
    };
};

export const setKnowledge = (competencyIndex, knowledgeIndex, value) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SET_KNOWLEDGE,
            payload: {
                competencyIndex,
                knowledgeIndex,
                value
            }
        });
    };
};

export const removeSkill = (competencyIndex, skillIndex) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.REMOVE_SKILL,
            payload: {
                competencyIndex,
                skillIndex
            }
        });
    };
};

export const removeKnowledge = (competencyIndex, knowledgeIndex) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.REMOVE_KNOWLEDGE,
            payload: {
                competencyIndex,
                knowledgeIndex
            }
        });
    };
};