const board = document.getElementById('board');

function create_board() {
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            const btn = document.createElement('button');
            btn.id = `btn${i}${j}`;
            btn.dataset.row = `${i}`;
            btn.dataset.col = `${j}`;
            btn.classList.add('btn-style');
            btn.addEventListener('click', handle_click);
            board.appendChild(btn);
        }
    }

    // Adding borders
    document.getElementById('btn00').classList.add('border-bottom', 'border-right');
    document.getElementById('btn01').classList.add('border-left', 'border-bottom', 'border-right');
    document.getElementById('btn02').classList.add('border-left', 'border-bottom');
    document.getElementById('btn10').classList.add('border-top', 'border-bottom', 'border-right');
    document.getElementById('btn11').classList.add('border-top', 'border-left', 'border-bottom', 'border-right');
    document.getElementById('btn12').classList.add('border-top', 'border-left', 'border-bottom');
    document.getElementById('btn20').classList.add('border-top', 'border-right');
    document.getElementById('btn21').classList.add('border-top', 'border-left', 'border-right');
    document.getElementById('btn22').classList.add('border-top', 'border-left');

    // Adding border-radius
    document.getElementById('btn00').style.borderTopLeftRadius = '20px';
    document.getElementById('btn02').style.borderTopRightRadius = '20px';
    document.getElementById('btn20').style.borderBottomLeftRadius = '20px';
    document.getElementById('btn22').style.borderBottomRightRadius = '20px';
}

function initialize() {
    create_board();
}

initialize();