import { combineReducers } from "redux"

import form from './components/generic-components/form/Form.reducer'
import users from './components/app-components/twitter-profile/TwitterProfile.reducer'
import tweets from './components/app-components/twitter-widget/TwitterWidget.reducer'

export default combineReducers({
  form,
  users,
  tweets
})
