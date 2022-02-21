import React, {useState} from 'react'
import Avatar from "@mui/material/Avatar";
import "./component-styles/QuestionCard.css"
import { Redirect } from 'react-router-dom';

const TeaserCard = ({ author, question, unanswered}) => {
  const [viewPoll, setViewPoll] = useState(false);

  const handleClick = () => {
    setViewPoll(!viewPoll)
  }

  if (viewPoll === true) {
    return <Redirect push to={`/questions/${question.id}`} />;
  }

  return (
    <div className="question__card">
      <h3>{author.name} asks</h3>
      <div className="flex">
        <Avatar src={author.avatarURL} className="avatar" />
        <div className="content">
          <h3>would you rather</h3>
          <p>{question.optionOne.text} <br /> or...</p>
          <button onClick={handleClick}>{unanswered ? "Answer Poll" : "Results"}</button>
        </div>
      </div>
    </div>
  )
}


export default TeaserCard;