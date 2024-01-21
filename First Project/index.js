function solveNQueens(n) {
    const result = []
    function isSafe(board, row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i] === col ||
                board[i] - i === col - row ||
                board[i] + i === col + row
            ) {
                return false;
            }
        }
        return true;
    }
    function placeQueens(row, board) {
        return new Promise(resolve => {
            if (row === n) {
                // If all queens are placed, add the solution to the result
                setTimeout(function () {
                    result.push(board.slice());
                    resolve();
                }, 1000);
                // console.log(board);
                // console.log("Solution");
                return;
            }
            async function placeQueen() {
                for (let col = 0; col < n; col++) {
                    if (isSafe(board, row, col)) {
                        // Place queen and move to the next row
                        board[row] = col;
                        // console.log(board);
                        // console.log("Placed");
                        $("#"+row+col).text("Q"); 
                        await new Promise(resolve => setTimeout(resolve, 100));
                        await placeQueens(row + 1, board);
                        // Backtrack to explore other possibilities
                        board[row] = undefined;
                        // console.log(board);
                        // console.log("Removed");
                        $("#"+row+col).text("");
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                }
            }
            placeQueen().then(resolve);
        });
    }
    placeQueens(0, Array(n).fill(undefined)).then(() => {
        // console.log(result.map(board => board.map(col => '.'.repeat(col) + 'Q' + '.'.repeat(n - col - 1))));
    });
}
$("#bk").mouseover(function() {
    solveNQueens(parseInt($("#floatingInput").val()));
});

$("#bk").click(function() {
    solveNQueens(parseInt($("#floatingInput").val()));
});