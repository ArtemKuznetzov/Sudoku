
const easy1 = `
3 0 9  8 2 6  5 7 1
1 5 8  4 7 3  9 2 6
7 6 2  5 9 1  8 4 3

9 8 4  1 5 2  6 3 7
2 3 1  7 6 8  4 9 5
5 7 6  9 3 4  2 1 8

8 2 3  6 4 7  1 5 9
6 9 7  2 1 5  3 8 4
4 0 5  3 8 9  7 6 0
`

const easy2 = `
0 2 7  4 3 6  5 9 1
1 9 3  2 8 5  4 0 6
4 5 0  7 9 1  2 8 3

5 6 4  8 0 3  9 0 2
9 3 8  1 0 2  7 4 5
0 1 2  5 4 9  3 0 8

3 8 5  9 1 7  6 0 4
6 7 1  3 0 4  8 0 0
2 4 9  6 5 8  1 3 0
`

const easy3 = `
0 2 4  9 8 1  6 3 0
1 0 9  6 0 5  8 4 7
8 6 5  7 4 3  2 0 1

3 1 6  2 9 8  7 5 0
9 7 2  3 0 4  1 6 8
5 4 0  1 7 0  0 0 3

6 0 0  0 1 0  4 8 2
2 8 1  4 0 9  0 7 6
4 5 7  0 6 2  3 1 0
`;

const medium1 = `
0 5 7  4 0 2  6 3 8
4 0 0  8 3 0  9 7 2
2 0 8  0 7 9  4 5 1

8 2 0  0 0 4  5 1 0
0 0 4  2 6 0  7 0 0
0 6 0  3 0 8  0 9 4

6 8 0  0 4 3  1 0 0
0 0 0  9 0 6  3 4 0
3 0 5  1 0 0  8 0 9
`;

const medium2 = `
2 3 0  9 0 0  7 0 4
7 0 9  4 1 3  0 0 2
4 0 0  2 0 8  0 5 3

0 0 0  1 3 6  2 7 0
0 8 0  0 2 4  0 0 0
3 2 1  0 0 7  0 6 5

0 6 2  3 0 0  0 4 7
5 0 0  6 0 2  0 0 1
8 0 3  7 4 1  0 2 6
`;

const medium3 = `
0 0 1  2 5 0  0 0 0
7 0 3  0 6 8  0 1 5
2 5 8  0 9 0  0 4 6

4 0 0  3 0 6  9 5 0
3 8 6  5 0 0  0 2 7
0 0 5  8 1 0  0 6 0

0 6 7  9 0 0  0 3 2
0 0 9  0 0 5  6 0 0
0 3 0  0 2 7  0 0 1
`;

const hard1 = `
3 0 9  0 2 0  0 7 0
1 0 8  4 0 0  0 2 6
7 6 0  0 0 1  8 0 0

0 8 0  1 5 0  0 3 7
2 3 0  0 6 0  4 0 0
5 0 0  0 0 0  0 1 8

0 2 0  0 0 7  0 0 9
6 0 0  2 0 5  0 0 4
0 1 5  3 0 0  7 6 0
`;

const hard2 = `
0 6 2  5 8 4  0 1 7
0 4 0  0 0 9  0 0 8
8 9 0  0 0 3  2 0 5

2 0 0  6 0 0  0 0 9
0 0 9  3 0 7  0 8 6
0 3 4  0 0 1  5 0 0

0 0 5  0 0 2  0 0 0
0 0 6  9 0 0  0 0 3
0 2 3  0 0 6  0 5 1
`;

const hard3 = `
0 8 6  0 0 5  3 1 4
0 0 0  8 0 9  0 0 6
3 5 0  6 0 4  0 0 8

0 3 0  0 6 0  1 4 0
0 6 1  3 0 7  0 0 0
7 0 0  0 0 1  0 6 3

0 0 2  0 0 3  7 9 0
0 0 0  0 0 0  0 0 1
5 9 3  1 7 0  0 8 0
`;





const easyArray = [easy1, easy2, easy3];
let selectArray;
let intervalId;
const easyHandler = (event) => {
     selectArray = easyArray[Math.floor(Math.random() * Math.floor(3))];
     const sudoku = new Sudoku(selectArray)
     const oldChild = document.querySelector('#game').querySelector('.sudoku-gamearea');
     document.querySelector('#game').replaceChild(sudoku.getHTML(800), oldChild)
     startTimer(120200, sudoku)
}

const mediumArray = [medium1, medium2, medium3];
let selectArray2;
const mediumHandler = (event) => {
     selectArray2 = mediumArray[Math.floor(Math.random() * Math.floor(3))];
     const sudoku = new Sudoku(selectArray2)
     const oldChild = document.querySelector('#game').querySelector('.sudoku-gamearea');
     document.querySelector('#game').replaceChild(sudoku.getHTML(800), oldChild)
     startTimer(600200, sudoku)
}

const hardArray = [hard1, hard2, hard3];
let selectArray3;
const hardHandler = (event) => {
     selectArray3 = hardArray[Math.floor(Math.random() * Math.floor(3))];
     const sudoku = new Sudoku(selectArray3)
     const oldChild = document.querySelector('#game').querySelector('.sudoku-gamearea');
     document.querySelector('#game').replaceChild(sudoku.getHTML(800), oldChild)
     startTimer(900200, sudoku)
}


const sudoku = new Sudoku() //для создания пустого поля, чтобы было к чему обращаться



document.getElementById('easy').addEventListener('click', event => easyHandler(event));
document.getElementById('medium').addEventListener('click', event => mediumHandler(event));
document.getElementById('hard').addEventListener('click', event => hardHandler(event));
document.getElementById('game').append(sudoku.getHTML(800)) 



const startTimer = (overtime, currentSudoku) => {
     const endTime = Date.now() + overtime;
     clearInterval(intervalId);
     intervalId = setInterval(() => {
         if (currentSudoku.isComplete) {
          document.getElementById('timer').textContent = 'Вы победили'
          clearInterval(intervalId)
          currentSudoku.disable()
          return;
          }
                    if (endTime-Date.now() <=0) {
                         document.getElementById('timer').textContent = 'Вы проиграли'
                         currentSudoku.disable()
                    } else {
                         document.getElementById('timer').textContent = `${Math.floor(((endTime-Date.now())/1000)/60)}:${Math.floor(((endTime-Date.now())/1000)%60)}`
                    }
     }, 1000)
}