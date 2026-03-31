import { useState } from 'react'
import './App.css'
import { fortunes } from './data/fortunes'
import CherryBlossom from './components/CherryBlossom'
import CherryBlossomPetals from './components/CherryBlossomPetals'

function App() {
  const [gameState, setGameState] = useState('ENTERING_NAME'); // ENTERING_NAME, CHOOSING, BLOOMING, REVEALED
  const [userName, setUserName] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [fortune, setFortune] = useState(null);

  const handleStart = (name) => {
    if (!name.trim()) return;
    setUserName(name);
    setGameState('CHOOSING');
  };

  const handlePetalClick = (id) => {
    if (gameState !== 'CHOOSING') return;

    setSelectedId(id);
    setGameState('BLOOMING');

    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    // Animate blooming, then reveal
    setTimeout(() => {
      setFortune(randomFortune);
      setGameState('REVEALED');
    }, 1300);
  };

  const handleReset = () => {
    setGameState('CHOOSING');
    setSelectedId(null);
    setFortune(null);
  };

  return (
    <div className="App">
      <CherryBlossomPetals />
      <div className="pattern-overlay"></div>
      <header>
        <div className="cherry-blossom-emoji">🌸</div>
        <h1>봄맞이 행운을 드립니다</h1>
        <p className="subtitle">벚꽃잎을 하나 클릭하여 당신만의 행운을 확인해 보세요</p>
      </header>

      <main className="game-area">
        {gameState === 'ENTERING_NAME' && (
          <div className="name-input-container">
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              className="name-input"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleStart(e.target.value);
              }}
              autoFocus
            />
            <button
              className="start-btn"
              onClick={(e) => handleStart(e.target.previousSibling.value)}
            >
              행운 확인하기
            </button>
          </div>
        )}

        {gameState !== 'REVEALED' && gameState !== 'ENTERING_NAME' && (
          <div className={`blossoms-grid ${gameState !== 'CHOOSING' ? 'focused' : ''}`}>
            {[1, 2, 3].map((id) => {
              // During blooming, only show the selected one
              if (gameState === 'BLOOMING' && selectedId !== id) return null;

              return (
                <div key={id} className={`blossom-wrapper ${selectedId === id ? 'active' : ''}`}>
                  <CherryBlossom
                    isOpen={selectedId === id && gameState !== 'CHOOSING'}
                    onClick={() => handlePetalClick(id)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {gameState === 'REVEALED' && (
          <div className="reveal-area">
            <div className="user-name-tag">{userName}님의 벚꽃 행운</div>
            <div className="fortune-paper-box">
              <p className="fortune-text">"{userName}님의 찾아올 봄날은 {fortune}"</p>
              <div className="lucky-numbers">
                행운의 숫자: {(() => {
                  const numbers = new Set();
                  while (numbers.size < 6) {
                    numbers.add(Math.floor(Math.random() * 45) + 1);
                  }
                  return Array.from(numbers).sort((a, b) => a - b).join(', ');
                })()}
              </div>
              <button className="reset-btn" onClick={handleReset}>다른 꽃잎 뽑기</button>
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>따뜻한 봄날, 벚꽃과 함께 찾아올 당신의 행운 🌸</p>
      </footer>
    </div>
  )
}

export default App
