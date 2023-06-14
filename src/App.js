import Todo from './components/Todo'
import SignupComponent from './components/SignupComponent';
import SigninComponent from './components/SigninComponent';
import { HashRouter, Route, Routes } from 'react-router-dom'

function App() {

    return (
        <HashRouter>

            <Routes>
                <Route path='/' Component={Todo} />
                <Route path='/signup' Component={SignupComponent} />
                <Route path='/signin' Component={SigninComponent} />
            </Routes>
        </HashRouter>
    );
}

export default App;
