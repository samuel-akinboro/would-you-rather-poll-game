import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import "./component-styles/NewPoll.css"
import { handleSaveQuestion } from '../actions/questions';

const NewPoll = ({ authUser, handleSaveQuestion }) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [validSubmit, setValidSubmit] = useState(false)

  const handleSubmit = () => {
    if(optionOne && optionTwo){
      new Promise((res, rej) => {
        handleSaveQuestion(optionOne, optionTwo, authUser);
        setTimeout(() => res('success'), 1000);
      }).then(() => {
        setOptionOne("")
        setOptionTwo("")
        setValidSubmit(true)
      });
    }
  };

    if (validSubmit === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="new__poll">
        <div className='container'>
          <h1>Create a new poll</h1>
          <h2>Would you rather</h2>
          <input 
            type="text" placeholder="Enter option one..."
            value={optionOne}
            onChange={(e)=> setOptionOne(e.target.value)}
           />
          <p>Or</p>
          <input 
            type="text" placeholder="Enter option Two..."
            value={optionTwo}
            onChange={(e)=> setOptionTwo(e.target.value)}
           />
          <button 
            onClick={handleSubmit}
            style={{
              opacity: (optionOne && optionTwo) ? "1" : "0.3",
              cursor: (optionOne && optionTwo) ? "pointer" : "auto"
            }}
          >
            Create Poll
          </button>
        </div>
      </div>
    );
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(
  mapStateToProps,
  { handleSaveQuestion }
)(NewPoll);
