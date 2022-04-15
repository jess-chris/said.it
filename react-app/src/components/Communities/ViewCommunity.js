import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as data_funcs from '../../store/data_store';
import EditPostForm from '../Posts/EditPostForm';

import './Community.css';
import EditCommunityForm from './EditCommunityForm';

const ViewCommunity = () => {

const dispatch = useDispatch();
const [loaded, setLoaded] = useState(false);
const [content, setContent] = useState('');
const [postTitle, setPostTitle] = useState('');
const [errors, setErrors] = useState([]);
const history = useHistory();
const { name } = useParams();

useEffect(() => {
  (async() => {
    await dispatch(data_funcs.get_communities());
    setLoaded(true);
  })();
}, [dispatch]);


const userId = useSelector(state => state.session.user?.id);
const community = useSelector(state => state.data_store.all_communities[name.toLowerCase()]);

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
    'title': postTitle,
    'content': content
  };

  const data = await dispatch(data_funcs.create_post(post));

  if (data) {
    setErrors(data);
  } else {
    setContent('');
    await dispatch(data_funcs.get_communities());
  }


};


let sessionLinks;
if (userId === community?.owner) {

  sessionLinks = (
    <div id='com-btns'>
      <EditCommunityForm />
      <button className='main-links btn-style' onClick={handleDelete}>Delete</button>
    </div>
    );

}



return (
  <div className='community-page'>

    <span className='com-header'></span>
    <div className='com-header-cont'>
    </div>

    <div className='main-com-cont'>

      <div className='com-menu-bar'>
        <h1 className='bold-text' style={{'fontSize': '18px'}}>s/{community?.name}</h1>
        {sessionLinks && sessionLinks}
      </div>

    </div>

    <div className='com-content'>

      <div className='com-post-cont'>

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
                  placeholder='Text'
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

        <div className="post-cont">


          {loaded && community?.posts?.map((post) => {
            return (
              <div key={post?.id} className="single-post">
                <p className='light-text'>Posted by u/{post?.user_name}</p>
                <p className="medium-text" style={{'fontWeight': 'bold'}}>{post?.title}</p>
                <p className="light-text">{post?.content}</p>
                {userId === post?.user_id && (
                <div id='com-btns'>
                  <EditPostForm post={post} />
                </div>
                )}
              </div>
            )
          })}

        </div>
      </div>

      <div className='side-page-cont'>

          <div className='side-page'>

            <div className='side-header'>
            <h2 className="bold-text community-info" style={{'fontSize': '16px'}}>Community Info:</h2>
              <p className='bold-text community-info'>{community?.community_info}</p>
            </div>
          </div>

      </div>
    </div>
  </div>
)

};

export default ViewCommunity;