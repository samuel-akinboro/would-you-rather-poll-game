let users = {
  ben: {
    id: "ben",
    name: "ben",
    avatarURL: "/images/avatars/avatar1.jpg",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionTwo",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo"
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"]
  },
  christine: {
    id: "christine",
    name: "christine",
    avatarURL: "/images/avatars/avatar2.png",
    answers: {
      vthrdm985a262al8qx3do: "optionOne",
      xj352vofupe1dqz9emx13r: "optionTwo"
    },
    questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"]
  },
  thor: {
    id: "thor",
    name: "thor",
    avatarURL: "/images/avatars/avatar3.png",
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionTwo"
    },
    questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"]
  },
  joe: {
    id: "joe",
    name: "joe",
    avatarURL: "/images/avatars/avatar4.png",
    answers: {},
    questions: []
  },
  anne: {
    id: "anne",
    name: "anne",
    avatarURL: "/images/avatars/avatar5.png",
    answers: {},
    questions: []
  },
  scott: {
    id: "scott",
    name: "scott",
    avatarURL: "/images/avatars/avatar6.png",
    answers: {},
    questions: []
  },
  nelson: {
    id: "nelson",
    name: "nelson",
    avatarURL: "/images/avatars/avatar7.jpg",
    answers: {},
    questions: []
  },
  james: {
    id: "james",
    name: "James",
    avatarURL: "/images/avatars/avatar8.png",
    answers: {},
    questions: []
  }
};

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "ben",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["ben"],
      text: "have horrible short term memory"
    },
    optionTwo: {
      votes: [],
      text: "have horrible long term memory"
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    author: "thor",
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: "become a superhero"
    },
    optionTwo: {
      votes: ["thor", "ben"],
      text: "become a supervillain"
    }
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    author: "ben",
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: "be telekinetic"
    },
    optionTwo: {
      votes: ["ben"],
      text: "be telepathic"
    }
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    author: "christine",
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: "be a front-end developer"
    },
    optionTwo: {
      votes: ["ben"],
      text: "be a back-end developer"
    }
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "christine",
    timestamp: 1489579767190,
    optionOne: {
      votes: ["christine"],
      text: "find $50 yourself"
    },
    optionTwo: {
      votes: ["thor"],
      text: "have your best friend find $500"
    }
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "thor",
    timestamp: 1493579767190,
    optionOne: {
      votes: ["thor"],
      text: "write JavaScript"
    },
    optionTwo: {
      votes: ["christine"],
      text: "write Swift"
    }
  }
};

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText
    },
    optionTwo: {
      votes: [],
      text: optionTwoText
    }
  };
}

export function _saveQuestion(question) {
  return new Promise((res, rej) => {
    const authUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      };

      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          questions: users[authUser].questions.concat([formattedQuestion.id])
        }
      };

      res(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          answers: {
            ...users[authUser].answers,
            [qid]: answer
          }
        }
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authUser])
          }
        }
      };

      res();
    }, 500);
  });
}
