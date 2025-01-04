import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome to Renovate Your Interior! How can we help you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef();

  const predefinedQuestions = [
    'What are your working hours?',
    'Can you suggest furniture for a small room?',
    'Do you provide custom designs?',
    'What materials do you use?',
  ];

  const predefinedAnswers = {
    'What are your working hours?': 'Our working hours are from 9 AM to 6 PM, Monday to Saturday.',
    'Can you suggest furniture for a small room?': 'We recommend multi-functional furniture like sofa beds or wall-mounted tables.',
    'Do you provide custom designs?': 'Yes, we specialize in custom designs to suit your preferences.',
    'What materials do you use?': 'We use high-quality materials such as solid wood, MDF, and engineered wood.',
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now().toString(), text, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsTyping(true);

    setTimeout(() => {
      const botReply = {
        id: (Date.now() + 1).toString(),
        text: predefinedAnswers[text] || 'Thank you for your message. We will get back to you soon!',
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botReply]);
      setIsTyping(false);
    }, 1000);
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageRow, item.sender === 'user' ? styles.userRow : styles.botRow]}>
      {item.sender === 'bot' && (
        <Image source={{ uri: 'https://i.pravatar.cc/50?u=bot' }} style={styles.avatar} />
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
        <Image source={{ uri: 'https://i.pravatar.cc/50?u=user' }} style={styles.avatar} />
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
        ref={flatListRef}
        data={isTyping ? [...messages, { id: 'typing', text: 'Bot is typing...', sender: 'bot' }] : messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.questionContainer}>
        <FlatList
          horizontal
          data={predefinedQuestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.questionButton}
              onPress={() => sendMessage(item)}
            >
              <Text style={styles.questionText}>{item}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage(input)}>
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  questionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    height: 80, // Fixed height
  },
  questionButton: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
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
