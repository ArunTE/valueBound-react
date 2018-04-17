import { connect } from "react-redux"
import * as tweetAction from "../actions/tweet_action" 
import { bindActionCreators } from "redux"

function formatLists(lists) {
	lists = lists.map((list) => {
		return {
			id: list.id,
			label: list.name,
			value: list.name,
			slug: list.slug,
			id_str: list.id_str
		}
	})
	return lists
}

function mapStateToProps(state){
	return {
		loading: state.twitterData.loading,
		token: state.twitterData.token,
		lists: formatLists(state.twitterData.lists),
		members: state.twitterData.members
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...tweetAction }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
