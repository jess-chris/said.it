import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, NavLink, useLocation } from 'react-router-dom';
import * as data_funcs from '../../store/data_store';
import EditCommunityForm from './EditCommunityForm';

import './Community.css';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';

const ViewCommunity = () => {

const dispatch = useDispatch();
const [loaded, setLoaded] = useState(false);
const [content, setContent] = useState('');
const [postTitle, setPostTitle] = useState('');
const [showEdit, setShowEdit] = useState(false);
const [showComMenu, setShowComMenu] = useState(false);
const [errors, setErrors] = useState([]);
const history = useHistory();
const location = useLocation().pathname;
const { name } = useParams();

const user = useSelector(state => state.session?.user);

useEffect(() => {
  (async() => {
    await dispatch(data_funcs.get_communities());
    await dispatch(data_funcs.get_user_votes(user));
    setLoaded(true);
  })();
}, [dispatch, user]);


const userId = useSelector(state => state.session.user?.id);
const community = useSelector(state => state.data_store.all_communities[name.toLowerCase()]);
const votes = useSelector(state => state.data_store.user_votes.post_votes)
const posts = Object.values(community?.posts).reverse();

const openMenu = () => {
  if (showComMenu) return;
  setShowComMenu(true);
};

const openEdit = () => {
  if (showEdit) return;
  setShowEdit(true);
}

useEffect(() => {
  if (!showEdit) return;

  const closeEdit = () => {
    setShowEdit(false);
  };

  const home = document.querySelector('.community-page');
  home.addEventListener('click', closeEdit);

  return () => home.removeEventListener("click", closeEdit);
}, [showEdit]);

useEffect(() => {
  if (!showComMenu) return;

  const closeMenu = () => {
    setShowComMenu(false);
  };

  document.addEventListener('click', closeMenu);

  return () => document.removeEventListener("click", closeMenu);
}, [showComMenu]);


if (!loaded) {
  return null;
}

const handleDelete = (e) => {

  e.preventDefault();

  const data = {
    community_id: community.id
  };

  dispatch(data_funcs.delete_community(data));
  history.push('/');
};

const handlePost = async (e) => {

  e.preventDefault();
  const post = {
    'name': community.name,
    'community': community.id,
    'userId': userId,
    'title': postTitle.trim(),
    'content': content.trim()
  };
  const data = await dispatch(data_funcs.create_post(post));
  if (data) {
    setErrors(data);
  } else {
    setContent('');
    setPostTitle('');
    setErrors([]);
    await dispatch(data_funcs.get_communities());
  }

};



const saidIt = (e) => {

  e.preventDefault();

  const id = e.target.id;
  const voiceMessage = new SpeechSynthesisUtterance();
  voiceMessage.text = community.posts[id].title;
  window.speechSynthesis.speak(voiceMessage);


};


const handleVote = async (post, val) => {

  if (!user) {
    return history.push('/login');
  }

  const upArrow = document.getElementById(`up:${post}`);
  const downArrow = document.getElementById(`down:${post}`);
  const scoreCont = document.getElementById(`counter-${post}`)


  if (val === true) {

    upArrow.getAttribute('fill') === 'none' ? upArrow.setAttribute('fill', '#ff4500') : upArrow.setAttribute('fill', 'none');
    if (downArrow.getAttribute('fill') !== 'none') downArrow.setAttribute('fill', 'none');


  } else if (val === false) {

    downArrow.getAttribute('fill') === 'none' ? downArrow.setAttribute('fill', '#0079D3') : downArrow.setAttribute('fill', 'none');
    if (upArrow.getAttribute('fill') !== 'none') upArrow.setAttribute('fill', 'none');
  }

  const vote = {
    userId: user.id,
    postId: post,
    voteType: val
  };

  await dispatch(data_funcs.post_vote(vote));
  const {score} = await dispatch(data_funcs.current_post_score(post));
  scoreCont.innerText = score;
};

const defaultLogo = (e) => {
  e.preventDefault();

  document.getElementById('community-logo').setAttribute('src', 'public/assets/default.png');

};




return (
  
  <div className='community-page'>

  {showEdit && (
  <EditCommunityForm value={true}/>
  )}
    <span className='com-header'></span>
    <div className='com-header-cont'>
    </div>

    <div className='main-com-cont'>

      <div className='com-menu-bar'>
        <div style={{'display':'flex', 'flexDirection':'row', 'alignItems':'center', 'justifyContent':'center', 'gap':'10px'}}>
            {!community?.community_image && (
            <img style={{'height':'40px', 'width':'40px', 'borderRadius': '50%'}} alt='default-logo' id='community-logo' src='public/assets/default.png'></img>
              // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="_1O4jTk-dZ-VIxsCuYB6OR8 " width="40" height="48"><g><circle fill="#0079D3" cx="10" cy="10" r="10"></circle><path fill="#FFFFFF" d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"></path></g></svg>
            )}
            {community?.community_image && (
              <img alt='community-logo' style={{'height':'40px', 'width':'40px', 'borderRadius': '50%'}} id='community-logo' onError={defaultLogo} src={community.community_image}></img>
            )}
          <h1 className='bold-text' style={{'fontSize': '18px'}}>
            s/{community?.name}
          </h1>
        </div>
        {userId && userId === community?.owner && (
        <div className="user-profile">
          <button className="user-profile-btn" onClick={openMenu}>
          <i class="fa-solid fa-gear">  </i>
            <div className="drop-down-menu">
            {community.name} Settings
              {showComMenu && (
                <div className="profile-dropdown-cont">
                  <div className="profile-dropdown">
                    <div className='btn-style profile-btn-item' onClick={openEdit}>Edit</div>
                    <div className="profile-btn-item">
                      <div className='btn-style profile-btn-item' onClick={handleDelete}>Delete</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </div>
        )}
      </div>

    </div>

    <div className='com-content'>

      <div className='com-post-cont'>

          {userId && userId && (
          <>
          <div className="create-post-cont">
            <div className='create-post-top'>
              <h3 className='bold-text'>Create Post</h3>
            </div>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='create-post-body'>
              <div className='create-post-title'>
                <div>
                  <textarea 
                    name='title'
                    placeholder='Title'
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className='create-post-content'>
                <div>
                  <textarea 
                    id='textPost'
                    name='content'
                    placeholder='Text (optional)'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>

              <div className='create-post-bar'>

                <div id='post-btn'>
                  <button onClick={handlePost} className='main-links btn-style' type='submit'>Post</button>
                </div>

              </div>

            </div>
          </div>
          </>
          )}

          {!userId && (
          <>
            <div className="create-post-cont">

              <div className='post-placeholder'>
                <div style={{'fontWeight':'bold'}} className='light-text'>Log in or sign up to leave a post</div>
                <div className='post-placeholder-btn'>
                  <LoginForm />
                  <SignUpForm />
                </div>
              </div>
            </div>

          </>
          )}

        <div className="post-cont">


          {loaded && posts?.map((post) => {
            return (
              <>
                <div key={post?.id} className="single-post">
                  <div className="single-post-btn-bar">
                    <div className={`vote-cont-${post?.id}`}>
                      <svg onClick={() => handleVote(post?.id, true)} className="vote-buttons" id="upVoteButton" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path id={`up:${post?.id}`} d="M12 4 3 15h6v5h6v-5h6z" className="icon_svg-stroke icon_svg-fill" strokeWidth="1.5" stroke="#666" fill={votes !== undefined && post?.id in votes && votes[post.id]?.vote_type === true ? '#ff4500' : 'none'} strokeLinejoin="round"></path>
                      </svg>
                      <div id={`counter-${post?.id}`}>{post?.vote_score}</div>
                      <svg onClick={() => handleVote(post?.id, false)} className="vote-buttons" id="downVoteButton" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path id={`down:${post?.id}`} d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" stroke="#666" fill={votes !== undefined && post?.id in votes && votes[post.id]?.vote_type === false ? '#0079D3' : 'none'} strokeWidth="1.5" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <div></div>
                    <div className="sound-cont">
                      <button onClick={saidIt} style={{'background':'none', 'border':'none', 'color': 'grey'}}><i id={`${post?.id}`} className="fa-solid fa-volume-high"></i></button>
                    </div>
                  </div>
                  <div className="single-post-content">
                    <NavLink to={{pathname: `/s/${community?.name}/${post?.id}/${post?.title.replaceAll(' ', '_')}`, state:{location}}}>
                    <p className='light-text'>Posted by u/{post?.user_name}</p>
                    <p className="medium-text" style={{'fontWeight': 'bold'}}>{post?.title}</p>
                    <div className="text-post-content">
                      <p className="light-text">{post?.content}</p>
                    </div>
                    </NavLink>
                  </div>
                </div>
              </>
            )
          })}

        </div>
      </div>

      <div className='side-page-cont'>

          <div className='side-page'>

            <div className='side-header'>
              <div className='bold-text com-banner'>
                About Community
              </div>
              <p className='bold-text community-info'>{community?.community_info}</p>
            </div>

            <div className="main-spacer"></div>

            <div className='side-header' style={{'position':'sticky', 'top':'50px'}}>
              <div className='bold-text com-banner' style={{'justifyContent':'center'}}>
                Technologies Used & Links
              </div>
              <ul className='light-text'>
                <li>React</li>
                <li>Redux</li>
                <li>Python</li>
                <li>Flask SQLAlchemy</li>
                <li>PostgreSQL</li>
              </ul>
              <div style={{'textAlign':'center'}} className="light-text">Developed by Jesse Christensen</div>
              <div style={{'display':'flex', 'flexDirection':'row', 'textAlign':'center'}}>
                <a href='https://www.linkedin.com/in/jesse-christensen-204801232/'><div className="bold-text"><i className="fa-brands fa-linkedin"></i>  LinkedIn</div></a>
                <a href='https://github.com/jess-chris'><div className="bold-text"><i className="fa-brands fa-github-square"></i>   GitHub</div></a>
              </div>
            </div>

          </div>

      </div>
    </div>
  </div>
)

};

export default ViewCommunity;