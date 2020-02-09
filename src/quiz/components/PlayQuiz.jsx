import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuizCard from './QuizCard';
import Loader from '../../app/componets/Loader';
import NoQuiz from './NoQuiz';

import { handleFetchQuestions, deleteQuestion } from '../actions';
import { createScore } from '../actions/action.score';
import { BASE_URL } from '../../static';

class PlayQuiz extends Component {
  state = {
    quizzes: [],
    counter: 0,
    isAnswered: false,
    score: 0
  };

  componentDidMount() {
    const quizsetId = window.location.pathname.split('/')[2];
    const { quizsets } = this.props.quizsets;
    const { jwt } = localStorage;

    if (jwt && quizsetId && (!quizsets || !quizsets.length)) {
      this.props.dispatch(
        handleFetchQuestions(BASE_URL + '/quizsets/' + quizsetId, jwt)
      );
    }
  }

  // first handle click
  handleClick = (option, question) => {
    const { counter } = this.state;
    const { questions } = this.props.questions;

    if (counter <= questions.length - 1) {
      if (option && option === question.answer) {
        if (option && counter < questions.length - 1) {
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
        if (option && counter < questions.length - 1) {
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
        deleteQuestion(
          BASE_URL + '/questions/' + id + '/delete',
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
    const { questions } = this.props.questions;
    const category = questions[0].quizsetId.name || '';
    const scoreData = { score, category };

    if ((jwt, score)) {
      this.props.dispatch(
        createScore(BASE_URL + '/scores', jwt, scoreData, this.props.history)
      );
    }
    this.resetCounter();
    this.props.history.push('/');
  };

  render() {
    const { counter, isAnswered, score } = this.state;
    const { quizsets, questions, user } = this.props;
    const { isLoading } = questions;

    const quizsetId = window.location.pathname.split('/')[2];

    const quiz =
      quizsets.quizsets.reduce((acc, quiz) => {
        if (quiz._id === quizsetId) {
          acc = quiz.questions;
        }
        return acc;
      }, []) || [];

    return (
      <div style={{ paddingTop: '100px ' }} className='container'>
        {isLoading ? (
          <Loader />
        ) : quiz && quiz.length ? (
          <QuizCard
            quiz={counter <= quiz.length - 1 ? quiz[counter] : null}
            currentScore={score}
            handleClick={this.handleClick}
            user={user.user}
            resetCounter={this.resetCounter}
            isAnswered={isAnswered}
            handleDeleteQuiz={this.handleDeleteQuiz}
            submitScore={this.handleSubmitScore}
          />
        ) : (
          <NoQuiz body='no quiz found!' />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(PlayQuiz);
