import React, {useState} from 'react'
import Avatar from "@mui/material/Avatar";
import "./component-styles/QuestionCard.css"
import {connect} from "react-redux"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import { handleSaveQuestionAnswer } from '../actions/users';

const QuestionCard = ({ authUser, author, question, handleSaveQuestionAnswer}) => {
  const [value, setValue] = useState("");
  
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = () => {
    if (value !== '') {
      handleSaveQuestionAnswer(authUser, question.id, value);
    }
  }

  return (
    <div className="question__card" style={{margin: "2em auto", maxWidth: "476px", background: "#fff"}}>
      <h3>{author.name} asks</h3>
      <div className="flex">
        <Avatar src={author.avatarURL} className="avatar" />
        <div className="content">
          <h3>would you rather</h3>
          <FormControl>
            {/* <FormLabel id="demo-controlled-radio-buttons-group">would you rather</FormLabel> */}
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text} />
              <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} />
            </RadioGroup>
          </FormControl>
          <button style={{opacity: value ? "1" : "0.3", cursor: value ? "pointer" : "auto"}} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps({ authUser }, { match }) {
  return {
    authUser
  };
}

export default connect(
  mapStateToProps,
  { handleSaveQuestionAnswer }
)(QuestionCard);