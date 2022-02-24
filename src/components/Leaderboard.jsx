import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import LeaderboardCard from './LeaderboardCard';

const awardColor = ['gold', 'silver', 'brown'];

const Leaderboard = ({ rankedData }) => {

  return (
    <Fragment>
      {rankedData.map((user, index) => (
        <LeaderboardCard 
        key={user.id} 
        name={user.name}
        answer={user.answerCount}
        src={user.avatarURL} 
        awardColor={awardColor[index]}
        question={user.questionCount}
        score={user.questionCount + user.answerCount}
      />
      ))}
    </Fragment>
  );
}

function mapStateToProps({ users }) {
  const rankedData = Object.values(users)
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
    rankedData
  };
}

export default connect(mapStateToProps)(Leaderboard);
