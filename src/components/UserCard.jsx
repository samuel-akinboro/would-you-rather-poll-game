import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Result from "./Result"
import QuestionCard from './QuestionCard';
import TeaserCard from './TeaserCard';

const pollTypes = {
  POLL_TEASER: 'POLL_TEASER',
  POLL_QUESTION: 'POLL_QUESTION',
  POLL_RESULT: 'POLL_RESULT'
};

const UserCard = ({
  author,
  question,
  pollType,
  badPath,
  unanswered = null
}) => {

    if (badPath === true) {
      return <Redirect to="/questions/bad_id" />;
    }

    return (
      <Fragment>
        {pollType === pollTypes.POLL_TEASER && 
        <TeaserCard author={author} question={question} unanswered={unanswered} />
      }
      {pollType === pollTypes.POLL_QUESTION && 
        <QuestionCard author={author} question={question} />
      }
      {pollType === pollTypes.POLL_RESULT && 
        <Result question={question} />
      }
    </Fragment>
    );
}

function mapStateToProps(
  { users, questions, authUser },
  { match, question_id }
) {
  let question,
    author,
    pollType,
    badPath = false;
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    pollType = pollTypes.POLL_TEASER;
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[authUser];

    if (question === undefined) {
      badPath = true;
    } else {
      author = users[question.author];
      pollType = pollTypes.POLL_QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = pollTypes.POLL_RESULT;
      }
    }
  }

  return {
    badPath,
    question,
    author,
    pollType
  };
}

export default connect(mapStateToProps)(UserCard);
