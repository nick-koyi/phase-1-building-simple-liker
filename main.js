// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Your JavaScript code goes here!

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = 'http://mimicServer.example.com', config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject('Random server error. Try again.');
      } else {
        resolve('Pretend remote server notified of action!');
      }
    }, 300);
  });
}

const articleHearts = document.querySelectorAll('.like-glyph');

for (const glyph of articleHearts) {
  glyph.addEventListener('click', (e) => {
    const heart = e.target;
    const isFull = heart.innerText === FULL_HEART;
    mimicServerCall()
      .then(() => {
        if (isFull) {
          heart.innerText = EMPTY_HEART;
        } else {
          heart.innerText = FULL_HEART;
          heart.classList.add('activated-heart');
        }
      })
      .catch(() => {
        const modal = document.querySelector('#modal');
        if (modal.classList.contains('hidden')) {
          modal.classList.remove('hidden');
          setTimeout(() => {
            modal.classList.add('hidden');
          }, 3000);
        }
      });
  });
}
