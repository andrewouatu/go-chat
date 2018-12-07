import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getAllMessages, sendMessage } from '../actions';
import Input from './input';

class Chat extends Component {
    componentDidMount(){
        if(!localStorage.getItem('chat_name')){
            return this.props.history.push('/set-name');
        }
        this.props.getAllMessages();
    }

    componentWillUnmount(){
        if(this.dbRef){
            this.dbRef.off();
        }
    }

    handleSendMessage = async ({message}) => {
        console.log('Send message:', message);
        this.props.sendMessage(message);

        this.props.reset();
    };

    render(){
        const { handleSubmit, messages } = this.props;
        const messageElements = Object.keys(messages).map(key => {
            const message = messages[key];
            console.log("Message", message);

            return (
                <li key={key} className="collection-item">
                    <b>{message.name}</b> {message.message}
                </li>
                )
        });

        console.log('Message Elements:', messageElements);

        return (
            <div>
                <div className="right-align grey-text">Logged in as: {localStorage.getItem('chat_name')}</div>
                <h1 className="center">Chat Room</h1>
                <ul className="collection">
                    {messageElements}
                </ul>
                <form onSubmit={handleSubmit(this.handleSendMessage)}>
                    <div className="row">
                        <Field name="message" label="Message" component={Input}/>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        messages: state.chat.messages
    }
}

const validate = ({message}) => message ? {} : {message: 'Please enter a message'};

export default reduxForm({
    form: 'new-message',
    validate
})(connect(mapStateToProps, {
    getAllMessages,
    sendMessage
})(Chat));