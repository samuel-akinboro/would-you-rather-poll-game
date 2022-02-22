import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Result from "./Result"
import QuestionCard from './QuestionCard';
import TeaserCard from './TeaserCard';

const ManageCards = ({
  author,
  question,
  cardType,
  badPath,
  unanswered = null
}) => {

    if (badPath === true) {
      return <Redirect to="/questions/bad_id" />;
    }

    return (
      <Fragment>
        {cardType === "TEASER" && 
        <TeaserCard author={author} question={question} unanswered={unanswered} />
      }
      {cardType === "QUESTION" && 
        <QuestionCard author={author} question={question} />
      }
      {cardType === "RESULT" && 
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
    cardType,
    badPath = false;
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    cardType = "TEASER";
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[authUser];

    if (question === undefined) {
      badPath = true;
    } else {
      author = users[question.author];
      cardType = "QUESTION";
      if (Object.keys(user.answers).includes(question.id)) {
        cardType = "RESULT";
      }
    }
  }

  return {
    badPath,
    question,
    author,
    cardType
  };
}

export default connect(mapStateToProps)(ManageCards);
