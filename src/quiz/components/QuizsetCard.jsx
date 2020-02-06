import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function QuizsetCard(props) {
  const { user, quizset, deleteQuizset } = props;

  return (
    <div>
      {quizset ? (
        <div className='card'>
          <div className='card-content'>
            <p className='title txt-center capitalize'>{quizset.name}</p>
          </div>
          <footer className='card-footer'>
            {user.isAdmin ? (
              <>
                <Link className='card-footer-item pointer' to='/quizzes/play'>
                  Play
                </Link>
                <Link
                  className='card-footer-item pointer'
                  to={`/quizsets/${quizset._id}/update`}
                >
                  Edit
                </Link>
                <p
                  className='card-footer-item pointer'
                  onClick={() => deleteQuizset(quizset._id)}
                >
                  Delete
                </p>
              </>
            ) : (
              <Link className='card-footer-item pointer' to='/quizzes/play'>
                Play
              </Link>
            )}
          </footer>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
