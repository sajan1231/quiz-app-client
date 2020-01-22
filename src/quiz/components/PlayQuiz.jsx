import React, { Component } from 'react';
import QuizCard from './QuizCard';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:8000/api/v1';

class PlayQuiz extends Component {
  state = {
    questions: [],
    counter: 0,
    isAnswered: false,
    score: 0
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
            this.setState({ questions: data.questions });
          } else {
            this.setState({ err: data.message });
          }
        })
        .catch(err => {
          console.log('fetch quiz error...');
        });
    }
  };

  updateTotalScore = () => {
    console.log(
      'update total score....................................................'
    );

    const { jwt } = localStorage;
    if (jwt) {
      fetch(BASE_URL + '/users/update/total-score', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data, 'user total score update data....');
          if (data.success) {
            // this.setState({ questions: data.questions });
          } else {
            // this.setState({ err: data.message });
          }
        })
        .catch(err => {
          console.log(err, 'update user total score fetch error...');
        });
    }
  };

  updateScore = score => {
    console.log(score);

    const { jwt } = localStorage;
    fetch(BASE_URL + '/users/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: jwt
      },
      body: JSON.stringify({ score: score })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'user login data...');
        console.log('upadate user score successfull...');

        if (data.success) {
          if (data.token) {
            localStorage.setItem('jwt', data.token);
          }
          this.props.dispatch({ type: 'UPDATE_USER', payload: data });
          if (data.user.isAdmin) {
            // this.props.history.push('/users/admin-dashboard');
          } else {
            // this.props.history.push('/users/user-dashboard');
          }
        }
        if (!data.success) {
          console.log('upadate user score unsuccessfull');

          // this.props.history.push('/users/login');
        }
      })
      .catch(err => {
        console.log(err, 'login user catch err');
      });
  };

  handleClick = (e, option, question) => {
    console.log(e.target.id, question, 'target id...');
    const { questions, counter } = this.state;
    // const option = option;
    console.log(
      counter,
      questions.length - 1,
      'counter < questions.length-1...'
    );

    if (counter <= questions.length - 1) {
      if (option && option === question.answer) {
        if (option && counter < questions.length - 1) {
          document.getElementById(option).classList.add('is-success');
        }

        this.setState(
          state => {
            return {
              score: state.score + 1,
              isAnswered: !this.state.isAnswered
            };
          },
          () => this.updateScore(this.state.score),
          this.updateTotalScore()
        );

        setTimeout(
          () =>
            this.setState(
              state => {
                return {
                  counter: state.counter + 1,
                  isAnswered: !state.isAnswered
                };
              },
              () => {
                if (option && counter < questions.length - 1) {
                  document
                    .getElementById(option)
                    .classList.remove('is-success');
                }
              }
            ),
          1000
        );
        return true;
      } else {
        if (option && counter < questions.length - 1) {
          document.getElementById(option).classList.add('is-danger');
        }

        this.setState({ isAnswered: !this.state.isAnswered });
        setTimeout(
          () =>
            this.setState(
              state => {
                return {
                  counter: state.counter + 1,
                  isAnswered: !state.isAnswered
                };
              },
              () => {
                if (option && counter < questions.length - 1) {
                  document.getElementById(option).classList.remove('is-danger');
                }
              }
            ),
          1000
        );
        return false;
      }
    } else {
      return null;
    }
  };

  resetCounter = () => {
    this.setState({ counter: 0, score: 0 });
  };

  render() {
    const { questions, counter, isAnswered, score } = this.state;
    const { user } = this.props.user;

    console.log(
      score,
      user,
      questions,
      counter,
      questions.length - 1,
      'play quiz questions count...'
    );

    return (
      <div>
        {questions ? (
          <QuizCard
            question={
              counter <= questions.length - 1 ? questions[counter] : null
            }
            handleClick={this.handleClick}
            user={user}
            resetCounter={this.resetCounter}
            isAnswered={isAnswered}
          />
        ) : (
          'err...'
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state, 'playquiz map state...');
  return state;
}

export default connect(mapStateToProps)(PlayQuiz);
