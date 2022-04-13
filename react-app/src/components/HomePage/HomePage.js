import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";

import * as dataActions from '../../store/data_store';
import CreatePostForm from "../Posts/CreatePostForm";

import './HomePage.css'

const HomePage = () => {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    (async() => {
      await dispatch(dataActions.get_communities());
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
          <button>Test</button>
          <button>Test</button>
          <button>Test</button>
        </div>

        <div>

          <div className="single-post">

            <p>{`s/${communities[0]?.name}`}</p>
            <p>post data</p>
            <p>post data</p>
            <p>post data</p>

          </div>

          <div className="single-post">

            <p>{`s/${communities[0]?.name}`}</p>
            <p>post data</p>
            <p>post data</p>
            <p>post data</p>

          </div>

          <div className="single-post">

            <p>{`s/${communities[0]?.name}`}</p>
            <p>post data</p>
            <p>post data</p>
            <p>post data</p>

          </div>


        </div>


      </div>

      <div className="side-page-cont">

        <div className="side-page">

          <div className='side-header'>

            <div id="banner">Top Communities</div>

            <ol style={{"listStyle": "none"}}>

              {loaded && communities?.map((community) => {
                return(
                  <li className="top-com-list" key={community?.name}>
                      <NavLink to={`s/${community?.name}`}>{community?.name}</NavLink>
                  </li>

                )
              })}

            </ol>

          </div>

          <div className="main-spacer"></div>

          <div className="side-header">

            <div className="personal-home-cont">


              <div>Home</div>

              <div>Your personal Saidit frontpage. Come here to check in with your favorite communities.</div>

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