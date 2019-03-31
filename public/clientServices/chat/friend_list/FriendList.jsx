import {socketConnect} from 'socket.io-react';
import React from "react";
import FriendListHeader from './FriendListHeader.jsx';
import {ListGroup, ListGroupItem} from "reactstrap";


class FriendList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onUserSelected = (user) => {
        this.props.onChatUserSelected(user);
    };

    renderFriendChat = (user, i) => {
        if (user.messages.length === 0) {
            return null
        }

        console.log(user.messages);
        return (
            <ListGroupItem onClick={this.onUserSelected.bind(this, user)} className="friendlist-element"
                           key={`friendlist:${i}`}>
                <p className="friendlist-name">{user.name}</p>
                <p className="friend-list-content">{user.messages[user.messages.length - 1].text}</p>
            </ListGroupItem>
        )
    };

    renderPlaceHolder = (users) => {
        let totalMessages = 0;
        for (let i = 0; i < users.length; i++) {
            totalMessages += users[i].messages.length
        }

        if (totalMessages === 0) {
            return <div><p className="friendlist-nochat-text">You have no active chats at the moment.</p></div>
        } else {
            return null;
        }
    };

    render() {
        const {users} = this.props;
        return (
            <div className="friend-list-container">

                <FriendListHeader {...this.props}/>
                <ListGroup>
                    {
                        users.map(this.renderFriendChat)
                    }
                </ListGroup>
                {
                    this.renderPlaceHolder(users)
                }

            </div>
        )
    }

}

export default socketConnect(FriendList);


