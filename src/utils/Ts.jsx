import React, { useRef, useState } from 'react'
import useToggle from '../hooks/useToggle'
import Button from '../components/ui/Button'
import useWindowWidth from '../hooks/useWindowWidth'
import { nanoid } from '@reduxjs/toolkit'

const Ts = ({length = 6}) => {
  const [post, setPost] = useState("")
  const [postCard, setPostCard] = useState([]);
  const [list, setList] = useState([]);
  
  const addPostCard = (e) => {
    let newPost = e.target.value;
    console.log(newPost.length)
    setPost(newPost);
    if(newPost === ""){
      return;
    }

    if (newPost.length > 10) {
      setPostCard((prevPostCard) => [...prevPostCard, newPost]);
      setPost('');
    }
    console.log(postCard)
  };

  return (
    <div>
      {postCard}
      <h2>Test</h2>
      <textarea 
        onChange={addPostCard}
        placeholder="write here"
        value={post}
      />

      <Button text={"Post"} handleEvent={addPostCard}/>

      <div style={{border: ".1rem solid #333", width: "20rem", height: "10rem"}}>
        <p>{post}</p>
      </div>

      {/* {list.map(li => (li))} */}
      <Button text="Add list" handleEvent={() => {
        setList(oldValue => {
          return [
            ...oldValue, {li: Math.random() * 4}]
        })
      }} />

      <br />
      <br />
      <br />
      <hr />

      <TopLevelComment />
    </div>
  )
}

export default Ts


function createPostcards(text, maxCharacters) {
  const postcards = [];
  const words = text.split(' ');

  let currentPostcard = '';
  for (const word of words) {
      if (currentPostcard.length + word.length + 1 <= maxCharacters) {
          // Add word to current postcard
          currentPostcard += (currentPostcard.length === 0 ? '' : ' ') + word;
      } else {
          // Start a new postcard
          postcards.push(currentPostcard);
          currentPostcard = word;
      }
  }

  // Add the last postcard
  postcards.push(currentPostcard);

  return postcards;
}

const CommentTextarea = ({handleSubmit, commentBody, setCommentBody}) => {
  // const [commentBody, setCommentBody] = useState("")

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        border: ".1rem solid black", width: "20rem", height: "10rem",
        display: "grid",
        padding: ".6rem .8rem",
      }}
    >
      <textarea
        name="comment"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        placeholder="comment"
        style={{
          height: "7rem"
        }}
      />

      <button
        style={{
          width: "fit-content",
          height: "2rem",
          border: ".1rem solid blue",
          borderRadius: ".8rem",
          padding: ".2rem .5rem"
        }} 
      >
        Comment
      </button>
    </form>
  )
}

const TopLevelComment = () => {
  const [commentList, setCommentList] = useState([
    {
      id: nanoid(),
      body: "This is the first comment",
      comments: []
    },
    {
      id: nanoid(),
      body: "This is the second comment",
      comments: []
    },
    {
      id: nanoid(),
      body: "This is the third comment",
      comments: []
    },
  ])
  const [commentBody, setCommentBody] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setCommentList(prevValue => {
      return [
        ...prevValue,
        {
          id: nanoid(),
          body: commentBody,
          comments: []
        }
      ]
    })
    setCommentBody("")
    console.log("submit")
  }

  return (
    <div className="top-level-comment">
      <input type="password" name="password" id="password" placeholder="Enter your password" required maxlength="20" />

            <input 
              type="password" 
              placeholder="password" 
              name="password"
              id='password'
              maxlength="20"
              style={{
                border: ".1rem solid black"
              }}
          />

      <h1>Nested Comment</h1>
      <CommentTextarea handleSubmit={handleSubmit} commentBody={commentBody}  setCommentBody={setCommentBody} />

      <br />
      <div>
        {commentList.map(comment => {
          return <CommentItem key={comment.id} comment={comment} />
        })}
      </div>
    </div>
  )
}

const CommentItem = ({comment}) => {
  const [isReply, setIsReply] = useState(false);
  const [commentBody, setCommentBody] = useState("")
  const [commentList, setCommentList] = useState(comment.comments)

  const handleSubmit = (e) => {
    e.preventDefault()
    setCommentList(prevValue => {
      return [
        ...prevValue,
        {
          id: nanoid(),
          body: commentBody,
          comments: []
        }
      ]
    })
  }

  return (
    <div
      style={{
        padding: "1rem",
        borderLeft: ".1rem solid black",
        backgroundColor: "burlywood",
        marginTop: ".4rem",
      }}
    >
      <p>{comment.body}</p>
      <button onClick={() => setIsReply(prevValue => !prevValue)}>
        {isReply ? "Cancel" : "Reply"}
      </button>
      <br />
      <hr />
      <div
        style={{
          padding: "1rem"
        }}
      >
        {isReply && <CommentTextarea commentBody={commentBody} setCommentBody={setCommentBody} handleSubmit={handleSubmit} />}
        {commentList.map(comment => {
          return <div>
            <CommentItem comment={comment} />
          </div>
        })}
        </div>
    </div>
  )
}

const url ="https://uinames.com/api/"

const fetchNames = async() => {
  const data = await fetch(url, {
    headers: {
      method: "GET",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name":"John",
      "surname":"Doe",
      "gender":"male",
      "region":"United States"
    })
  })
  const res = await data.json()
  console.log(res)
}
// check if the userName is taken
// if userName exists add name to it

// fetchNames()

// Using toNumber()
// const numObj = { value: 42 };
// const num = numObj.toNumber(); // Returns 42

// Using toPrimitive() with different hints
const strObj = { value: 2, new: 6 };

console.log(Object.entries(strObj).map(([key, val]) => key))
// console.log()

const entries = Object.entries(strObj);
entries.forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});


Object.entries(strObj).forEach(([key, val]) => console.log(key))
const result = Number(false); // binary: 0101 << 1 = 1010 (decimal: 10)
// console.log("" == false)
// console.log("them" == "food")
// console.log(NaN == NaN)
// console.log(undefined == 0)
let result1 = 0 / 0;  // NaN
// console.log(String(1))

function foo() {
  if(true){
    var x = 5;
  }
  console.log(x)
}

// foo()

const arr = {num: 1}
arr.shoe = {
  obj: arr
}
// console.log(arr)

const c = 3.49
// console.log(Math.abs(c))

const even = [2,24,5,6,8,93,4, 20]

const isEven = even.filter(num => num % 2 === 0)
// console.log( Math.max(...isEven))

var name = "snopro code"
// console.log(name.replaceAll(" ", ""))
const firstName = name.slice(0, name.indexOf(" "))
const lastName = name.slice(name.indexOf(" "))
// console.log(firstName)
// console.log(lastName)
// console.log(name.charAt("0"))

let num = 0
let b = num + 10

const addNum = () => {
  console.log(num)
  num++
  console.log(num)
}

// addNum()
// console.log(b)
// console.log(num)

// let userName = ""
// do{
//  userName = prompt("Enter your username")
//  console.log(userName)
// }while(userName === "" || userName === null)

