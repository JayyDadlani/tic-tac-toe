let turn_count = 0;
let player_score = 0;
let computer_score = 0;
let game_count = 0;
let board_array = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
let empty_btn_array = [
    [0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]
];

function handle_click(evt) {
    evt.preventDefault();
    turn_count++;
    evt.target.removeEventListener('click', handle_click);
    evt.target.textContent = 'X';
    board_array[evt.target.dataset.row][evt.target.dataset.col] = 'X';
    evt.target.style.color = '#E73645';

    for(let i=0; i<empty_btn_array.length; i++) {
        if(evt.target.dataset.row == empty_btn_array[i][0] && evt.target.dataset.col == empty_btn_array[i][1]) {
            empty_btn_array.splice(i, 1);
            break;
        }
    }

    if(turn_count === 9 && !is_winning('X')) {
        reset_draw();
        return;
    }

    if(turn_count > 4) {
        if(is_winning('X')) {
            remove_listeners();
            player_score += 1;
            document.getElementById('player-one-score').textContent = player_score;
            document.getElementById('player-two-score').textContent = computer_score;
            setTimeout(function() {
                reset_board();
            }, 2000);
            return;
        }
    }

    computer_turn();
    
    if(turn_count === 9 && !is_winning('O')) {
        reset_draw();
        return;
    }

    if(turn_count > 4) {
        if(is_winning('O')) {
            remove_listeners();
            computer_score += 1;
            document.getElementById('player-one-score').textContent = player_score;
            document.getElementById('player-two-score').textContent = computer_score;
            setTimeout(function() {
                reset_board();
            }, 2000);
            return;
        }
    }
}

function computer_turn() {
    turn_count++;
    let obj = minimax(false);
    let row = obj.move.row;
    let col = obj.move.col;
    const computer_btn = document.getElementById(`btn${row}${col}`);
    computer_btn.textContent = 'O';
    computer_btn.style.color = '#80CEEF';
    computer_btn.removeEventListener('click', handle_click);
    board_array[row][col] = 'O';
    for(let i=0; i<empty_btn_array.length; i++) {
        if(row === empty_btn_array[i][0] && col === empty_btn_array[i][1]) {
            empty_btn_array.splice(i, 1);
            break;
        }
    }    
}

function minimax(isMax) {
    
    if (is_winning('X')) return { score: 1, move: null };
    if (is_winning('O')) return { score: -1, move: null };

    let isFull = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board_array[i][j] === 0) {
                isFull = false;
                break;
            }
        }
    }
    if (isFull) return { score: 0, move: null }; // Draw

    if (isMax) {
        let maxEval = -Infinity;
        let bestMove = null;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board_array[i][j] === 0) {
                    board_array[i][j] = 'X'; // Max player
                    let eval = minimax(false);
                    board_array[i][j] = 0; // Undo the move
                    if (eval.score > maxEval) {
                        maxEval = eval.score;
                        bestMove = { row: i, col: j }; // Store the best move
                    }
                }
            }
        }
        return { score: maxEval, move: bestMove };
    } else {
        let minEval = Infinity;
        let bestMove = null;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board_array[i][j] === 0) {
                    board_array[i][j] = 'O'; // Min player
                    let eval = minimax(true);
                    board_array[i][j] = 0; // Undo the move
                    if (eval.score < minEval) {
                        minEval = eval.score;
                        bestMove = { row: i, col: j }; // Store the best move
                    }
                }
            }
        }
        return { score: minEval, move: bestMove };
    }
}

function is_winning(turn) {
    // Checking rows
    for (let i = 0; i < 3; i++) {
        if (board_array[i][0] === turn && board_array[i][1] === turn && board_array[i][2] === turn) {
            return true;
        }
    }

    // Checking columns
    for (let i = 0; i < 3; i++) {
        if (board_array[0][i] === turn && board_array[1][i] === turn && board_array[2][i] === turn) {
            return true;
        }
    }

    // Checking diagonals
    if (board_array[0][0] === turn && board_array[1][1] === turn && board_array[2][2] === turn) {
        return true;
    }
    if (board_array[0][2] === turn && board_array[1][1] === turn && board_array[2][0] === turn) {
        return true;
    }

    return false;
}

function reset_draw() {
    player_score += 0.5;
    computer_score += 0.5;
    document.getElementById('player-one-score').textContent = player_score;
    document.getElementById('player-two-score').textContent = computer_score;
    setTimeout(function() {
        reset_board();
    }, 2000);
}

function is_winning(who) {
    // Checking rows
    for(let i=0; i<3; i++) {
        if(board_array[i][0] === who && board_array[i][1] === who && board_array[i][2] === who) {
            return true;
        }
    }
    // Checking columns
    for(let i=0; i<3; i++) {
        if(board_array[0][i] === who && board_array[1][i] === who && board_array[2][i] === who) {
            return true;
        }
    }
    // Checking diagonal
    if(board_array[0][0] === who && board_array[1][1] === who && board_array[2][2] === who) {
        return true;
    }
    if(board_array[0][2] === who && board_array[1][1] === who && board_array[2][0] === who) {
        return true;
    }
    return false;
}

function remove_listeners() {
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            document.getElementById(`btn${i}${j}`).removeEventListener('click', handle_click);
        }
    }
}

function get_random_number(max) {
    return Math.round(Math.random() * (max-1));
}

function reset_board() {
    game_count++;
    turn_count = 0;
    empty_btn_array = [];
    empty_btn_array = [
        [0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]
    ];
    board_array = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            document.getElementById(`btn${i}${j}`).textContent = '';
            document.getElementById(`btn${i}${j}`).addEventListener('click', handle_click);
        }
    }
    document.getElementById('winning-line').className = '';
    if(game_count % 2 === 1) {
        computer_turn();
    }    
}