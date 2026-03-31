import { useState } from 'react'
import './App.css'
import { fortunes } from './data/fortunes'
import CherryBlossom from './components/CherryBlossom'
import FortuneSlip from './components/FortuneSlip'
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

  const handleBlossomClick = (id) => {
    if (gameState !== 'CHOOSING') return;

    setSelectedId(id);
    setGameState('BLOOMING');

    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    // Animate blooming, then reveal
    setTimeout(() => {
      setFortune(randomFortune);
      setGameState('REVEALED');
    }, 1000); // slightly longer for the beautiful bloom animation
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
        <div className="cherry-blossom">🌸</div>
        <h1>봄맞이 벚꽃 행운 뽑기</h1>
        <p className="subtitle">수줍은 꽃망울을 피워 당신만의 행운을 확인해 보세요</p>
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
              운세 보러가기
            </button>
          </div>
        )}

        {gameState !== 'REVEALED' && gameState !== 'ENTERING_NAME' && (
          <div className={`blossoms-grid ${gameState !== 'CHOOSING' ? 'focused' : ''}`}>
            {[1, 2, 3].map((id) => {
              if (gameState !== 'CHOOSING' && selectedId !== id) return null;

              return (
                <div key={id} className={`blossom-wrapper ${selectedId === id ? 'active' : ''}`}>
                  <CherryBlossom
                    isOpen={selectedId === id && gameState !== 'CHOOSING'}
                    onClick={() => handleBlossomClick(id)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {gameState === 'REVEALED' && (
          <FortuneSlip message={fortune} userName={userName} onReset={handleReset} />
        )}
      </main>

      <footer>
        <p>따뜻한 봄날, 흩날리는 벚꽃잎처럼 찾아올 당신의 행운 🌸</p>
      </footer>
    </div>
  )
}

export default App
