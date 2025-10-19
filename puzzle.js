// Mini Game Puzzle Logic với ảnh đã cắt sẵn
console.log('Puzzle script loaded successfully');

class PuzzleGame {
    constructor() {
        console.log('Initializing PuzzleGame...');
        this.size = 3;
        this.total = this.size * this.size;
        this.board = document.getElementById('puzzleBoard');
        this.movesCount = document.getElementById('movesCount');
        this.gameStatus = document.getElementById('gameStatus');
        
        console.log('Board element:', this.board);
        
        this.moves = 0;
        this.selected = null;
        this.state = Array.from({length: this.total}, (_, i) => i);
        this.numbersVisible = false; // Ẩn số mặc định
        
        this.init();
    }
    
    init() {
        console.log('Initializing game...');
        this.shuffle(200);
        this.render();
        // Ẩn số ngay từ đầu
        this.board.classList.add('hidden-numbers');
    }
    
    bindEvents() {
        // Không cần bind events cho các nút đã xóa
    }
    
    getPieceImage(tileId) {
        const row = Math.floor(tileId / 3);
        const col = tileId % 3;
        return `puzzle_pieces_9/piece_${row}_${col}.jpg`;
    }
    
    render() {
        console.log('Rendering puzzle game...');
        if (!this.board) {
            console.error('Board element not found!');
            return;
        }
        
        this.board.innerHTML = '';
        
        for (let pos = 0; pos < this.total; pos++) {
            const tileId = this.state[pos];
            const div = document.createElement('div');
            div.className = 'puzzle-tile';
            div.dataset.number = (tileId + 1);
            
            const imagePath = this.getPieceImage(tileId);
            div.style.backgroundImage = `url('${imagePath}')`;
            div.style.backgroundSize = "cover";
            div.style.backgroundPosition = "center";
            
            console.log(`Tile ${pos}: ${imagePath}`);
            
            div.addEventListener('click', () => this.onTileClick(pos));
            this.board.appendChild(div);
        }
        console.log('Puzzle rendered successfully');
    }
    
    onTileClick(pos) {
        const tiles = [...this.board.children];
        
        if (this.selected === null) {
            this.selected = pos;
            tiles[pos].classList.add('selected');
            return;
        }
        
        if (this.selected === pos) {
            tiles[pos].classList.remove('selected');
            this.selected = null;
            return;
        }
        
        const tmp = this.state[this.selected];
        this.state[this.selected] = this.state[pos];
        this.state[pos] = tmp;
        
        this.moves++;
        tiles[this.selected].classList.remove('selected');
        this.selected = null;
        
        this.updateMoves();
        this.render();
        
        if (this.isSolved()) {
            this.gameStatus.textContent = '🎉 Hoàn thành! Em thật tuyệt vời! 💕';
            this.gameStatus.classList.add('success');
            
            // Tự động chuyển sang section tiếp theo sau 2 giây
            setTimeout(() => {
                nextSection('album-section');
            }, 2000);
        } else {
            this.gameStatus.textContent = 'Tiếp tục nào... Em sắp xong rồi! ✨';
            this.gameStatus.classList.remove('success');
        }
    }
    
    isSolved() {
        return this.state.every((tileId, i) => tileId === i);
    }
    
    shuffle(times = 100) {
        for (let i = 0; i < times; i++) {
            const a = Math.floor(Math.random() * this.total);
            const b = Math.floor(Math.random() * this.total);
            if (a !== b) {
                [this.state[a], this.state[b]] = [this.state[b], this.state[a]];
            }
        }
        if (this.isSolved()) {
            this.shuffle(times);
        }
    }
    
    updateMoves() {
        if (this.movesCount) {
            this.movesCount.textContent = this.moves;
        }
    }
}

// Khởi tạo game khi chuyển đến section puzzle
function initPuzzleGame() {
    console.log('initPuzzleGame called');
    if (!window.puzzleGameInstance) {
        console.log('Creating new puzzle game instance...');
        window.puzzleGameInstance = new PuzzleGame();
    } else {
        console.log('Puzzle game instance already exists');
    }
}
