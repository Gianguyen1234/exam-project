import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome to Renovate Your Interior! How can we help you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false); // State for typing indicator

  const sendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate bot typing
    setIsTyping(true);

    setTimeout(() => {
      const botReply = { id: (Date.now() + 1).toString(), text: 'Thank you for your message. We will get back to you soon!', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botReply]);
      setIsTyping(false);
    }, 1000);

    setInput('');
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageRow, item.sender === 'user' ? styles.userRow : styles.botRow]}>
      {item.sender === 'bot' && (
        <Image
          source={{ uri: 'https://i.pravatar.cc/50?u=bot' }}
          style={styles.avatar}
        />
      )}
      <View
        style={[
          styles.messageContainer,
          item.sender === 'user' ? styles.userMessage : styles.botMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
      {item.sender === 'user' && (
        <Image
          source={{ uri: 'https://i.pravatar.cc/50?u=user' }}
          style={styles.avatar}
        />
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={isTyping ? [...messages, { id: 'typing', text: 'Bot is typing...', sender: 'bot' }] : messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesList: {
    flexGrow: 1,
    padding: 10,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  botRow: {
    justifyContent: 'flex-start',
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: '#0084FF',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  botMessage: {
    backgroundColor: '#17a2b8',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  botMessageText: {
    color: '#333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#0084FF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
