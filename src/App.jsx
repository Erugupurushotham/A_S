import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="app-shell">
      <section className="welcome-card" aria-labelledby="welcome-title">
        <div className="brand-mark" aria-hidden="true">
          A
        </div>
        <p className="eyebrow">Your React workspace is ready</p>
        <h1 id="welcome-title">Welcome to Auto</h1>
        <p className="intro">
          Start building your app. Edit <code>src/App.jsx</code> and save to see
          your changes.
        </p>
        <button className="counter-button" onClick={() => setCount((value) => value + 1)}>
          Count is {count}
        </button>
        <p className="hint">Built with React and Vite</p>
      </section>
    </main>
  )
}

export default App
