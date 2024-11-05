import './App.css';
import Navbar from './components/navbar'
import Typing from './components/typing';
import { ThemeProvider } from './themeContext';
function App() {

  return (
    <ThemeProvider>
    <div className='bg-customBg min-h-screen w-full'>
      <Navbar />
      <Typing />
    </div>
    </ThemeProvider>
  )
}

export default App
