import {BrowserRouter ,Routes ,Route} from 'react-router-dom'
import Login from './components/pages/auth/login';
import SignUp from './components/pages/auth/signup';
import Error from './components/pages/404';
import Home from './components/pages/Home';
import BooksDetails from './components/pages/Bookdetails';
import MyBooks from './components/pages/myBooks';
import MyBooksDetails from './components/pages/mybooksdet';
import Open from './components/pages/Open';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/books/:id' element={<BooksDetails />} />
          <Route path='/mybooks' element={<MyBooks />} />
          <Route path='/return/:id' element={<MyBooksDetails />} />
          <Route path='/open' element={<Open />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
