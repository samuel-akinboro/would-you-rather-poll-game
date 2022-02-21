import React from "react"
import Avatar from "@mui/material/Avatar";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import "./component-styles/LeaderboardCard.css"

const LeaderboardCard = ({awardColor, src, name, answer, question, score}) => {
  return (
    <div className="leader__card">
      <MilitaryTechIcon style={{color: awardColor}} />
      <div className="container">
        <Avatar src={src} className="avatar" />  
        <div className="info">
          <h5>{name}</h5>
          <div className="detail detail1">  
            <p>Answered questions</p>
            <span>{answer}</span>
          </div>
          <div className="detail">  
            <p>Created questions</p>
            <span>{question}</span>
          </div>
        </div>
        <div className="score">
          <h3>Score</h3>
          <h4>{score}</h4>
          <AutoAwesomeIcon />
        </div>
      </div>
    </div>
  )
}

export default LeaderboardCard