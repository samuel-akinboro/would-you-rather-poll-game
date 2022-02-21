import React from 'react';
import { connect } from 'react-redux';
import UserCard from './UserCard';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 90%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  max-width: 567px;
  margin: 0 auto;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

function UnstyledTabsCustomized({ userQuestionData }) {
  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab>Unanswered</Tab>
        <Tab>Answered</Tab>
      </TabsList>
      <TabPanel value={0}>
        {userQuestionData.answered.map(question => (
            <UserCard
              key={question.id}
              question_id={question.id}
              unanswered={true}
            />
          ))}
        </TabPanel>
      <TabPanel value={1}>
        {userQuestionData.unanswered.map(question => (
            <UserCard
              key={question.id}
              question_id={question.id}
              unanswered={false}
            />
          ))}
      </TabPanel>
    </TabsUnstyled>
  );
}

const Home = ({ userQuestionData }) => {
    return <UnstyledTabsCustomized userQuestionData={userQuestionData} />;
}

const panes = props => {
  const { userQuestionData } = props;
  return [
    {
      menuItem: 'Unanswered',
      render: () => (
        <Tab.Pane>
          {userQuestionData.answered.map(question => (
            <UserCard
              key={question.id}
              question_id={question.id}
              unanswered={true}
            />
          ))}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Answered',
      render: () => (
        <Tab.Pane>
          {userQuestionData.unanswered.map(question => (
            <UserCard
              key={question.id}
              question_id={question.id}
              unanswered={false}
            />
          ))}
        </Tab.Pane>
      )
    }
  ];
};

function mapStateToProps({ authUser, users, questions }) {
  const answeredIds = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter(question => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter(question => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userQuestionData: {
      answered,
      unanswered
    }
  };
}

export default connect(mapStateToProps)(Home);
