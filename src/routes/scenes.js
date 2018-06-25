import React from "react";
import { Actions, Scene } from "react-native-router-flux";
import LoginContainer from "./Login/containers/LoginContainer";
import HomeContainer from "./Home/containers/HomeContainer";
import CallsContainer from "./Calls/containers/CallsContainer";
import AgentsContainer from "./Agents/containers/AgentsContainer";
import QueuesContainer from "./Queues/containers/QueuesContainer";

const scenes = Actions.create(
    <Scene key="root" hideNavBar>
        <Scene key="login" type="reset" panHandlers={null} component={LoginContainer} title="login" initial />
        <Scene key="home" type="reset" panHandlers={null} component={HomeContainer} title="home" />
        <Scene key="calls" type="reset" panHandlers={null} component={CallsContainer} title="calls" />
        <Scene key="agents" type="reset" panHandlers={null} component={AgentsContainer} title="agents" />
        <Scene key="queues" type="reset" panHandlers={null} component={QueuesContainer} title="queues" />
    </Scene>
);

export default scenes;
