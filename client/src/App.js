import {Route ,  Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage.js';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import { UserContextProvider } from './Usercontext';
import CreatePostPage from './pages/createpostpage';
import PostPage from './pages/postpage';
import EditPostPage from './pages/editpostpage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
      <Route exact path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/create' element={<CreatePostPage/>}/>
      <Route path='/post/:id' element={<PostPage/>}/>
      <Route path='/edit/:id' element={<EditPostPage/>}/>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
