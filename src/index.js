import React from "react";
import ReactDOM from "react-dom";
import Application from "./routes/Application";
import registerServiceWorker from "./registerServiceWorker";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import ReduxToastr from "react-redux-toastr";
import persistence from "./config/store";
import {PersistGate} from "redux-persist/es/integration/react";
import history from "./config/history";
import "semantic-ui-css/semantic.min.css";
import {Dimmer, Loader, Segment} from "semantic-ui-react";
import "./index.css";
import "./common/react-redux-toastr.min.css";
import Menu from "./components/common/Menu";

ReactDOM.render(
    <Provider store={persistence.store}>
        <PersistGate
            persistor={persistence.persistor}
            loading={
                <Segment inverted>
                    <Dimmer active>
                        <Loader/>
                    </Dimmer>
                </Segment>
            }>
            <Router history={history}>
                <div className="app-container">
                    <Menu/>
                    <div className="app-content" style={{paddingTop: "30px", paddingBottom: "30px"}}>
                        <ReduxToastr
                            timeOut={4000}
                            newestOnTop={false}
                            preventDuplicates
                            transitionIn="fadeIn"
                            transitionOut="fadeOut"
                            progressBar/>
                        <Application/>
                    </div>
                </div>
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

registerServiceWorker();
