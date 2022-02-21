import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import "./component-styles/Result.css"
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const Result = ({ question, user, history }) => {
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];
    
  return (
    <div className="poll__result">
      <h1>Would you rather</h1>
      <p>Asked by <span>Britinni</span></p>
      <h3>{votesTotal} votes</h3>
      <div className="option">
        {optionOneVotes > optionTwoVotes && <StarIcon />}
        <h5>{question.optionOne.text}</h5>
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel value={((optionOneVotes / votesTotal) * 100)} />
        </Box>
        <p>{optionOneVotes} out of {votesTotal} votes</p>
      </div>
      <div className="option">
        {optionTwoVotes > optionOneVotes && <StarIcon />}
        <h5>{question.optionTwo.text}</h5>
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel value={((optionTwoVotes / votesTotal) * 100)} />
        </Box>
        <p>{optionTwoVotes} out of {votesTotal} votes</p>
      </div>
      <button onClick={()=> history.push("/")}>Go back</button>
    </div>
  )
}

function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(Result));