import { useEffect, useRef, useState } from 'react'
import './App.css'

const TEST_DURATION = 30
const PASSAGES = [
  'Small steps compound into remarkable progress. Find your rhythm, stay curious, and let the next keystroke be enough.',
  'The best tools disappear into the work. Clear ideas move quickly when every detail has room to breathe.',
  'Good writing is patient thinking made visible. Take a breath, choose the right word, and keep moving forward.',
]

type Theme = 'light' | 'dark'

function Icon({ name }: { name: 'sun' | 'moon' | 'volume' | 'mute' | 'refresh' }) {
  const paths = {
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></>,
    moon: <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z" />,
    volume: <><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18 5.8a9 9 0 0 1 0 12.4" /></>,
    mute: <><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="m19 9-6 6M13 9l6 6" /></>,
    refresh: <><path d="M20 11a8.1 8.1 0 0 0-14.7-3L3 11" /><path d="M3 5v6h6M4 13a8.1 8.1 0 0 0 14.7 3L21 13" /><path d="M21 19v-6h-6" /></>,
  }

  return <svg aria-hidden="true" viewBox="0 0 24 24">{paths[name]}</svg>
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('typely-theme') as Theme) || 'light')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [passage, setPassage] = useState(PASSAGES[0])
  const [typed, setTyped] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const secondsLeft = Math.max(TEST_DURATION - elapsed, 0)
  const correctCharacters = [...typed].filter((character, index) => character === passage[index]).length
  const incorrectCharacters = typed.length - correctCharacters
  const accuracy = typed.length ? Math.round((correctCharacters / typed.length) * 100) : 100
  const wpm = elapsed ? Math.round((correctCharacters / 5) / (elapsed / 60)) : 0
  const correctWords = typed.trim() ? typed.trim().split(/\s+/).filter((word, index) => word === passage.split(/\s+/)[index]).length : 0

  useEffect(() => {
    localStorage.setItem('typely-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!started || finished) return
    const timer = window.setInterval(() => {
      setElapsed((current) => {
        if (current >= TEST_DURATION - 1) {
          setFinished(true)
          setStarted(false)
          return TEST_DURATION
        }
        return current + 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [started, finished])

  useEffect(() => {
    if (finished) playTone(520, 0.18, 'sine')
  }, [finished])

  function playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!soundEnabled) return
    const context = audioContextRef.current ?? new AudioContext()
    audioContextRef.current = context
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = type
    oscillator.frequency.value = frequency
    gain.gain.setValueAtTime(0.025, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + duration)
  }

  function restart() {
    const nextPassage = PASSAGES[Math.floor(Math.random() * PASSAGES.length)]
    setPassage(nextPassage)
    setTyped('')
    setElapsed(0)
    setStarted(false)
    setFinished(false)
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }

  function handleChange(value: string) {
    if (finished) return
    const nextValue = value.slice(0, passage.length)
    if (!started && nextValue) setStarted(true)
    const currentIndex = nextValue.length - 1
    if (nextValue && nextValue[currentIndex] !== passage[currentIndex]) playTone(150, 0.06, 'square')
    else if (nextValue) playTone(330, 0.035)
    setTyped(nextValue)
    if (nextValue.length === passage.length) {
      setFinished(true)
      setStarted(false)
    }
  }

  return (
    <main className="app-shell" data-theme={theme}>
      <nav className="topbar">
        <div className="brand"><span className="brand-mark">T</span><span>Typely</span></div>
        <div className="controls">
          <button className="icon-button" type="button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
          </button>
          <button className={`icon-button ${soundEnabled ? 'is-active' : ''}`} type="button" aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'} onClick={() => setSoundEnabled((enabled) => !enabled)}>
            <Icon name={soundEnabled ? 'volume' : 'mute'} />
          </button>
        </div>
      </nav>

      <section className="tester">
        <div className="eyebrow"><span className="status-dot" /> Focus session <span className="eyebrow-separator">/</span> {TEST_DURATION}s test</div>
        <h1>Find your flow.</h1>
        <p className="subtitle">A quiet place to sharpen your words.</p>

        {finished ? (
          <section className="results" aria-live="polite">
            <div className="results-kicker">Test complete <span aria-hidden="true">✦</span></div>
            <h2>{wpm} <span>WPM</span></h2>
            <div className="result-grid">
              <div><strong>{accuracy}%</strong><span>Accuracy</span></div>
              <div><strong>{correctWords}</strong><span>Correct words</span></div>
              <div><strong>{incorrectCharacters}</strong><span>Errors</span></div>
            </div>
            <button className="primary-button" type="button" onClick={restart}><Icon name="refresh" /> Try again</button>
          </section>
        ) : (
          <>
            <div className="typing-card" onClick={() => inputRef.current?.focus()}>
              <div className="passage" aria-hidden="true">
                {[...passage].map((character, index) => {
                  const typedCharacter = typed[index]
                  const status = typedCharacter === undefined ? index === typed.length ? 'current' : 'pending' : typedCharacter === character ? 'correct' : 'incorrect'
                  return <span className={status} key={`${character}-${index}`}>{character === ' ' ? '\u00a0' : character}</span>
                })}
              </div>
              <textarea ref={inputRef} value={typed} onChange={(event) => handleChange(event.target.value)} aria-label="Type the displayed passage" autoCapitalize="off" autoCorrect="off" spellCheck="false" />
              {!typed && <span className="input-hint">Click here and start typing<span className="shortcut">⌘ ↵</span></span>}
            </div>
            <div className="live-stats">
              <div><span>WPM</span><strong>{wpm}</strong></div>
              <div><span>Accuracy</span><strong>{accuracy}%</strong></div>
              <div><span>Time</span><strong>{secondsLeft}s</strong></div>
              <div><span>Characters</span><strong>{typed.length}</strong></div>
            </div>
          </>
        )}
        <button className="restart-button" type="button" onClick={restart}><Icon name="refresh" /> Restart test</button>
      </section>
      <footer><span>typely</span><span>Made for better focus</span></footer>
    </main>
  )
}

export default App
