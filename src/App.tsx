import { useEffect, useRef, useState } from 'react'
import './App.css'

const TEST_DURATION = 30
const WORDS = [
  'the', 'a', 'an', 'and', 'or', 'but', 'so', 'because', 'since', 'although', 'though', 'while', 'if', 'else', 'then', 'than', 'that', 'this', 'these',
  'those', 'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'into', 'onto', 'from', 'over', 'under', 'above', 'below', 'between', 'among', 
  'before', 'after', 'during', 'until', 'within', 'without', 'through', 'across', 'around', 'near', 'is', 'was', 'were', 'be', 'been', 'being', 'am',
  'are', 'do', 'does', 'did', 'done', 'doing', 'have', 'has', 'had', 'having', 'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might',
  'must', 'ought', 'not', 'no', 'yes', 'yet', 'very', 'just', 'only', 'also', 'too', 'either', 'neither', 'both', 'each', 'every', 'any', 'some', 
  'few', 'many', 'much', 'more', 'most', 'less', 'least', 'one', 'two', 'three', 'first', 'second', 'third', 'next', 'last', 'new', 'old', 'same',
  'other', 'another', 'such', 'own', 'whose', 'who', 'whom', 'which', 'what', 'where', 'when', 'why', 'how' , 'quick', 'slow', 'fast', 'bright',
  'dark', 'light', 'heavy', 'soft', 'hard', 'strong', 'weak', 'big', 'small', 'tiny', 'huge', 'short', 'long', 'tall', 'wide', 'narrow', 'deep',
  'shallow', 'early', 'late', 'young', 'old', 'new', 'ancient', 'modern', 'future', 'past', 'present', 'happy', 'sad', 'angry', 'calm', 'peaceful', 
  'violent', 'kind', 'cruel', 'brave', 'fearful', 'smart', 'dumb', 'wise', 'foolish', 'rich', 'poor', 'clean', 'dirty', 'hot', 'cold', 'warm',
  'cool', 'dry', 'wet', 'rainy', 'snowy', 'sunny', 'cloudy', 'stormy', 'windy', 'foggy', 'icy', 'fire', 'water', 'earth', 'air', 'sky', 'sea', 
  'river', 'lake', 'pond', 'mountain', 'hill', 'valley', 'forest', 'jungle', 'desert', 'island', 'beach', 'coast', 'shore', 'field', 'farm',
  'garden', 'park', 'road', 'street', 'lane', 'alley', 'bridge', 'tunnel', 'house', 'home', 'room', 'hall', 'kitchen', 'bathroom', 'bedroom',
  'office', 'school', 'college', 'university', 'library', 'hospital', 'shop', 'store', 'market', 'mall', 'bank', 'hotel', 'restaurant', 'cafe',
  'bar', 'club', 'stadium', 'theater', 'cinema', 'museum', 'temple', 'church', 'mosque', 'palace', 'castle', 'tower', 'wall', 'gate', 'door',
  'window', 'roof', 'floor', 'ceiling', 'chair', 'table', 'sofa', 'bed', 'fan', 'lamp', 'light', 'bulb', 'switch', 'wire', 'cable', 'plug',
  'socket', 'battery', 'phone', 'mobile', 'tablet', 'laptop', 'computer', 'keyboard', 'mouse', 'screen', 'monitor', 'printer', 'scanner', 
  'camera', 'speaker', 'microphone', 'radio', 'television', 'clock', 'watch', 'calendar', 'pen', 'pencil', 'book', 'paper', 'notebook', 
  'diary', 'letter', 'envelope', 'stamp', 'card', 'ticket', 'coin', 'money', 'cash', 'wallet', 'purse', 'bag', 'box', 'bottle', 'glass',
  'cup', 'plate', 'spoon', 'fork', 'knife', 'food', 'drink', 'water', 'juice', 'milk', 'tea', 'coffee', 'bread', 'rice', 'wheat', 'fruit',
  'apple', 'banana', 'orange', 'grape', 'mango', 'pineapple', 'pear', 'peach', 'plum', 'berry', 'strawberry', 'blueberry', 'raspberry',
  'vegetable', 'potato', 'tomato', 'onion', 'carrot', 'cabbage', 'spinach', 'beans', 'peas', 'corn', 'meat', 'fish', 'egg', 'chicken',
  'beef', 'mutton', 'pork', 'goat', 'duck', 'turkey', 'salt', 'sugar', 'pepper', 'spice', 'oil', 'butter', 'cheese', 'cream', 'cake',
  'sweet', 'chocolate', 'icecream', 'cookie', 'biscuit', 'snack', 'meal', 'breakfast', 'lunch', 'dinner', 'supper', 'feast', 'party', 
  'festival', 'event', 'function', 'meeting', 'conference', 'seminar', 'workshop', 'lecture', 'speech', 'talk', 'discussion', 'debate',
  'argument', 'agreement', 'disagreement', 'decision', 'choice', 'option', 'plan', 'project', 'task', 'job', 'work', 'career', 'business', 
  'company', 'firm', 'office', 'team', 'group', 'club', 'society', 'community', 'village', 'town', 'city', 'country', 'nation', 'world', 'earth', 
  'globe', 'universe', 'galaxy', 'star', 'planet', 'moon', 'sun', 'space', 'rocket', 'satellite', 'astronaut', 'mission', 'science', 'math', 
  'physics', 'chemistry', 'biology', 'history', 'geography', 'economics', 'politics', 'law', 'art', 'music', 'dance', 'song', 'movie', 'film', 
  'drama', 'comedy', 'tragedy', 'poem', 'story', 'novel', 'character', 'hero', 'villain', 'friend', 'enemy', 'family', 'father', 'mother', 'brother', 
  'sister', 'uncle', 'aunt', 'cousin', 'child', 'baby', 'man', 'woman', 'boy', 'girl', 'student', 'teacher', 'doctor', 'nurse', 'engineer', 
  'scientist', 'artist', 'actor', 'singer', 'dancer', 'player', 'driver', 'pilot', 'soldier', 'police', 'judge', 'lawyer', 'farmer', 'worker', 
  'manager', 'leader', 'king', 'queen', 'prince', 'princess', 'god', 'goddess', 'angel', 'devil', 'spirit', 'ghost', 'monster', 'animal', 'dog', 
  'cat', 'cow', 'horse', 'sheep', 'goat', 'pig', 'lion', 'tiger', 'bear', 'wolf', 'fox', 'deer', 'elephant', 'camel', 'zebra', 'giraffe', 'monkey', 
  'ape', 'bird', 'eagle', 'sparrow', 'parrot', 'crow', 'peacock', 'hen', 'duck', 'fish', 'whale', 'shark', 'dolphin', 'snake', 'frog', 'lizard', 
  'insect', 'bee', 'ant', 'fly', 'mosquito', 'butterfly', 'spider', 'worm', 'bug', 'virus', 'bacteria', 'plant', 'tree', 'flower', 'leaf', 'root', 
  'stem', 'branch', 'fruit', 'seed', 'grass', 'crop', 'weed', 'rose', 'lotus', 'lily', 'sunflower', 'jasmine', 'orchid', 'tulip', 'daffodil', 
  'marigold', 'moneyplant', 'bamboo', 'mango', 'banana', 'appletree', 'coconut', 'palm', 'pine', 'maple', 'birch', 'willow', 
  'poplar', 'date', 'fig', 'olive', 'almond', 'cashew', 'peanut', 'walnut', 'hazelnut', 'pistachio', 'cherry', 'grapevine', 'melon', 'watermelon', 
  'pumpkin', 'cucumber', 'radish', 'turnip', 'beetroot', 'ginger', 'garlic', 'chili', 'pepper', 'mint', 'coriander', 'curry', 
  'basil', 'sage', 'rosemary', 'nutmeg', 'vanilla', 'coffee', 'tea', 'soda', 
  'juice', 
]

function generatePassage(wordCount = 45) {
  const words: string[] = []

  for (let i = 0; i < wordCount; i++) {
    words.push(WORDS[Math.floor(Math.random() * WORDS.length)])
  }

  return words.join(' ')
}

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
 const [passage, setPassage] = useState(() => generatePassage())
  const [typed, setTyped] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
const passageRef = useRef<HTMLDivElement>(null)
const typingCardRef = useRef<HTMLDivElement>(null)
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


  useEffect(() => {
    const passageElement = passageRef.current
    const typingCard = typingCardRef.current

    if (!passageElement || !typingCard) return

    passageElement.style.transform = 'translateY(0)'

    const currentCharacter = passageElement.querySelector('.current') as HTMLElement | null

    if (!currentCharacter) return

    const cardRect = typingCard.getBoundingClientRect()
    const currentRect = currentCharacter.getBoundingClientRect()
    const bottomPadding = 42

    if (currentRect.bottom > cardRect.bottom - bottomPadding) {
      const shift = currentRect.bottom - (cardRect.bottom - bottomPadding)
      passageElement.style.transform = `translateY(-${shift}px)`
    }
  }, [typed])



  function playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
  if (!soundEnabled) return

  const context = audioContextRef.current ?? new AudioContext()
  audioContextRef.current = context

  const oscillator = context.createOscillator()
  const gain = context.createGain()

  oscillator.type = type
  oscillator.frequency.value = frequency

  gain.gain.setValueAtTime(0.04, context.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration)

  oscillator.connect(gain).connect(context.destination)

  oscillator.start()
  oscillator.stop(context.currentTime + duration)
}

function playKeySound(correct: boolean) {
  if (correct) {
    playTone(520, 0.025, 'square')
  } else {
    playTone(120, 0.10, 'sawtooth')
  }
}

function restart() {
  const nextPassage = generatePassage()
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

  if (nextValue) {
    const isCorrect = nextValue[currentIndex] === passage[currentIndex]
    playKeySound(isCorrect)
  }

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
            <div
  ref={typingCardRef}
  className="typing-card"
  onClick={() => inputRef.current?.focus()}
>
              <div ref={passageRef} className="passage" aria-hidden="true">
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
