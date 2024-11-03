import './App.css';
import Navbar from './components/navbar'
import Typing from './components/typing';
function App() {

  return (
    <div className='bg-customBg min-h-screen w-full'>
      <Navbar />
      <Typing />
    </div>
  )
}

export default App
