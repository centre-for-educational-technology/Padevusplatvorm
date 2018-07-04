import * as ActionTypes from '../constants/actionTypes';
import initialState from './initialState';
import {isError, loading} from "./index";

export const standardReducer = (state = initialState.standard, action) => {
    console.log(action.type);
    let result;
    switch (action.type) {
        case ActionTypes.ADD_COMPETENCY:
            result = addCompetency(state);
            break;
        case ActionTypes.REMOVE_COMPETENCY:
            result = removeCompetency(state, action);
            break;
        case ActionTypes.CHANGE_STANDARD_FIELD:
            result = changeStandardField(state, action);
            break;
        case ActionTypes.CHANGE_COMPETENCY_NAME:
            result = changeCompetencyName(state, action);
            break;
        case ActionTypes.ADD_SKILL:
            result = addSkill(state, action);
            break;
        case ActionTypes.ADD_KNOWLEDGE:
            result = addKnowledge(state, action);
            break;
        case ActionTypes.SET_SKILL:
            result = setSkill(state, action);
            break;
        case ActionTypes.SET_KNOWLEDGE:
            result = setKnowledge(state, action);
            break;
        case ActionTypes.REMOVE_SKILL:
            result = removeSkill(state, action);
            break;
        case ActionTypes.REMOVE_KNOWLEDGE:
            result = removeKnowledge(state, action);
            break;
        case ActionTypes.GET_ALL_STANDARDS:
        case ActionTypes.GET_STANDARD:
            result = loading(state);
            break;
        case ActionTypes.GET_ALL_STANDARDS_SUCCESS:
            result = getAllStandardsSuccess(state, action);
            break;
        case ActionTypes.GET_STANDARD_SUCCESS:
            result = getStandardSuccess(state, action);
            break;
        case ActionTypes.SAVE_STANDARD:
            result = saveStandard(state);
            break;
        case ActionTypes.GET_ALL_STANDARDS_FAILED:
        case ActionTypes.GET_STANDARD_FAILED:
        case ActionTypes.SAVE_STANDARD_FAILED:
            result = isError(state);
            break;
        default:
            result = {
                ...state
            };
            break;
    }
    return result;
};

export const getStandardSuccess = (state, action) => {
    return {
        ...state,
        selectedStandard: action.payload,
        isLoading: false
    }
};

export const getAllStandardsSuccess = (state, action) => {
    return {
        ...state,
        standardsList: action.payload,
        isLoading: false
    }
};

export const saveStandard = (state) => {
    return {
        ...state,
        addStandardForm: initialState.standard.addStandardForm,
        isLoading: true
    };
};

export const changeStandardField = (state, action) => {
    const {fieldName, fieldValue} = action.payload;
    return {
        ...state,
        addStandardForm: {
            ...state.addStandardForm,
            [fieldName]: fieldValue
        }
    };
};

export const addCompetency = (state) => {
    const newCompetency = {
        name: '',
        skills: [],
        knowledge: [],
    };
    return {
        ...state,
        addStandardForm: {
            ...state.addStandardForm,
            competencies: [...state.addStandardForm.competencies, newCompetency]
        }
    };
};

export const changeCompetencyName = (state, action) => {
    const {index, name} = action.payload;
    return {
        ...state,
        addStandardForm: {
            ...state.addStandardForm,
            competencies: [
                ...state.addStandardForm.competencies.slice(0, index),
                {
                    ...state.addStandardForm.competencies[index],
                    name
                },
                ...state.addStandardForm.competencies.slice(index + 1)
            ]
        }
    };
};

export const removeCompetency = (state, action) => {
    const {index} = action.payload;
    return {
        ...state,
        addStandardForm: {
            ...state.addStandardForm,
            competencies: [
                ...state.addStandardForm.competencies.slice(0, index),
                ...state.addStandardForm.competencies.slice(index + 1)
            ]
        }
    };
};

export const addSkill = (state, action) => {
    const {competencyIndex} = action.payload;
    return {
        ...state,
        addStandardForm: {
            ...state.addStandardForm,
            competencies: [
                ...state.addStandardForm.competencies.slice(0, competencyIndex),
                {
                    ...state.addStandardForm.competencies[competencyIndex],
                    skills: [
                        ...state.addStandardForm.competencies[competencyIndex].skills,
                        {name: ''}
                    ]
                },
                ...state.addStandardForm.competencies.slice(competencyIndex + 1)
            ]
        }
    };
};

export const addKnowledge = (state, action) => {
    const {competencyIndex} = action.payload;
    return {
        ...state,
        addStandardForm: {
            ...state.addStandardForm,
            competencies: [
                ...state.addStandardForm.competencies.slice(0, competencyIndex),
                {
                    ...state.addStandardForm.competencies[competencyIndex],
                    knowledge: [
                        ...state.addStandardForm.competencies[competencyIndex].knowledge,
                        {name: ''}
                    ]
                },
                ...state.addStandardForm.competencies.slice(competencyIndex + 1)
            ]
        }
    };
};

export const setSkill = (state, action) => {
    const {competencyIndex, skillIndex, value} = action.payload;
    return {
        ...state,
        addStandardForm: {
            ...state.addStandardForm,
            competencies: [
                ...state.addStandardForm.competencies.slice(0, competencyIndex),
                {
                    ...state.addStandardForm.competencies[competencyIndex],
                    skills: [
                        ...state.addStandardForm.competencies[competencyIndex].skills.slice(0, skillIndex),
                        {name: value},
                        ...state.addStandardForm.competencies[competencyIndex].skills.slice(skillIndex + 1),
                    ]
                },
                ...state.addStandardForm.competencies.slice(competencyIndex + 1)
            ]
        }
    };
};

export const setKnowledge = (state, action) => {
    const {competencyIndex, knowledgeIndex, value} = action.payload;
    return {
        ...state,
        addStandardForm: {
            ...state.addStandardForm,
            competencies: [
                ...state.addStandardForm.competencies.slice(0, competencyIndex),
                {
                    ...state.addStandardForm.competencies[competencyIndex],
                    knowledge: [
                        ...state.addStandardForm.competencies[competencyIndex].knowledge.slice(0, knowledgeIndex),
                        {name: value},
                        ...state.addStandardForm.competencies[competencyIndex].knowledge.slice(knowledgeIndex + 1),
                    ]
                },
                ...state.addStandardForm.competencies.slice(competencyIndex + 1)
            ]
        }
    };
};

export const removeSkill = (state, action) => {
    const {competencyIndex, skillIndex} = action.payload;
    return {
        ...state,
        addStandardForm: {
            ...state.addStandardForm,
            competencies: [
                ...state.addStandardForm.competencies.slice(0, competencyIndex),
                {
                    ...state.addStandardForm.competencies[competencyIndex],
                    skills: [
                        ...state.addStandardForm.competencies[competencyIndex].skills.slice(0, skillIndex),
                        ...state.addStandardForm.competencies[competencyIndex].skills.slice(skillIndex + 1),
                    ]
                },
                ...state.addStandardForm.competencies.slice(competencyIndex + 1)
            ]
        }
    };
};

export const removeKnowledge = (state, action) => {
    const {competencyIndex, knowledgeIndex} = action.payload;
    return {
        ...state,
        addStandardForm: {
            ...state.addStandardForm,
            competencies: [
                ...state.addStandardForm.competencies.slice(0, competencyIndex),
                {
                    ...state.addStandardForm.competencies[competencyIndex],
                    knowledge: [
                        ...state.addStandardForm.competencies[competencyIndex].knowledge.slice(0, knowledgeIndex),
                        ...state.addStandardForm.competencies[competencyIndex].knowledge.slice(knowledgeIndex + 1),
                    ]
                },
                ...state.addStandardForm.competencies.slice(competencyIndex + 1)
            ]
        }
    };
};