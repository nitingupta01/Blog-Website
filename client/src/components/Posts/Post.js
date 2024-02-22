import React from "react";
import {formatISO9075} from "date-fns";
import { Link } from "react-router-dom";
import { URL } from "../../constants/constant";

function Post({_id,title,summary,cover,createdAt,author}){
    return(
        <div className='post'>
          <Link to={`/post/${_id}`}>
          <div className='image'>
            <img src={cover} alt="Blog"/>
          </div>
          </Link>
          <div className='texts'>
            <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
            </Link>
            <p className='info'>
              <a className='author'>{author.username}</a>
              <time>{formatISO9075(new Date(createdAt))}</time>
            </p>
            <p classname='summary'>
              {summary}
            </p>
          </div>
      </div>
    )
}

export default Post;