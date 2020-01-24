import React from 'react';
import { Link } from 'react-router-dom';

import { FaRegEdit } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';

export default function QuizCard(props) {
  const {
    question,
    user,
    handleClick,
    resetCounter,
    isAnswered,
    handleDeleteQuiz
  } = props;

  return (
    <>
      {question ? (
        <div className='container'>
          <div>
            {user && user.isAdmin ? (
              <div
                className=''
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}
              >
                <Link to={`/quiz/${question._id}/edit`}>
                  <span>
                    <FaRegEdit color='green' fontSize='20px' cursor='pointer' />
                  </span>
                </Link>

                <span style={{ marginLeft: '20px' }}>
                  <TiDelete
                    color='red'
                    fontSize='30px'
                    cursor='pointer'
                    onClick={() => handleDeleteQuiz(question._id)}
                  />
                </span>
              </div>
            ) : (
              ''
            )}

            <div className='notification is-link'>
              <h3 className='title is-3'>{question.question}</h3>
            </div>
          </div>
          <div
            className='grid-container'
            style={{
              padding: '20px 0',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gridAutoFlow: 'row',
              gridGap: '20px'
            }}
          >
            <div
              id='option1'
              style={isAnswered ? { pointerEvents: 'none' } : {}}
              className={`btn notification is-primary ${
                isAnswered && 'option1' === question.answer
                  ? 'is-success'
                  : isAnswered && 'option1' !== question.answer
                  ? 'is-danger'
                  : ''
              }`}
              onClick={() => handleClick('option1', question)}
            >
              <h4 className='title is-5'>{question.option1}</h4>
            </div>
            <div
              id='option2'
              className={`btn notification is-primary ${
                isAnswered && 'option2' === question.answer
                  ? 'is-success'
                  : isAnswered && 'option2' !== question.answer
                  ? 'is-danger'
                  : ''
              }`}
              style={isAnswered ? { pointerEvents: 'none' } : {}}
              onClick={() => handleClick('option2', question)}
            >
              <h4 className='title is-5'>{question.option2}</h4>
            </div>
            <div
              id='option3'
              className={`btn notification is-primary ${
                isAnswered && 'option3' === question.answer
                  ? 'is-success'
                  : isAnswered && 'option3' !== question.answer
                  ? 'is-danger'
                  : ''
              }`}
              style={isAnswered ? { pointerEvents: 'none' } : {}}
              onClick={() => handleClick('option3', question)}
            >
              <h4 className='title is-5'>{question.option3}</h4>
            </div>
            <div
              id='option4'
              className={`btn notification is-primary ${
                isAnswered && 'option4' === question.answer
                  ? 'is-success'
                  : isAnswered && 'option4' !== question.answer
                  ? 'is-danger'
                  : ''
              }`}
              style={isAnswered ? { pointerEvents: 'none' } : {}}
              onClick={() => handleClick('option4', question)}
            >
              <h4 className='title is-5'>{question.option4}</h4>
            </div>
          </div>
        </div>
      ) : (
        <div className='container'>
          <div className='notification is-danger'>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <button className='button is-text'>
                <h3 className='title is-3'>Quiz end...!</h3>
              </button>
              <button className='button is-info' onClick={resetCounter}>
                Play again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
