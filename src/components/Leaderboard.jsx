import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import LeaderboardCard from './LeaderboardCard';

const awardColor = ['yellow', 'grey', 'orange'];

const Leaderboard = ({ leaderboardData }) => {

  return (
    <Fragment>
      {leaderboardData.map((user, idx) => (
        <LeaderboardCard key={user.id} 
        src={user.avatarURL} 
        awardColor={awardColor[idx]}
        name={user.name}
        answer={user.answerCount}
        question={user.questionCount}
        score={user.questionCount + user.answerCount}
      />
      ))}
    </Fragment>
  );
}

function mapStateToProps({ users }) {
  const leaderboardData = Object.values(users)
    .map(user => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
  return {
    leaderboardData
  };
}

export default connect(mapStateToProps)(Leaderboard);
