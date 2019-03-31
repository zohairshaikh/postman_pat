import React from "react";
import {render} from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    SocketProvider
} from 'socket.io-react';
import ChatScreen from './chat/chat_screen.jsx';
import io from 'socket.io-client';
import {BASE_SOCKET_URL} from './constants';
import UserSelect from './user_select/UserSelect.jsx';

const socket = io.connect(`ws://${BASE_SOCKET_URL}`);


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
            currentUser: null
        };

    }


    selectUser = (currentUser, users) => {
        this.setState({
            currentUser, users
        })
    };

    render() {
        const {users, currentUser} = this.state;
        return (
            <div style={{height: '100%'}}>
                {
                    !!currentUser ? <ChatScreen users={users} socket={socket} currentUser={currentUser}/> :
                        <UserSelect selectUser={this.selectUser}/>
                }
            </div>
        )
    }

}

render(<SocketProvider socket={socket}>
    <App/>
</SocketProvider>, document.getElementById("postmanPatApp"));
