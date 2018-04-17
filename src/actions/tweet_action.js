import config from '../config.json';

export function startLoader(){
  return { type:"START_LOADER" }
}

export function stopLoader(){
  return { type:"STOP_LOADER" }
}

export function saveToken(token) {
  return { type:"SAVE_TOKEN", data: token }	
}

export function saveLists(lists) {
  return { type:"SAVE_LISTS", data: lists }	
}

export function getList() {
	return (dispatch) => {
		dispatch(startLoader())
		const url = config.base_url+"/getLists"
		return fetch(url, {
	        method: 'GET'
	     })
		.then(response => response.json())
		.then((json) => {
			dispatch(saveLists(json.message))
			dispatch(stopLoader())
		})
		.catch((error) => {
			// console.log(error)
			dispatch(stopLoader())
		})
   }		
}

export function addMember(listId, handles){
	return (dispatch) => {
		dispatch(startLoader())
		const url = config.base_url+"/addMembers"
		return fetch(url, {
			headers: {
 	        	"Content-Type": "application/json",
 	      	},
	        method: 'POST',
	        body: JSON.stringify({
	        	list_id: listId,		 	 
				user_id: '984819676126433281',   
				screen_name: handles, 
	        })
	     })
		.then(response => response.json())
		.then((json) => {
			dispatch(stopLoader())
			dispatch(getMembers({id_str: json.message.id_str, slug: json.message.slug}))
		})
		.catch((error) => {
			// console.log(error)
			dispatch(stopLoader())
		})
   }
}

export function createListAddMembers(handles, listName){
	return (dispatch) => {
		dispatch(startLoader())
		const url = config.base_url+"/createList"
		return fetch(url, {
			headers: {
 	        	"Content-Type": "application/json",
 	      	},
	        method: 'POST',
	        body: JSON.stringify({
	        	name: listName
	        })
	     })
		.then(response => response.json())
		.then((json) => {
			dispatch(stopLoader())
			dispatch(addMember(json.message.id_str, handles))
		})
		.catch((error) => {
			// console.log(error)
			dispatch(stopLoader())
		})
   }
}

export function saveMembers(members) {
	return { type:"SAVE_MEMBERS", data: members }	
}

export function getMembers({id_str, slug}) {
	return (dispatch) => {
		dispatch(startLoader())
		const url = config.base_url+"/getListMembers?list_id="+id_str+"&slug="+slug;
		return fetch(url, {
	        method: 'GET'
	     })
		.then(response => response.json())
		.then((json) => {
			dispatch(stopLoader())
			dispatch(saveMembers(json.message))
		})
		.catch((error) => {
			// console.log(error)
			dispatch(stopLoader())
		})
   }
}

// export function authenticate(){
// 	return (dispatch) => {
// 		dispatch(startLoader())
// 	}
// }