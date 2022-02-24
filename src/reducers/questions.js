import {
  FETCH_QUESTIONS,
  ADD_ANSWER_TO_QUESTION,
  CREATE_QUESTION
} from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case CREATE_QUESTION:
      const { question } = action;

      return {
        ...state,
        [question.id]: question
      };
    case ADD_ANSWER_TO_QUESTION:
      const { authUser, qid, answer } = action;

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: [...state[qid][answer].votes, authUser]
          }
        }
      };
    default:
      return state;
  }
}
