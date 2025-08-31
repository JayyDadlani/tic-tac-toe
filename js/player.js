let player_turn = 'X';
let turn_count = 0;
let player_one_score = 0;
let player_two_score = 0;
let game_count = 0;
let board_array = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

function handle_click(evt) {
    evt.preventDefault();
    turn_count++;
    evt.target.removeEventListener('click', handle_click);
    evt.target.textContent = player_turn;
    board_array[evt.target.dataset.row][evt.target.dataset.col] = player_turn;
    if(player_turn === 'X') {
        evt.target.style.color = '#E73645';    
    } else {
        evt.target.style.color = '#80CEEF';
    }      

    if(turn_count === 9 && !is_winning(player_turn)) {
        remove_listeners();
        player_one_score += 0.5;
        player_two_score += 0.5;
        document.getElementById('player-one-score').textContent = player_one_score;
        document.getElementById('player-two-score').textContent = player_two_score;
        setTimeout(function() {
            reset_board();
        }, 2000);
        return;
    }

    if(turn_count > 4) {
        if(is_winning(player_turn)) {
            remove_listeners();
            if(player_turn === 'X') {
                player_one_score += 1;
            } else {
                player_two_score += 1;
            }
            document.getElementById('player-one-score').textContent = player_one_score;
            document.getElementById('player-two-score').textContent = player_two_score;
            setTimeout(function() {
                reset_board();
            }, 2000);
            return;
        }
    }

    if(player_turn === 'X') {
        player_turn = 'O';
    } else {
        player_turn = 'X';
    }  
}

function is_winning(who) {
    // Checking rows
    for(let i=0; i<3; i++) {
        if(board_array[i][0] === who && board_array[i][1] === who && board_array[i][2] === who) {
            if(i === 0) {
                document.getElementById('winning-line').classList.add('first-row-line');
            } else if(i === 1) {
                document.getElementById('winning-line').classList.add('second-row-line');
            } else {
                document.getElementById('winning-line').classList.add('third-row-line');
            }
            document.getElementById('winning-line').classList.add('line', 'row');
            return true;
        }
    }
    // Checking columns
    for(let i=0; i<3; i++) {
        if(board_array[0][i] === who && board_array[1][i] === who && board_array[2][i] === who) {
            if(i === 0) {
                document.getElementById('winning-line').classList.add('first-col-line');
            } else if(i === 1) {
                document.getElementById('winning-line').classList.add('second-col-line');
            } else {
                document.getElementById('winning-line').classList.add('third-col-line');
            }
            document.getElementById('winning-line').classList.add('line', 'col');
            return true;
        }
    }
    // Checking diagonal
    if(board_array[0][0] === who && board_array[1][1] === who && board_array[2][2] === who) {
        document.getElementById('winning-line').classList.add('first-diagonal', 'line', 'row');
        return true;
    }
    if(board_array[0][2] === who && board_array[1][1] === who && board_array[2][0] === who) {
        document.getElementById('winning-line').classList.add('second-diagonal', 'line', 'row');
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

function reset_board() {
    game_count++;
    if(game_count % 2 === 1) {
        player_turn = 'O';
    } else {
        player_turn = 'X';
    }
    turn_count = 0;

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
}