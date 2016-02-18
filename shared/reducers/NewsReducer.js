import { GET_NEWS_FEED, GET_ARTICLE_BY_ID } from '../actions/NewsActions'

const defaultState = {}

export default function newsReducer(state = defaultState, action) {
  console.log('====== hello from reducer ======', action.type);
  console.log(action);

  switch (action.type) {
    case GET_NEWS_FEED:
      return Object.assign({}, state, { newsFeed: action.res });

    case GET_ARTICLE_BY_ID:
      return Object.assign({}, state, { currentArticle: action.res });

    default:
      return state;
  }

}
