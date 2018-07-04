export default {
	user: {
		isLoggingIn: false,
		failed: false,
		token: '',
		userId: 0,
		email: '',
		loginErrorMessage: ''
	},
    standard: {
	    standardsList: [],
        addStandardForm: {
            name: '',
            level: '',
            description: '',
            competencies: [],
            isLoading: false
        },
    },
    course: {
	    coursesList: [],
        addCourseForm: {
            title: '',
            code: '',
            volume: '',
            contactHours: '',
            semester: 'autumn',
            assessment: 'exam',
            lecturer: 1, //TODO,
            standard: '',
            competencies: [],
            freeformCompetencies: []
        }
    },
    curriculum: {
	    curriculaList: [],
        addCurriculumForm: {
            title: '',
            code: '',
            coordinator: '',
            programmeGroup: '',
            duration: '',
            validityStart: '',
            validityEnd: '',
            studyLevel: 'bachelor',
            standard: '',
            modules: []
        }
    },
    profile: {
        addProfileForm: {
            firstName: '',
            lastName: '',
            description: '',
            curricula: [],
            freeformCompetencies: []
        }
    }
};
