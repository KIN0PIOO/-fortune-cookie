import { useState } from 'react'
import './App.css'
import { fortunes } from './data/fortunes'
import Cookie from './components/Cookie'
import FortuneSlip from './components/FortuneSlip'

function App() {
  const [gameState, setGameState] = useState('CHOOSING'); // CHOOSING, CRACKING, REVEALED
  const [selectedId, setSelectedId] = useState(null);
  const [fortune, setFortune] = useState(null);

  const handleCookieClick = (id) => {
    if (gameState !== 'CHOOSING') return;

    setSelectedId(id);
    setGameState('CRACKING');

    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    // Animate cracking, then reveal
    setTimeout(() => {
      setFortune(randomFortune);
      setGameState('REVEALED');
    }, 800);
  };

  const handleReset = () => {
    setGameState('CHOOSING');
    setSelectedId(null);
    setFortune(null);
  };

  return (
    <div className="App">
      <div className="pattern-overlay"></div>
      <header>
        <div className="korean-knot"></div>
        <h1>포츈 쿠키</h1>
        <p className="subtitle">쿠키를 클릭하여 행운을 확인해 보세요</p>
      </header>

      <main className="game-area">
        {gameState !== 'REVEALED' && (
          <div className={`cookies-grid ${gameState !== 'CHOOSING' ? 'focused' : ''}`}>
            {[1, 2, 3].map((id) => {
              if (gameState !== 'CHOOSING' && selectedId !== id) return null;

              return (
                <div key={id} className={`cookie-wrapper ${selectedId === id ? 'active' : ''}`}>
                  <Cookie
                    isOpen={selectedId === id && gameState !== 'CHOOSING'}
                    onClick={() => handleCookieClick(id)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {gameState === 'REVEALED' && (
          <FortuneSlip message={fortune} onReset={handleReset} />
        )}
      </main>

      <footer>
        <p>새해 복 많이 받으세요</p>
      </footer>
    </div>
  )
}

export default App
