import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  let [posts, setPosts] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [postPerPost, setPostPerPost] = useState(10);

  useEffect(() => {
    let fetchData = async () => {
      let res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
    };
    fetchData();
  }, []);

  let numOfTotalPages = Math.ceil(posts.length / postPerPost);
  let pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

  let lastIndexPost = currentPage * postPerPost;
  let firstIndexPost = lastIndexPost - postPerPost;

  let setPost = posts.slice(firstIndexPost, lastIndexPost);

  let handlePrevClick=()=>{
    if(currentPage !==1) setCurrentPage(currentPage-1)
  }

  let handleNextClick=()=>{
    if(currentPage !==1) setCurrentPage(currentPage+1)
    else setCurrentPage(currentPage+1)
    
  }

  return (
    <div>
      {setPost.map((post, id) => (
        <p key={id}>{post.id}.{post.title}</p>
      ))}

      <span onClick={handlePrevClick}>prev | </span>

      <span>
        {pages.map((page, i) => (
          <span key={i} onClick={() => setCurrentPage(page)}>{`${page} | `}</span>
        ))}
      </span>

      <span onClick={handleNextClick}>next</span>
      
    </div>
  );
};

export default App;
