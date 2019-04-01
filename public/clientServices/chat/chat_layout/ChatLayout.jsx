import {socketConnect} from 'socket.io-react';
import React from "react";
import {Button, Input, Jumbotron} from "reactstrap";
import ChatBubble from './bubbles/Bubbles.jsx';
import ReactDOM from 'react-dom';

class ChatLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedChatUser: props.selectedChatUser,
            message: ''
        };
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            selectedChatUser: nextProps.selectedChatUser
        })
    }


    renderBubbles = (message, i) => {
        return (
            <ChatBubble key={`chatbubbles:${i}`} text={message.text} time={message.time} isRight={message.to}/>
        );

    };


    sendMessage = () => {
        const {message} = this.state;
        if (!message) {
            return;
        }
        this.props.sendMessage(message);
        this.setState({
            message: ''
        })

    };

    componentDidUpdate() {
        // Scroll as new elements come along
        // var len = this.state.selectedChatUser.messages.length - 1;
        // const node = ReactDOM.findDOMNode(this['_div' + len]);
        // if (node) {
        //     node.scrollIntoView();
        // }
    }

    render() {
        const {selectedChatUser, message} = this.state;
        return (
            <div className="chat-layout-container">
                {
                    selectedChatUser ? <div>
                        <div className="chatlayout-header-container">
                            <p className="chatlayout-header">{selectedChatUser.name}</p>
                        </div>


                        <div className="chatlayout-body">
                            <div className="chatlayout-bubble-container">
                                {
                                    selectedChatUser.messages.map(this.renderBubbles)
                                }

                            </div>
                            <div className="chatlayout-inputsend-container">
                                <Input onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        this.sendMessage();
                                    }
                                }} value={message} onChange={(e) => {
                                    this.setState({
                                        message: e.target.value
                                    })
                                }} placeholder="Type a message!"/>
                                <Button style={{marginLeft: 20}} color={'primary'}
                                        onClick={this.sendMessage}>SEND</Button>
                            </div>
                        </div>

                    </div> : <div className="chatlayout-nomessage-arrow">

                        <Jumbotron>
                            <p className="lead">Welcome to <strong style={{color: "#DB4437"}}>Postman Pat</strong></p>
                            <p className="lead chatlayout-info-notext">Select a previous conversation or start a new
                                conversation. Happy Texting!</p>
                        </Jumbotron>

                        <img className="pp-image" src="../../../images/postman_pat.jpeg"/>
                    </div>
                }

            </div>
        )
    }

}

export default socketConnect(ChatLayout);


