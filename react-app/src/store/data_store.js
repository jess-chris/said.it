// Community 

const GET_COMMUNITIES = 'data_store/GET_COMMUNITIES';
const CREATE_COMMUNITY = 'data_store/CREATE_COMMUNITY';
const EDIT_COMMUNITY = 'data_store/EDIT_COMMUNITY';
const DELETE_COMMUNITY = 'data_store/DELETE_COMMUNITY';





const all_communities = (communities) => ({
  type: GET_COMMUNITIES,
  communities
});



const add_community = (community) => ({
  type: CREATE_COMMUNITY,
  community
});


const del_community = (community) => ({
  type: DELETE_COMMUNITY,
  community
});

const ed_community = (community, old) => ({
  type: EDIT_COMMUNITY,
  community,
  old
});




// Communities

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


export const edit_community = (community) => async (dispatch) => {

  const res = await fetch('/api/communities/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(community)
  });

  if (res.ok) {
    const {community, old} = await res.json();
    dispatch(ed_community(community, old));
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};



export const delete_community = (community_id) => async (dispatch) => {

  const res = await fetch('/api/communities/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(community_id)
  });

  if (res.ok) {
    const community = await res.json();
    await dispatch(del_community(community));
    return community;
  }

};



// Posts

export const create_post = (post) => async (dispatch) => {

  const res = await fetch('/api/posts/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });

  if (res.ok) {
    await res.json();
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};


export const edit_post = (post) => async (dispatch) => {

  const res = await fetch('/api/posts/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });

  if (res.ok) {
    const post = await res.json();
    return post;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};


export const delete_post = (post_id) => async (dispatch) => {

  const res = await fetch('/api/posts/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post_id)
  });

  if (res.ok) {
    const post = await res.json();
    return post;
  } 
};



export default function reducer(state = {all_communities: {}, current_community: {}, current_post: {}}, action) {

  const newState = { ...state }

  switch(action.type) {

    case GET_COMMUNITIES:
      action.communities.forEach((community) => newState.all_communities[community.name] = community);
      return newState;

    case CREATE_COMMUNITY:
      newState.all_communities[action.community.name] = action.community;
      return newState;

    case EDIT_COMMUNITY:
      newState.all_communities[action.old] = action.community;
      newState.all_communities[action.community.name] = newState.all_communities[action.old]
      delete newState.all_communities[action.old]
      return newState;

    case DELETE_COMMUNITY:
      delete newState.all_communities[action.community.name];
      return newState;

    default:
      return state;
  }
};