import React, { Component } from 'react';
import QuizCard from '../components/QuizCard';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:8000/api/v1';

class ListQuiz extends Component {
  state = {
    seletedCategory: null
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
          if (data.success) {
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

  handleDeleteQuiz = id => {
    const { jwt } = localStorage;
    if (jwt) {
      fetch(BASE_URL + '/questions/' + id + '/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.props.dispatch({
              type: 'DELETE_QUIZ',
              payload: id
            });
          }
          if (!data.success) {
            console.log(data.message, 'delete question unsuccessfull...');
          }
        })
        .catch(err => {
          console.log(err, 'delete question catch err...');
        });
    }
  };

  handleQuizCategory = category => {
    console.log(category);

    this.setState({ seletedCategory: category }, () => console.log(this.state));
  };

  filtereQuiz = (quiz, seletedCategory) => {
    console.log('inside quiz filter...');

    if (quiz.quiz && seletedCategory !== 'all') {
      return quiz.quiz.filter(question => {
        console.log(question, 'filter....');
        return question.category === seletedCategory;
      });
    } else return null;
  };

  render() {
    const { quiz, user, seletedCategory } = this.props;

    let filteredQuiz = seletedCategory
      ? this.filtereQuiz(quiz, seletedCategory)
      : [];

    console.log(filteredQuiz, 'list quiz rnder.....');

    return (
      <div
        className=''
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <aside style={{ padding: '30px' }}>
          <ul>
            <li
              className='title is-4'
              style={{ cursor: 'pointer', textTransform: 'capitalize' }}
              onClick={() => this.handleQuizCategory('all')}
            >
              all
            </li>
            <li
              className='title is-4'
              style={{ cursor: 'pointer', textTransform: 'capitalize' }}
              onClick={() => this.handleQuizCategory('science')}
            >
              science
            </li>
            <li
              className='title is-4'
              style={{ cursor: 'pointer', textTransform: 'capitalize' }}
              onClick={() => this.handleQuizCategory('computer')}
            >
              computer
            </li>
            <li
              className='title is-4'
              style={{ cursor: 'pointer', textTransform: 'capitalize' }}
              onClick={() => this.handleQuizCategory('space')}
            >
              space
            </li>
            <li
              className='title is-4'
              style={{ cursor: 'pointer', textTransform: 'capitalize' }}
              onClick={() => this.handleQuizCategory('bio')}
            >
              bio
            </li>
          </ul>
        </aside>
        <div className='container'>
          {quiz && quiz.quiz && user && user.user
            ? quiz.quiz.map(question => {
                return (
                  <div className='container'>
                    <QuizCard
                      question={question}
                      handleClick={this.handleClick}
                      user={user.user}
                      handleDeleteQuiz={this.handleDeleteQuiz}
                    />
                  </div>
                );
              })
            : filteredQuiz
            ? filteredQuiz.map(question => {
                return (
                  <div className='container'>
                    <QuizCard
                      question={question}
                      handleClick={this.handleClick}
                      user={user.user}
                      handleDeleteQuiz={this.handleDeleteQuiz}
                    />
                  </div>
                );
              })
            : 'no question found...'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(ListQuiz);
