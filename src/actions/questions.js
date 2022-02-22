import { saveQuestion } from '../utils/api';
import { addQuestionToUser } from '../actions/users';

// initialized action types
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';
export const CREATE_QUESTION = 'CREATE_QUESTION';

// actions
export function fetchQuestions(questions) {
  return {
    type: FETCH_QUESTIONS,
    questions
  };
}

export function addAnswerToQuestion(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authUser,
    qid,
    answer
  };
}

function createQuestion(question) {
  return {
    type: CREATE_QUESTION,
    question
  };
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(createQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
}
