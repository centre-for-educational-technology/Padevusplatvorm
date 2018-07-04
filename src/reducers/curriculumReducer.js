import * as ActionTypes from '../constants/actionTypes';
import initialState from './initialState';
import {isError, loading} from "./index";

export const curriculumReducer = (state = initialState.curriculum, action) => {
    let result;
    switch (action.type) {
        case ActionTypes.CHANGE_CURRICULUM_FIELD:
            result = changeCurriculumField(state, action);
            break;
        case ActionTypes.SET_MODULE_COURSES:
            result = setModuleCourses(state, action);
            break;
        case ActionTypes.ADD_MODULE:
            result = addModule(state);
            break;
        case ActionTypes.CHANGE_MODULE_FIELD:
            result = changeModuleField(state, action);
            break;
        case ActionTypes.REMOVE_MODULE:
            result = removeModule(state, action);
            break;
        case ActionTypes.GET_ALL_CURRICULA:
        case ActionTypes.GET_CURRICULUM:
        case ActionTypes.GET_CURRICULUM_COMPLIANCE:
        case ActionTypes.GET_CURRICULUM_COMPETENCIES:
        case ActionTypes.GET_CURRICULUM_MODULES:
        case ActionTypes.GET_CURRICULUM_COURSES:
        case ActionTypes.SAVE_CURRICULUM:
            result = loading(state);
            break;
        case ActionTypes.GET_CURRICULUM_SUCCESS:
            result = getCurriculumSuccess(state, action);
            break;
        case ActionTypes.GET_CURRICULUM_COMPLIANCE_SUCCESS:
            result = getCurriculumComplianceSuccess(state, action);
            break;
        case ActionTypes.GET_CURRICULUM_COMPETENCIES_SUCCESS:
            result = getCurriculumCompetenciesSuccess(state, action);
            break;
        case ActionTypes.GET_CURRICULUM_MODULES_SUCCESS:
            result = getCurriculumModulesSuccess(state, action);
            break;
        case ActionTypes.GET_CURRICULUM_COURSES_SUCCESS:
            result = getCurriculumCoursesSuccess(state, action);
            break;
        case ActionTypes.GET_ALL_CURRICULA_SUCCESS:
            result = getAllCurriculaSuccess(state, action);
            break;
        case ActionTypes.GET_ALL_CURRICULA_FAILED:
        case ActionTypes.GET_CURRICULUM_FAILED:
        case ActionTypes.GET_CURRICULUM_COMPLIANCE_FAILED:
        case ActionTypes.GET_CURRICULUM_COMPETENCIES_FAILED:
        case ActionTypes.GET_CURRICULUM_MODULES_FAILED:
        case ActionTypes.GET_CURRICULUM_COURSES_FAILED:
        case ActionTypes.SAVE_CURRICULUM_FAILED:
            result = isError(state);
            break;
        case ActionTypes.SAVE_CURRICULUM_SUCCESS:
            result = saveCurriculum(state);
            break;
        default:
            result = {
                ...state
            };
            break;
    }
    console.log(result);
    return result;
};

export const getAllCurriculaSuccess = (state, action) => {
    return {
        ...state,
        curriculaList: action.payload,
        isLoading: false
    }
};

export const getCurriculumSuccess = (state, action) => {
    return {
        ...state,
        selectedCurriculum: action.payload,
        isLoading: false
    }
};

export const getCurriculumComplianceSuccess = (state, action) => {
    return {
        ...state,
        selectedCurriculum: {
            ...state.selectedCurriculum,
            compliance: action.payload
        },
        isLoading: false
    }
};

export const getCurriculumCompetenciesSuccess = (state, action) => {
    return {
        ...state,
        selectedCurriculum: {
            ...state.selectedCurriculum,
            competencies: action.payload
        },
        isLoading: false
    }
};

export const getCurriculumModulesSuccess = (state, action) => {
    return {
        ...state,
        selectedCurriculum: {
            ...state.selectedCurriculum,
            modules: action.payload
        },
        isLoading: false
    }
};

export const getCurriculumCoursesSuccess = (state, action) => {
    return {
        ...state,
        selectedCurriculum: {
            ...state.selectedCurriculum,
            courses: action.payload
        },
        isLoading: false
    }
};

export const changeCurriculumField = (state, action) => {
    const {fieldName, fieldValue} = action.payload;
    return {
        ...state,
        addCurriculumForm: {
            ...state.addCurriculumForm,
            [fieldName]: fieldValue
        }
    };
};

export const setModuleCourses = (state, action) => {
    const {index, courses} = action.payload;
    return {
        ...state,
        addCurriculumForm: {
            ...state.addCurriculumForm,
            modules: [
                ...state.addCurriculumForm.modules.slice(0, index),
                {
                    ...state.addCurriculumForm.modules[index],
                    courses
                },
                ...state.addCurriculumForm.modules.slice(index + 1)
            ]
        }
    };
};

export const addModule = (state) => {
    const newModule = {
        name: '',
        volume: '',
        objectives: '',
        outcomes: '',
        courses: []
    };
    return {
        ...state,
        addCurriculumForm: {
            ...state.addCurriculumForm,
            modules: [...state.addCurriculumForm.modules, newModule]
        }
    };
};

export const changeModuleField = (state, action) => {
    const {moduleIndex, fieldName, fieldValue} = action.payload;
    return {
        ...state,
        addCurriculumForm: {
            ...state.addCurriculumForm,
            modules: [
                ...state.addCurriculumForm.modules.slice(0, moduleIndex),
                {
                    ...state.addCurriculumForm.modules[moduleIndex],
                    [fieldName]: fieldValue
                },
                ...state.addCurriculumForm.modules.slice(moduleIndex + 1)
            ]
        }
    };
};

export const removeModule = (state, action) => {
    const {index} = action.payload;
    return {
        ...state,
        addCurriculumForm: {
            ...state.addCurriculumForm,
            modules: [
                ...state.addCurriculumForm.modules.slice(0, index),
                ...state.addCurriculumForm.modules.slice(index + 1)
            ]
        }
    };
};

export const saveCurriculum = (state) => {
    return {
        ...state,
        addCurriculumForm: initialState.curriculum.addCurriculumForm,
        isLoading: false
    };
};