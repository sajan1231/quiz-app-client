import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuizCard from './QuizCard';
import Loader from '../../app/componets/Loader';
import NoQuiz from './NoQuiz';

import { handleFetchQuizzes, handleUpdateScore, deleteQuiz } from '../actions';

import { BASE_URL } from '../../static';

class PlayQuiz extends Component {
  state = {
    quizzes: [],
    counter: 0,
    isAnswered: false,
    score: 0
  };

  componentDidMount() {
    const { jwt } = localStorage;
    if (jwt) {
      this.props.dispatch(handleFetchQuizzes(BASE_URL + '/quizzes', jwt));
    }
  }

  // first handle click
  handleClick = (option, question) => {
    const { counter } = this.state;
    const { quiz } = this.props.quiz;

    if (counter <= quiz.length - 1) {
      if (option && option === question.answer) {
        if (option && counter < quiz.length - 1) {
          document.getElementById(question._id).classList.add('is-success');
        }

        this.setState(
          state => {
            return {
              score: state.score + 1,
              isAnswered: !state.isAnswered
            };
          },
          () =>
            this.props.dispatch({
              type: 'UPDATE_CURRENT_SCORE',
              payload: this.state.score
            })
        );

        setTimeout(
          () =>
            this.setState(state => {
              return {
                counter: state.counter + 1,
                isAnswered: !state.isAnswered
              };
            }),
          500
        );
      } else {
        if (option && counter < quiz.length - 1) {
          document.getElementById(question._id).classList.add('is-danger');
        }

        this.setState({ isAnswered: !this.state.isAnswered });
        setTimeout(
          () =>
            this.setState(state => {
              return {
                counter: state.counter + 1,
                isAnswered: !state.isAnswered
              };
            }),
          500
        );
      }
    } else {
      return null;
    }
  };

  resetCounter = () => {
    this.setState({ counter: 0, score: 0 }, () => {
      this.props.dispatch({
        type: 'UPDATE_CURRENT_SCORE',
        payload: this.state.score
      });
    });
  };

  handleDeleteQuiz = id => {
    const { jwt } = localStorage;

    if (jwt) {
      this.props.dispatch(
        deleteQuiz(
          BASE_URL + '/quizzes/' + id + '/delete',
          jwt,
          id,
          this.props.history
        )
      );
    }
  };

  handleSubmitScore = () => {
    const { jwt } = localStorage;
    const { score } = this.state;
    const scoreData = { score, category: 'all' };

    if (jwt) {
      this.props.dispatch(
        handleUpdateScore(BASE_URL + '/users/score/update', jwt, scoreData)
      );
    }
    this.resetCounter();
  };

  render() {
    const { counter, isAnswered } = this.state;
    const { questions, user } = this.props;
    const { isLoading } = questions;

    return (
      <div style={{ marginTop: '100px ' }} className='container'>
        {isLoading ? (
          <Loader />
        ) : questions.questions && questions.questions.length ? (
          <QuizCard
            quiz={
              counter <= questions.questions.length - 1
                ? questions.questions[counter]
                : null
            }
            handleClick={this.handleClick}
            user={user.user}
            resetCounter={this.resetCounter}
            isAnswered={isAnswered}
            handleDeleteQuiz={this.handleDeleteQuiz}
            submitScore={this.handleSubmitScore}
          />
        ) : (
          <NoQuiz />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state, 'play quiz map state');

  return state;
}

export default connect(mapStateToProps)(PlayQuiz);
