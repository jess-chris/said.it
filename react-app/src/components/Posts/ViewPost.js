import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams, useLocation } from 'react-router-dom';

import EditPostForm from './EditPostForm';


import * as data_funcs from '../../store/data_store';

import EditCommentForm from '../Comments/EditCommentForm';


const ViewPost = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const [prevLocation, ] = useState(location?.state?.location)
  
  const history = useHistory();
  const { name, id, title } = useParams();
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    (async() => {
      await dispatch(data_funcs.get_communities());
      setLoaded(true);
    })();
  }, [dispatch]);

  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [newComment, setNewComment] = useState('');
  const user = useSelector(state => state.session.user);
  const userId = useSelector(state => state.session.user?.id);
  const community = useSelector(state => state.data_store.all_communities[name.toLowerCase()]);
  const post = community?.posts[id];
  const comments = useSelector(state => state.data_store.all_communities[name.toLowerCase()]?.posts[id]?.comments)


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
      'content': newComment
    };

    const data = await dispatch(data_funcs.create_comment(comment));
    await dispatch(data_funcs.get_communities());
    setNewComment('');

    if (data) {
      setErrors(data);
    } else {
      history.push(`/s/${community?.name}/${post?.id}/${post?.title.replaceAll(' ', '_')}`);
    }



  }


  return (
    <>
    {showModal && (
    <Modal onClose={handleClose}>
    <div className='community-page'>
  
      {/* <span className='com-header'></span>
      <div className='com-header-cont'>
      </div> */}
  
      <div className='main-com-cont'>
  
        <div className='com-menu-bar com-banner'>
          <h1 className='bold-text' style={{'fontSize': '18px', 'color': '#fff'}}>s/{community?.name}</h1>
          {/* {sessionLinks && sessionLinks} */}
        </div>
  
      </div>
  
      <div className='com-content'>
  
        <div className='com-post-cont'>
  
            {/* {userId && userId && (
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
            )} */}
  
          <div className="post-cont modal-post-cont">
  
  

            <div key={post?.id} className="single-post-view text-post-view">
              <p className='light-text'>Posted by u/{post?.user_name}</p>
              <p className="medium-text" style={{'fontWeight': 'bold', 'fontSize': '16px'}}>{post?.title}</p>
              <p className="medium-text text-post-view">{post?.content}</p>
              {userId === post?.user_id && (
              <div id='com-btns'>
                <EditPostForm post={post} />
              </div>
              )}
            </div>

            <div className='main-spacer'></div>

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

            <div className='comment-cont'>

                  {loaded && comments?.map((comment) => {
                    return(
                  <div key={comment?.id} className='user-comments'>
                    <div>
                      <p className='light-text'>Posted by u/{comment?.user_name}</p>
                    </div>
                    <div>
                      <p className="medium-text" style={{'fontWeight': 'bold', 'marginLeft':'10px'}}>{comment?.content}</p>
                    </div>
                    <div className='user-comment-footer'>
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
  
          <div className='side-page'>
  
            <div className='side-header' style={{'position': 'fixed', 'width':'312px'}}>
              <div className='bold-text com-banner'>
                About Community
              </div>
              <p className='bold-text community-info'>{community?.community_info}</p>
            </div>

            <div className='side-header' style={{'position': 'fixed', 'width':'312px', 'marginTop':'200px'}}>
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