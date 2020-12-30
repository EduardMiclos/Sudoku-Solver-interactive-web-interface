function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var grid = document.getElementById("grid")
var sudoku = [[], [], [], [], [], [], [], [], []];

async function replace(ev){
  await sleep(1000)
  if(ev.target.type == "text"){
  var cell = ev.target.parentNode.cellIndex
  var row = ev.target.closest("tr").rowIndex
  if(ev.target.value != ""){
    if(isPossible(sudoku, row, cell, ev.target.value, sudoku.length) && ev.target.value <=9 && ev.target.value >=1)
      ev.target.innerHTML = ev.target.value;
    else
      ev.target.parentNode.innerHTML = `<input type="text" placeholder="0"></input>`
      inputSudoku()
  }
  }
}

grid.addEventListener("click", replace);

function inputSudoku(){
  var rows = grid.rows;
  for(var i = 0; i < 9; i++)
    for(var j = 0; j < 9; j++){
        sudoku[i][j] = rows[i].cells[j].textContent;
    }
}

function outputSudoku(sudoku){
  var rows = grid.rows;
  
  for(var i = 0; i < 9; i++)
    for(var j = 0; j < 9; j++)
      rows[i].cells[j].innerHTML = `<input type="text" placeholder="${sudoku[i][j]}"></input>`
}


function isPossible(sudoku, row, col, value, N) {
	
	/* Row check */
	for (var i = 0; i < N; i++)
		if (sudoku[row][i] == value)
			return 0;

	/* Column check */
	for (var i = 0; i < N; i++)
		if (sudoku[i][col] == value)
			return 0;

	/* Submatrix check */
  square_row = 3 * (parseInt(row / 3));
	square_col = 3 * (parseInt(col / 3));
  
	for (var i = square_row; i < square_row + 3; i++) {
		for (var j = square_col; j < square_col + 3; j++)
			if (sudoku[i][j] == value)
				return 0;
	}  
	return 1;
}

function isComplete(sudoku, N) {
	for (var i = 0; i < N; i++) {
		for (var j = 0; j < N; j++)
			if (sudoku[i][j] == 0)
				return 0;
	}
	return 1;
}

function solve(sudoku) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (sudoku[i][j] == 0) {
				for (var n = 1; n < 10; n++) {
					if (isPossible(sudoku, i, j, n, sudoku.length) == 1) {
						sudoku[i][j] = n
            solve(sudoku)
						if(isComplete(sudoku, sudoku.length) == 0){
						  sudoku[i][j] = 0;
            }
					}	
				}
				return;
			}
		}
	}
}

function resetSudoku(){
  for(var i = 0; i < 9; i++)
    for(var j = 0; j < 9; j++)
      sudoku[i][j] = 0;
  
  var rows = grid.rows;
  for(var i = 0; i < 9; i++)
    for(var j = 0; j < 9; j++)
      rows[i].cells[j].innerHTML = `<input type="text" placeholder="0"></input>`    
}

function sudokuSolve(){
  inputSudoku()
  solve(sudoku)
  outputSudoku(sudoku)
}
