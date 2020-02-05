import React from 'react';

export default function QuizFooter({ noScore, handleSubmitScore, resetGame }) {
  return (
    <div className='notification'>
      <div className='container'>
        <div className='notification is-light is-success'>
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
            <div>
              <button className='button is-warning' onClick={handleSubmitScore}>
                {noScore ? noScore : 'Submit score'}
              </button>
              <span style={{ margin: '0 10px' }}></span>
              <button className='button is-warning' onClick={resetGame}>
                Reset Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const footer = () => {
//   const { noScore } = this.state;

//   return (
//     <div className='notification'>
//       <div className='container'>
//         <div className='notification is-light is-success'>
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center'
//             }}
//           >
//             <button className='button is-text'>
//               <h3 className='title is-3'>Quiz end...!</h3>
//             </button>
//             <div>
//               <button
//                 className='button is-warning'
//                 onClick={() => {
//                   this.handleSubmitScore();
//                 }}
//               >
//                 {noScore ? noScore : 'Submit score'}
//               </button>
//               <span style={{ margin: '0 10px' }}></span>
//               <button
//                 className='button is-warning'
//                 onClick={() => {
//                   this.resetGame();
//                 }}
//               >
//                 Reset Game
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
