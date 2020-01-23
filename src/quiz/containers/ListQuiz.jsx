import React, { Component } from 'react';
import QuizCard from '../components/QuizCard';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:8000/api/v1';

class ListQuiz extends Component {
  state = {
    questions: [],
    counter: 0
  };

  componentDidMount = () => {
    this.fetchQuiz(BASE_URL + '/questions');
  };

  fetchQuiz = url => {
    const { jwt } = localStorage;
    if (jwt) {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data, 'list quiz data....');
          if (data.success) {
            // this.setState({ questions: data.questions });
            this.props.dispatch({
              type: 'GET_QUIZES',
              payload: data.questions
            });
          } else {
            this.setState({ err: data.message });
          }
        })
        .catch(err => {
          console.log('fetch quiz error...');
        });
    }
  };

  handleClick = (option, question) => {
    if (option === question.answer) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { quiz, user } = this.props;
    console.log(quiz, user, 'list quiz render quiz....');

    return (
      <div style={{ margin: '50px 0' }}>
        {quiz && quiz.quiz && user && user.user
          ? quiz.quiz.map(question => {
              return (
                <section class='section'>
                  <div class='container'>
                    <QuizCard
                      question={question}
                      handleClick={this.handleClick}
                      user={user.user}
                    />
                  </div>
                </section>
              );
            })
          : 'Questions not found.....'}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state, 'list quiz map state to props...');
  return state;
};

export default connect(mapStateToProps)(ListQuiz);
