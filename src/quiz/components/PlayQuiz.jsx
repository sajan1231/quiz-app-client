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

  updateScore = score => {
    const { jwt } = localStorage;
    fetch(BASE_URL + '/users/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: jwt
      },
      body: JSON.stringify({ score })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'user login data');
        console.log('upadate user score successfull');

        if (data.success) {
          if (data.token) {
            localStorage.setItem('jwt', data.token);
          }
          this.props.dispatch({ type: 'UPDATE_USER', payload: data });
          if (data.user.isAdmin) {
            // this.props.history.push('/users/admindashboard');
          } else {
            // this.props.history.push('/users/userdashboard');
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

  handleClick = (e, question) => {
    console.log(e.target.id, question, 'dataset id...');
    const id = e.target.id;

    if (id === question.answer) {
      e.target.classList.add('is-success');

      this.setState(
        state => {
          return {
            score: state.score + 1,
            isAnswered: !this.state.isAnswered
          };
        },
        () => this.updateScore(this.state.score)
      );

      setTimeout(
        () =>
          this.setState(state => {
            return {
              counter: state.counter + 1,
              isAnswered: !state.isAnswered
            };
          }),
        1000
      );
      return true;
    } else {
      e.target.classList.add('is-danger');

      this.setState({ isAnswered: !this.state.isAnswered });
      setTimeout(
        () =>
          this.setState(state => {
            return {
              counter: state.counter + 1,
              isAnswered: !state.isAnswered
            };
          }),
        1000
      );
      return false;
    }
  };

  resetCounter = () => {
    this.setState({ counter: 0 });
  };

  render() {
    const { questions, counter, isAnswered, score } = this.state;
    const { user } = this.props.user;

    console.log(
      score,
      user,
      questions,
      counter,
      questions.length,
      'play quiz questions count...'
    );

    return (
      <div>
        {questions ? (
          <QuizCard
            question={questions[counter] || null}
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
