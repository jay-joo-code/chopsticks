import log from 'src/util/log';

const initState = {
  name: '',
  sourcePosition: [],
  sourceId: '',
  questions: [{
    question: '',
    options: ['', '', '', '']
  }]
}

const pollReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {...state, name: action.payload};
        case 'SET_SOURCEPOSITION':
            return {...state, sourcePosition: action.payload};
        case 'SET_SOURCEID':
            return {...state, sourceId: action.payload};
        case 'SET_QUESTIONS':
            return {...state, questions: action.payload};
        case 'UPDATE_QUESTION':
            const updatedQuestions = [...state.questions];
            updatedQuestions.splice(action.payload.selected, 1, action.payload.data);
            return {...state, questions: updatedQuestions};
        case 'DELETE_QUESTION':
            log('state', state);
            const questionsAfterDelete = [...state.questions];
            log('before delete', questionsAfterDelete);
            questionsAfterDelete.splice(action.payload, 1);
            log('questionsAfterDelete', questionsAfterDelete);
            return {...state, questions: questionsAfterDelete};
        case 'RESET_CREATE':
            return initState;
        default:
            return state
    }
}

export default pollReducer;