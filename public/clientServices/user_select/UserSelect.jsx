import {socketConnect} from 'socket.io-react';
import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroupItem, ListGroup} from 'reactstrap';
import ApiServices from "../api_services/base_api";
import Loader from 'react-loader-spinner';
import './userselect.css';

const apiservices = new ApiServices();

class UserSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            loading: true,
            users: null,
            selectedUser: null
        };
    }

    closeModal = () => {
        this.setState({
            modalOpen: false
        })
    };

    componentDidMount() {
        this.setState({
            modalOpen: true,
            loading: true
        });
        apiservices.getUserList().then((successResp) => {
            this.setState({
                users: successResp.data.users,
                loading: false
            });
        }, (err) => {
            console.error('ERROR:', err);
            this.setState({
                users: null,
                loading: false
            });
        })

    }

    selectUser = (selectedUser) => {
        this.setState({
            selectedUser
        });
    };

    renderUserList = (user, index) => {
        const {selectedUser} = this.state;
        let isSelected = false;
        if (selectedUser && selectedUser.uid === user.uid) {
            isSelected = true;
        }

        return (
            <ListGroupItem onClick={this.selectUser.bind(this, user)}
                           style={isSelected ? {backgroundColor: "#007bff", color: "#FFF"} : {color: "#000"}}
                           className="userselect-listelement"
                           key={`userlist:${index}`}>{user.name}</ListGroupItem>
        )
    };

    render() {
        const {modalOpen, users, selectedUser} = this.state;
        return (
            <div>

                <Modal onClosed={() => {
                    if (!this.state.selectedUser) {
                        this.setState({
                            modalOpen: true
                        })
                    }
                }} isOpen={modalOpen} toggle={this.closeModal}>
                    <ModalHeader toggle={this.closeModal}>Please select a User</ModalHeader>
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
                    <ModalFooter>
                        <Button color="primary" disabled={!selectedUser} onClick={() => {
                            const {selectedUser, users} = this.state;
                            this.props.selectUser(selectedUser, users);
                        }}>Select</Button>{' '}
                        <Button color="secondary" onClick={() => {
                            this.setState({
                                selectedUser: null
                            })
                        }}>Clear</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

export default UserSelect;


