import React, { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Usercontext";
import { URL } from "../../constants/constant";

function Header(){
    const {setUserInfo,userInfo}=useContext(UserContext);
    useEffect(()=>{
      fetch(`${URL}/profile`,{
        credentials: 'include',
      }).then(response=>{
        response.json().then(userInfo =>{
          setUserInfo(userInfo);
        })
      })
    },[]);

    function logout(){
      fetch(`${URL}/logout`,{
        method:'POST',
        credentials:'include',
      }).then(()=>{setUserInfo({})}).catch(err=>console.log(err));
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