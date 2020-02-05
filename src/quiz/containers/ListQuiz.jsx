import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuizCard from '../components/QuizCard';
import Loader from '../../app/componets/Loader';
import NoQuiz from '../components/NoQuiz';
import QuizFooter from '../components/QuizFooter';

import { handleFetchQuizzes, handleUpdateScore, deleteQuiz } from '../actions';

import { BASE_URL } from '../../static';

class ListQuiz extends Component {
  state = {
    seletedCategory: 'all',
    filteredQuiz: [],
    counter: 0,
    score: 0,
    isAnswered: false
  };

  componentDidMount = () => {
    const { jwt } = localStorage;
    if (jwt) {
      this.props.dispatch(handleFetchQuizzes(BASE_URL + '/quizzes', jwt));
    }
  };

  handleClick = (option, quiz) => {
    if (option === quiz.answer) {
      this.setState(
        state => {
          return {
            score: state.score + 1
          };
        },
        () => {
          this.props.dispatch({
            type: 'UPDATE_CURRENT_SCORE',
            payload: this.state.score
          });

          var div = document.getElementById(quiz._id);
          if (div) div.style.pointerEvents = 'none';

          this.handleScroll();
          setTimeout(() => {
            let elm = document.getElementById(option);
            if (elm) elm.classList.remove('is-danger');
          }, 300);
        }
      );
    } else {
      var div = document.getElementById(quiz._id);
      if (div) div.style.pointerEvents = 'none';

      this.handleScroll();
      return null;
    }
  };

  updateUserScore = (score, jwt) => {
    this.props.dispatch(
      handleUpdateScore(BASE_URL + '/users/score/update', jwt, score)
    );
  };

  handleDeleteQuiz = id => {
    const { jwt } = localStorage;
    this.props.dispatch(
      deleteQuiz(
        BASE_URL + '/quizzes/' + id + '/delete',
        jwt,
        id,
        this.props.history
      )
    );
  };

  quizCategoryFilter = category => {
    if (!category || category === 'all') {
      this.setState({ filteredQuiz: [] });
    } else {
      this.setState(
        state => ({ seletedCategory: category, score: 0 }),
        () => {
          this.setState({
            filteredQuiz: this.props.quiz.quiz.filter(
              quiz => quiz.category === category
            )
          });
          this.props.dispatch({
            type: 'UPDATE_CURRENT_SCORE',
            payload: this.state.score
          });
        }
      );
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

  resetGame = () => {
    this.resetCounter();
    this.enablePointerEvent();
    window.scroll('scrollY', 0);
  };

  handleSubmitScore = () => {
    const { jwt } = localStorage;
    const { score, seletedCategory } = this.state;

    if (score) {
      this.updateUserScore({ score, category: seletedCategory }, jwt);
      this.resetCounter();
      this.enablePointerEvent();
      window.scroll('scrollY', 0);
    }
    if (!score) {
      this.setState({ noScore: 'No score to submit' });

      setTimeout(() => this.setState({ noScore: '' }), 1000);
    }
  };

  enablePointerEvent = () => {
    const { quiz } = this.props;
    const { filteredQuiz } = this.state;
    var arr = filteredQuiz.length
      ? filteredQuiz
      : quiz && quiz.quiz && quiz.quiz.length
      ? quiz.quiz
      : [];

    if (arr.length) {
      arr.forEach(elm => {
        var div = document.getElementById(elm._id);
        if (div) {
          div.style.pointerEvents = 'all';
        }
      });
    }
  };

  handleScroll = () => {
    var height = document.querySelector('.notification').clientHeight;
    window.scroll('scrollY', window.scrollY + height + 40);
  };

  render() {
    const { questions, user } = this.props;
    const { filteredQuiz, isAnswered, noScore } = this.state;
    const { isLoading } = questions;

    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div
            className=''
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <aside style={{ padding: '30px' }}>
              <ul>
                {questions && questions.category
                  ? questions.category.map(val => {
                      return (
                        <li
                          key={val}
                          className='title is-5'
                          style={{
                            cursor: 'pointer',
                            textTransform: 'capitalize'
                          }}
                          onClick={() => this.quizCategoryFilter(val)}
                        >
                          {val}
                        </li>
                      );
                    })
                  : ''}
              </ul>
            </aside>
            <div className='container'>
              {filteredQuiz && filteredQuiz.length ? (
                filteredQuiz.map((quiz, index) => {
                  return (
                    <div className='container' key={index}>
                      <div className='container'>
                        <div style={{ margin: '40px 0' }}>
                          <QuizCard
                            quiz={quiz}
                            handleClick={this.handleClick}
                            user={user.user}
                            handleDeleteQuiz={this.handleDeleteQuiz}
                            resetCounter={this.resetCounter}
                            isAnswered={isAnswered}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : questions && questions.questions && user && user.user ? (
                questions.questions.map((question, index) => {
                  return (
                    <>
                      <div className='container' key={index}>
                        <div style={{ margin: '40px 0' }}>
                          <QuizCard
                            quiz={question}
                            handleClick={this.handleClick}
                            user={user.user}
                            handleDeleteQuiz={this.handleDeleteQuiz}
                            resetCounter={this.resetCounter}
                            isAnswered={isAnswered}
                          />
                        </div>
                      </div>
                      <QuizFooter
                        noScore={noScore}
                        handleSubmitScore={this.handleSubmitScore}
                        resetGame={this.resetGame}
                      />
                    </>
                  );
                })
              ) : (
                <NoQuiz />
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(ListQuiz);
