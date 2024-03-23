
    let moves = 0;
    let points = 0;
    let firstCard = null;
    let secondCard = null;

    const images = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🥑', '🥝'];
    const shuffledImages = shuffle([...images, ...images]);

    function createBoard() {
        const gameBoard = document.getElementById('gameBoard');
        for (let i = 0; i < shuffledImages.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.textContent = '?';
            card.dataset.index = i;
            card.addEventListener('click', () => {
                flipCard(card);
            });
            gameBoard.appendChild(card);
        }
    }

    function flipCard(card) {
        if (card.textContent === '?' && !card.classList.contains('matched')) {
            const index = parseInt(card.dataset.index);
            card.textContent = shuffledImages[index];
            if (firstCard === null) {
                firstCard = { card, index };
            } else if (secondCard === null && card !== firstCard.card) {
                secondCard = { card, index };
                moves++;
                document.getElementById('moveCounter').textContent = moves;
                if (firstCard.card.textContent === secondCard.card.textContent) {
                    firstCard.card.classList.add('matched');
                    secondCard.card.classList.add('matched');
                    points += 10;
                    document.getElementById('pointsCounter').textContent = points;
                    firstCard = null;
                    secondCard = null;
                } else {
                    setTimeout(() => {
                        firstCard.card.textContent = '?';
                        secondCard.card.textContent = '?';
                        firstCard = null;
                        secondCard = null;
                    }, 1000);
                }
            }
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    createBoard();
