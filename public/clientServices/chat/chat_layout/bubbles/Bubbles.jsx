import React from 'react';
import './bubbles.css'

class ChatBubble extends React.Component {
    render() {

        const bubbleClass = this.props.isRight ? 'talk-bubble tri-right btm-right' : "talk-bubble tri-right left-top"
        return (
            <div style={this.props.isRight ? {
                display: 'flex',
                justifyContent: 'flex-end'
            } : {}}>


                <div className={bubbleClass}>
                    <div className="talktext">
                        <p>{this.props.text}</p>
                        <div className="bubbles-time-container"><p>{this.props.time.format('hh:mm A DD/MM')}</p></div>
                    </div>
                </div>

            </div>
        )
    }
}


export default ChatBubble;
