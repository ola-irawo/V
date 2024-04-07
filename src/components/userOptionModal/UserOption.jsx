import React, { useEffect, useState } from 'react'
import "./user-option.css"
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../libs/getCurrentUser';
import { deletePost } from '../../services/post/actions/crud/deletePost';
import { muteUser } from '../../services/user/actions/muteUser';
import { blockUser } from '../../services/user/actions/blockUser';
import { reportUser } from '../../services/user/actions/reportUser';
import useWindowWidth from '../../hooks/useWindowWidth';
import Button from '../ui/Button';
import { postToBookmark } from '../../services/post/actions/interactions/bookmarkPost';
import { useLocation } from 'react-router-dom';
import { reportPost } from '../../services/post/actions/interactions/reportPost';

const UserOption = ({ user, postId}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch()
  const currentUser = getCurrentUser()
  const {screenWidth} = useWindowWidth()
  const location = useLocation()
  const {_id, username} = user

  const userUid = currentUser.userUid === _id
  const isbookmark = location.pathname === "/bookmark"

  const options = [
    {label: `Copy Link`, action:  () =>  console.log("link")},
    {label: `${isbookmark ? "Remove bookmark" : "Bookmark"}`, action:  () =>  console.log("link")},
    {label: `Mute @${username}`, action:  () =>  console.log("mute")},
    {label: `Block @${username}`, action: () =>  console.log("block")},
    {label: `Report @${username}`, action:() => console.log("report user")},
    {label: `Report post`, action:() => console.log("report post")},
    userUid && {label: `Delete post`, action:() => console.log("report")},
  ]

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    let options;

    switch (option.label) {
      case 'Copy Link':
        const postUrl = `post/${username}/${postId}`
        navigator.clipboard.writeText(postUrl)
        // Create a hidden input element
        const input = document.createElement('input');
        input.style.position = 'fixed';
        input.style.opacity = 0;
        input.value = postUrl;
        document.body.appendChild(input);

        // Select and copy the text from the input
        input.select();
        document.execCommand('copy');

    // Remove the input from the DOM
    document.body.removeChild(input);
        break;
      case `${isbookmark ? "Remove bookmark" : "Bookmark"}`:
        options = {
          options: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}
              `,
            },
            body: JSON.stringify({userId: _id, postId: postId})
          },
          userUid: _id,
          postId
        }
        dispatch(postToBookmark(options))
        break;
      case `Mute @${username}`:
        options = {
         options: {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}
              `,
            },
          },
          userUid: _id,
        };
        dispatch(muteUser(options))
        break;
      case `Block @${username}`:
        console.log("Block")
        options = {
          options: {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}
              `,
            }
          },
          userUid: _id
        };
        dispatch(blockUser(options))
        break;
      case `Report @${username}`:
        options = {
          options: {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}
              `,
            },
          },
          userUid: _id,
          postId
        }

        dispatch(reportUser(options))
        break;
      case 'Delete post':
        options = {
          options: {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}`,
            },
          },
          postId
        }
        dispatch(deletePost(options))
        break;
      case "Report post":
        options = {
          options: {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}`,
            },
          },
          postId
        }
        dispatch(reportPost(options))
        break;
      default:
        break;
    }
  };

  const excludedLabels = [`Mute @${username}`, `Block @${username}`, `Report post`, `Report @${username}`];

  const filteredOptions = !userUid
    ? 
      options
    : 
      options.filter((option) => !excludedLabels.includes(option.label))
  ;

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSelectedOption(null);
    }
  };

  const handleOptionKeyDown = (e, option) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleOptionClick(option);
    }
  };

  return (
    <aside className={`user-option-container  ${screenWidth >= 768 && "screen"}`}>
      <div className="option-container">
        <ul className="option-list">
          {filteredOptions.map((option, index) => (
            <li 
              key={index} 
              onClick={() => handleOptionClick(option)} 
              onKeyDown={(e) => {
                handleOptionKeyDown(e, option)
                handleKeyDown(e)
              }}
              tabIndex="0"
            >
              <Button 
                text={
                  option?.label && option?.label.split(username).map((part, index) => (
                    <span key={index}>
                        {part}
                        {index < option.label.split(username).length - 1 && <span style={{color: ''}}>{username}</span>}
                    </span>
                ))
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default UserOption
