import { combineReducers } from "redux";
import { LoginReducer as login } from "../routes/Login/modules/login";
import { HomeReducer as home } from "../routes/Home/modules/home";
import { CallsReducer as calls } from "../routes/Calls/modules/calls";
import { AgentsReducer as agents } from "../routes/Agents/modules/agents";
import { QueuesReducer as queues } from "../routes/Queues/modules/queues";

export const makeRootReducer =
(asyncReducers) =>
(state, action) =>
combineReducers({
    login,
    home,
    calls,
    agents,
    queues,
    ...asyncReducers
})(action.type === 'STATE_RESET' ? undefined : state, action)

export default makeRootReducer;
