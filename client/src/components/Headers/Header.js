import React, { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Usercontext";

function Header(){
    const {setUserInfo,userInfo}=useContext(UserContext);
    useEffect(()=>{
      fetch('https://blog-website-j3d6.onrender.com/profile',{
        credentials: 'include',
      }).then(response=>{
        response.json().then(userInfo =>{
          setUserInfo(userInfo);
        });
      });
    },[]);

    function logout(){
      fetch('https://blog-website-j3d6.onrender.com/logout',{
        method:'POST',
        credentials:'include',
      })
      setUserInfo(null);
    }

    const username = userInfo?.username;
    return(
        <header>
        <Link to="/" className='logo'>MyBlog</Link>
        <nav>
          {username && (
          <>
            <Link to='/create'>Create Post</Link>
            <Link onClick={logout}>Logout</Link>
          </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    )
}

export default Header;