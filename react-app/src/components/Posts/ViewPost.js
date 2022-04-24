import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useLocation, NavLink } from 'react-router-dom';

import EditPostForm from './EditPostForm';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';

import * as data_funcs from '../../store/data_store';

import EditCommentForm from '../Comments/EditCommentForm';


const ViewPost = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const [prevLocation, ] = useState(location?.state?.location)
  
  const history = useHistory();
  const { name, id } = useParams();
  const [loaded, setLoaded] = useState(false);

  const user = useSelector(state => state.session?.user);

  useEffect(() => {
    (async() => {
      await dispatch(data_funcs.get_communities());
      await dispatch(data_funcs.get_user_votes(user));
      setLoaded(true);
    })();
  }, [dispatch, user]);

  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [newComment, setNewComment] = useState('');
  const userId = useSelector(state => state.session.user?.id);
  const community = useSelector(state => state.data_store.all_communities[name.toLowerCase()]);
  const post = community?.posts[id];
  const comments = useSelector(state => state.data_store.all_communities[name.toLowerCase()]?.posts[id]?.comments)
  // const postVotes = useSelector(state => state.data_store.user_votes.post_votes)
  // const commentVotes = useSelector(state => state.data_store.user_votes.comment_votes)

  const votes = useSelector(state => state.data_store.user_votes)

  if (!loaded) {
    return null;
  }



  const handleClose = (e) => {

    setShowModal(false);
    history.push(prevLocation);


  };


  const handleSubmitComment = async (e) => {
    
    e.preventDefault();

    const comment = {
      'postId': post.id,
      'content': newComment.trim()
    };

    const data = await dispatch(data_funcs.create_comment(comment));
    await dispatch(data_funcs.get_communities());
    
    if (data) {
      setErrors(data);
    } else {
      setNewComment('');
      history.push(`/s/${community?.name}/${post?.id}/${post?.title.replaceAll(' ', '_')}`);
    }



  }

  const saidIt = (e) => {

    e.preventDefault();

    const voiceMessage = new SpeechSynthesisUtterance();
    voiceMessage.text = community.posts[id].title;
    window.speechSynthesis.speak(voiceMessage);


    // console.log(name + ' ' + id)

  };

  const saidItComment = (e) => {

    e.preventDefault();

    const commentInd = e.target.id;
    const voiceMessage = new SpeechSynthesisUtterance();
    voiceMessage.text = community.posts[id].comments[commentInd]?.content;
    window.speechSynthesis.speak(voiceMessage);


    // console.log(name + ' ' + id)

  };

  const handlePostVote = async (post, val) => {

    if (!user) {
      return history.push('/login');
    }

    const upArrow = document.getElementById(`post-up:${post}`);
    const downArrow = document.getElementById(`post-down:${post}`);
    const scoreCont = document.getElementById(`post-counter-${post}`)


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

  const handleCommentVote = async (comment, val) => {

    if (!user) {
      return history.push('/login');
    }

    const upArrow = document.getElementById(`com-up:${comment}`);
    const downArrow = document.getElementById(`com-down:${comment}`);
    const scoreCont = document.getElementById(`comment-counter-${comment}`)


    if (val === true) {

      upArrow.getAttribute('fill') === 'none' ? upArrow.setAttribute('fill', '#ff4500') : upArrow.setAttribute('fill', 'none');
      if (downArrow.getAttribute('fill') !== 'none') downArrow.setAttribute('fill', 'none');


    } else if (val === false) {

      downArrow.getAttribute('fill') === 'none' ? downArrow.setAttribute('fill', '#0079D3') : downArrow.setAttribute('fill', 'none');
      if (upArrow.getAttribute('fill') !== 'none') upArrow.setAttribute('fill', 'none');
    }

    const vote = {
      userId: user.id,
      commentId: comment,
      voteType: val
    };

    await dispatch(data_funcs.comment_vote(vote));
    const {score} = await dispatch(data_funcs.current_comment_score(comment));
    scoreCont.innerText = score;
  };



  return (
    <>
    {showModal && (
    <Modal onClose={handleClose}>
    <div className='community-page'>
  
      {/* <span className='com-header'></span>
      <div className='com-header-cont'>
      </div> */}
  
      <div className='main-com-cont'>
  
        <div className='com-menu-bar com-banner' style={{'justifyContent':'space-between'}}>
          <h1 className='bold-text' style={{'fontSize': '18px', 'color': '#fff'}}>s/{community?.name}</h1>
          {/* {sessionLinks && sessionLinks} */}
          <div style={{'display':'flex', 'alignItems':'center', 'paddingRight':'5px'}}>
            <svg onClick={handleClose} style={{'cursor':'pointer'}} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="menu-close">
              <polygon fill="inherit" points="11.649 9.882 18.262 3.267 16.495 1.5 9.881 8.114 3.267 1.5 1.5 3.267 8.114 9.883 1.5 16.497 3.267 18.264 9.881 11.65 16.495 18.264 18.262 16.497"></polygon>
            </svg>
          </div>
        </div>
  
      </div>
  
      <div className='com-content'>
  
        <div className='com-post-cont'>

  
          <div style={{'marginTop':'0'}} className="post-cont modal-post-cont">

  
            <div className='post-wrap'>
              <div className="single-post-btn-bar">

                <div className={`vote-cont-${post?.id}`} style={{'display': 'flex', 'flexDirection':'column', 'justifyContent': 'center', 'alignItems':'center'}}>
                  <svg onClick={() => handlePostVote(post?.id, true)} className="vote-buttons" id="upVoteButton" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path id={`post-up:${post?.id}`} d="M12 4 3 15h6v5h6v-5h6z" className="icon_svg-stroke icon_svg-fill" strokeWidth="1.5" stroke="#666" fill={votes.post_votes !== undefined && post?.id in votes?.post_votes && votes?.post_votes[post.id]?.vote_type === true ? '#ff4500' : 'none'} strokeLinejoin="round"></path>
                  </svg>
                  <div style={{'cursor':'auto'}} id={`post-counter-${post?.id}`}>{post?.vote_score}</div>
                  <svg onClick={() => handlePostVote(post?.id, false)} className="vote-buttons" id="downVoteButton" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path id={`post-down:${post?.id}`} d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" stroke="#666" fill={votes.post_votes !== undefined && post?.id in votes?.post_votes && votes?.post_votes[post.id]?.vote_type === false ? '#0079D3' : 'none'} strokeWidth="1.5" strokeLinejoin="round"></path>
                  </svg>
                </div>

                <div></div>

                <div className="sound-cont">
                  <button onClick={saidIt} style={{'background':'none', 'border':'none', 'color': 'grey'}}><i className="fa-solid fa-volume-high"></i></button>
                </div>
              </div>

              <div key={post?.id} className="single-post-view text-post-view" style={{'cursor':'auto'}}>
              <div><NavLink to={`/s/${community?.name}`}><span className="bold-text">{`s/${community?.name}`}</span></NavLink> • <span className="light-text" style={{'cursor':'auto'}}>Posted by u/{post?.user_name}</span></div>
                <p className="medium-text" style={{'fontWeight': 'bold', 'fontSize': '16px'}}>{post?.title}</p>
                <p className="medium-text text-post-view">{post?.content}</p>
                {userId === post?.user_id && (
                <div id='com-btns'>
                  <EditPostForm post={post} />
                </div>
                )}
              </div>
              
            </div>

            <div className='main-spacer' style={{'paddingTop':'40px'}}></div>

            {user && user && (
            <div className='comment-cont'>
                <div className='new-comment-head medium-text'>Comment as {user.username}</div>
                <div className='new-comment-cont'>
                  <div>
                  {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                  </div>
                  <form onSubmit={handleSubmitComment} className='new-comment-content' style={{'outline':'none'}}>
                    <textarea
                      name='comment'
                      placeholder='What are your thoughts?'
                      onChange={(e) => setNewComment(e.target.value)}
                      value={newComment}
                    ></textarea>

                  <div className='new-comment-footer'>
                    <button type='submit' className='main-links btn-style'>Comment</button>
                  </div>
                  </form>
                  
                </div>
            </div>
            )}

            {!userId && (
            <>
              <div style={{'marginLeft':'30px', 'border': '1px solid #ccc'}} className="create-post-cont">

                <div className='post-placeholder'>
                  <div style={{'fontWeight':'bold'}} className='light-text'>Log in or sign up to leave a comment</div>
                  <div className='post-placeholder-btn'>
                    <LoginForm />
                    <SignUpForm />
                  </div>
                </div>
              </div>
           </>
            )}

            <div className='comment-cont'>

                  {loaded && comments?.map((comment, ind) => {
                    return(
                  <div key={comment?.id} className='user-comments'>
                    <div>
                      <p className='light-text'>Posted by u/{comment?.user_name}</p>
                    </div>
                    <div>
                      <p className="medium-text" style={{'fontWeight': 'bold', 'marginLeft':'10px'}}>{comment?.content}</p>
                    </div>
                    <div className='user-comment-footer'>
                      <div className={`vote-cont-${comment?.id}`} style={{'display':'flex', 'flexDirection':'row', 'alignItems':'center'}}>
                        <svg onClick={() => handleCommentVote(comment?.id, true)} className="vote-buttons" id="upVoteButton" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path id={`com-up:${comment?.id}`} d="M12 4 3 15h6v5h6v-5h6z" className="icon_svg-stroke icon_svg-fill" strokeWidth="1.5" stroke="#666" fill={votes?.comment_votes !== undefined && comment?.id in votes?.comment_votes && votes?.comment_votes[comment.id]?.vote_type === true ? '#ff4500' : 'none'} strokeLinejoin="round"></path>
                        </svg>
                        <div style={{'cursor':'auto'}} id={`comment-counter-${comment?.id}`}>{comment?.vote_score}</div>
                        <svg onClick={() => handleCommentVote(comment?.id, false)} className="vote-buttons" id="downVoteButton" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path id={`com-down:${comment?.id}`} d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" stroke="#666" fill={votes?.comment_votes !== undefined && comment?.id in votes?.comment_votes && votes?.comment_votes[comment.id]?.vote_type === false ? '#0079D3' : 'none'} strokeWidth="1.5" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                      <button onClick={saidItComment} style={{'background':'none', 'border':'none', 'color': 'grey'}}><i id={ind} className="fa-solid fa-volume-high"></i></button>
                      {userId === comment?.user_id && (
                        <EditCommentForm comment={comment} />
                      )}
                    </div>
                  </div>
                    )
                  })}


            </div>

  
          </div>
        </div>
  
        <div className='side-page-cont side-post-modal'>
  
          <div className='side-page-post-view'>
  
            <div className='side-header' style={{'position': 'fixed', 'width':'312px'}}>
              <div className='bold-text com-banner'>
                About Community
              </div>
              <p className='bold-text community-info'>{community?.community_info}</p>
            </div>
          </div>

          <div className='side-page-post-view'>
            <div className='side-header' style={{'position': 'fixed', 'width':'312px'}}>
              <div className='bold-text com-banner'>
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
  </Modal>
  )}
  </>
  )
  
};



export default ViewPost;