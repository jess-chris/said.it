import React from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

import './HomePage.css'

const HomePage = () => {

  //const dispatch = useDispatch();
  const communityObj = useSelector(state => state.data_store.all_communities)
  const communities = Object.values(communityObj);
  
  // useEffect(() => {
  //   dispatch(get_communities(communities));
  // }, [dispatch]);



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

            <p>{`/s/${communities[0]?.name}`}</p>
            <p>post data</p>
            <p>post data</p>
            <p>post data</p>

          </div>

          <div className="single-post">

            <p>{`/s/${communities[0]?.name}`}</p>
            <p>post data</p>
            <p>post data</p>
            <p>post data</p>

          </div>

          <div className="single-post">

            <p>{`/s/${communities[0]?.name}`}</p>
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

            <ol style={{"list-style": "none"}}>

              {communities?.map((community) => {
                return(
                  <li className="top-com-list" key={community?.id}>
                      <NavLink to={`/s/${community?.name}`}>{community?.name}</NavLink>
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

                <button style={{"backgroundColor": "#0079D3", "color": "#FFF", "borderColor": "#0079D3"}} className="main-links">Create Post</button>
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