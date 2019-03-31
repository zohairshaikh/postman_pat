import {socketConnect} from 'socket.io-react';
import React from "react";
import FriendList from "./friend_list/FriendList.jsx";
import ChatLayout from "./chat_layout/ChatLayout.jsx";
import "./chat.css"
import moment from 'moment';

class ChatScreen extends React.Component {

    constructor(props) {
        super(props);
        // Prepare data with null chats for all users

        let {users, currentUser} = this.props;

        let index = users.indexOf(currentUser);
        if (index > -1) {
            users.splice(index, 1);
        }


        users = users.map((u, _) => {

            this.props.socket.on(`broadcastMessage:f${u.uid}-t${currentUser.uid}`, this.onMessageRecieved);

            return {
                ...u,
                messages: [],
                recentMessage: moment()
            }
        });

        this.state = {
            users: users,
            currentUser: currentUser,
            selectedChatUser: null
        };
    }

    sortUsers = (users) => {

        function descSort(a, b) {
            return b.recentMessage.unix() - a.recentMessage.unix();
        }

        users.sort(descSort);
        return users
    };

    onMessageRecieved = (messageObj) => {
        let {users} = this.state;
        users = users.map((u, _) => {
            let updatedObj = {...u};
            let time = moment();
            if (u.uid === messageObj.from) {
                updatedObj.messages.push({
                    text: messageObj.message,
                    to: false,
                    time: time
                });
                updatedObj.recentMessage = time;
            }
            return updatedObj;
        });
        users = this.sortUsers(users);

        this.setState({
            users
        })
    };

    onChatUserSelected = (selectedChatUser) => {
        this.setState({
            selectedChatUser
        })
    };

    sendMessage = (message) => {

        let {users, currentUser, selectedChatUser} = this.state;
        users = users.map((u, _) => {
            let updatedObj = {...u};
            let time = moment();
            if (u.uid === selectedChatUser.uid) {
                updatedObj.messages.push({
                    text: message,
                    to: true,
                    time: time
                });
                updatedObj.recentMessage = time;
            }
            return updatedObj;
        });
        users = this.sortUsers(users);
        this.setState({
            users
        });
        this.props.socket.emit('newMessage', {
            'from': currentUser.uid,
            "to": selectedChatUser.uid,
            "message": message
        });
    };

    render() {
        const {users, currentUser, selectedChatUser} = this.state;

        return (
            <div className="main-chat-container">
                <FriendList users={users} currentUser={currentUser} onChatUserSelected={this.onChatUserSelected}/>
                <ChatLayout users={users} currentUser={currentUser} sendMessage={this.sendMessage}
                            selectedChatUser={selectedChatUser}/>
            </div>
        )
    }

}

export default socketConnect(ChatScreen);


