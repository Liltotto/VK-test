
import './App.scss'
import Footer from './components/Footer/Footer'
import FilmsSection from './components/FilmsSection/FilmsSection'
import { Route, Routes } from 'react-router-dom'
import FilmInfo from './components/FilmInfo/FilmInfo'

function App() {
	return (
		<>
			<div className="home">
				<Routes>
					<Route path="/" element={<FilmsSection />} />
					<Route path="/:filmId" element={<FilmInfo />} />
				</Routes>
			</div>
			<Footer />
		</>
	)
}

export default App
