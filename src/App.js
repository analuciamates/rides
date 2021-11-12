import './App.scss'
import Home from './components/Home'
import { Routes } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
