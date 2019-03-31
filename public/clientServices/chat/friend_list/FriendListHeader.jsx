import {socketConnect} from 'socket.io-react';
import React from "react";
import {Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Loader from "react-loader-spinner";

class FriendListHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newChatModal: false,
        };
    }

    onNewChatClick = () => {
        this.setState({
            newChatModal: true
        })
    };

    closeModal = () => {
        this.setState({
            newChatModal: false
        })
    };

    selectUser = (user) => {
        this.props.onChatUserSelected(user);
        this.closeModal();
    };

    renderUserList = (user, index) => {

        return (
            <ListGroupItem onClick={this.selectUser.bind(this, user)}
                           className="userselect-listelement"
                           key={`userlist:${index}`}>{user.name}</ListGroupItem>
        )
    };


    render() {
        const {newChatModal} = this.state;
        const {users} = this.props;
        return (
            <div className="friend-list-header">
                <p className="friendlist-header-logo">Postman Pat</p>
                <div className="friendlist-send-btn" onClick={this.onNewChatClick}><i className="icon send"/></div>


                <Modal isOpen={newChatModal} toggle={this.closeModal}>
                    <ModalHeader toggle={this.closeModal}>My Friends</ModalHeader>
                    <ModalBody>
                        {
                            !users ? <div className="userselect-loadercontainer"><Loader
                                type="Grid"
                                color="#007bff"
                                height="50"
                                width="50"
                            /></div> : <ListGroup>{users.map(this.renderUserList)}</ListGroup>
                        }
                    </ModalBody>
                </Modal>


            </div>
        )
    }

}

export default FriendListHeader;


