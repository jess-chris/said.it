import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";

import * as data_funcs from '../../store/data_store';
import CreatePostForm from "../Posts/CreatePostForm";

import './HomePage.css'

const HomePage = () => {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    (async() => {
      await dispatch(data_funcs.get_communities());
      setLoaded(true);
    })();
  }, [dispatch]);

  
  const communityObj = useSelector(state => state.data_store.all_communities)
  const communities = Object.values(communityObj);

  if (!loaded) {
    return null;
  }
  
  return (

    <div className="main-cont">


      <div className="post-cont">

        <div className="post-cont-topbar">
          <button className="main-links">Test</button>
          <button className="main-links">Test</button>
          <button className="main-links">Test</button>
        </div>

        <div>

          {loaded && communities?.map((community) => {
            return community?.posts?.map((post) => {
              return (
                <div key={post?.id} className="single-post">
                  <p><span className="bold-text">{`s/${community?.name}`}</span> • <span className="light-text">Posted by u/{post?.user_name}</span></p>
                  <p className="medium-text" style={{'fontWeight': 'bold'}}>{post?.title}</p>
                  <p className="light-text">{post?.content}</p>
                </div>
              )
            })
          })}

        </div>

      </div>

      <div className="side-page-cont">

        <div className="side-page">

          <div className='side-header'>

            <div id="banner">
              <h2 className="bold-text" style={{'color': '#fff'}}>Top Communities</h2>
            </div>

            <ol style={{"listStyle": "none"}}>

              {loaded && communities?.map((community) => {
                return(
                  <li className="top-com-list" key={community?.name}>
                      <NavLink className='bold-text' to={`s/${community?.name}`}>s/{community?.name}</NavLink>
                  </li>

                )
              })}

            </ol>

          </div>

          <div className="main-spacer"></div>

          <div className="side-header">

            <div className="p-home-banner"></div>

            <div className="personal-home-cont">

              <div className="p-home-header">
                <div id="p-home-moogle"></div>
                <p className="bold-text">Home</p>
              </div>

              <div>
                <p>Your personal Saidit frontpage. Come here to check in with your favorite communities.</p>
              </div>

              <div id="create-links">

                <CreatePostForm />
                <NavLink to='/communities/new'>
                  <button style={{"backgroundColor": "#FFF", "color": "#0079D3", "borderColor": "#0079D3"}} className="main-links">Create Community</button>
                </NavLink>
              </div>

            </div>



          </div>


        </div>


      </div>


    </div>




  )



};


export default HomePage;