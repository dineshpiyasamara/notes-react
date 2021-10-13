import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NoteListPage from './pages/NoteListPage';
import NotePage from './pages/NotePage';

function App() {
	return (
		<Router>
			<div className="container dark">
				<div className="app">
					<Header />
					<Route path="/" exact component={NoteListPage} />
					<Route path="/note/:id" component={NotePage} />
				</div>
			</div>
		</Router>
	);
}

export default App;
