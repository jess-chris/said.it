// Community 

const GET_COMMUNITIES = 'data_store/GET_COMMUNITIES';
//const GET_CURRENT_COMMUNITY = 'data_store/GET_CURRENT_COMMUNITY';
const CREATE_COMMUNITY = 'data_store/CREATE_COMMUNITY';
//const DELETE_COMMUNITY = 'data_store/DELETE_COMMUNITY';





const all_communities = (communities) => ({
  type: GET_COMMUNITIES,
  communities
});



const add_community = (community) => ({
  type: CREATE_COMMUNITY,
  community
});


// const del_community = (community_id) => ({
//   type: DELETE_COMMUNITY,
//   community_id: community_id
// })



export const get_communities = () => async (dispatch) => {

  const res = await fetch('/api/communities/')
  if (res.ok) {
    const { communities } = await res.json()
    dispatch(all_communities(communities));
  } else {
    return 'ERROR'
  }
};





export const create_community = (community) => async (dispatch) => {

  const res = await fetch('/api/communities/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(community)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(add_community(data));
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};





export default function reducer(state = {all_communities: {}, current_community: {}, current_post: {}}, action) {

  const newState = { ...state }

  switch(action.type) {

    case GET_COMMUNITIES:

      action.communities.forEach((community) => newState.all_communities[community.id] = community);
      return newState;


    case CREATE_COMMUNITY:
      newState.all_communities[action.community.id] = action.community;
      return newState;

    //case DELETE_COMMUNITY:

    default:
      return state;
  }
};