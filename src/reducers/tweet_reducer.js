const initialState={
  loading:false,
  token: '',
  lists: [],
  members: ''
}
export default function twitterData(state = initialState, action){
  switch (action.type) {
    case "START_LOADER":
      return {...state, loading: true }
    case "STOP_LOADER":
    	return {...state, loading:false };
    case "SAVE_TOKEN": 
    	return {...state, token:action.data };
    case "SAVE_LISTS": 
    	return {...state, lists:action.data };
    case "SAVE_MEMBERS":
    	return {...state, members: action.data}
    default:
      return state;
  }
}
