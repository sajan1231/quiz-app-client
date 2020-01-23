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
          console.log(data, 'quiz data....');
          if (data.success) {
            // this.setState({ questions: data.questions });
            this.props.dispatch({ type: 'GET_QUIZES', payload: data.question });
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
    const { questions, counter } = this.state;

    return (
      <div>
        {questions
          ? questions.map(question => {
              return (
                <QuizCard question={question} handleClick={this.handleClick} />
              );
            })
          : 'Questions not found.....'}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state, 'list quiz map state to props...');

  return state.quiz;
};

export default connect(mapStateToProps)(ListQuiz);
