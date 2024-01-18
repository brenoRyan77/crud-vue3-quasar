<template>
    <div class="q-pa-md row justify-center">
      <div class="chat-container">
        <q-chat-message v-for="(message, index) in messages" :key="index" :text="message.text" :sent="message.sent" />
        <div class="input-container">
          <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Digite sua mensagem" class="chat-input" />
          <q-icon name="send" class="send-icon" @click="sendMessage" />
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      messages: [
        { text: ['Olá, qual é o seu nome?'], sent: false }
      ],
      newMessage: ''
    }
  },
  methods: {
    sendMessage () {
      if (this.newMessage.trim() !== '') {
        this.messages.push({
          text: [this.newMessage],
          sent: true
        })
        setTimeout(() => {
          this.messages.push({
            text: [`Seja bem-vindo, ${this.newMessage}!`],
            sent: false
          })
          this.newMessage = ''
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
.chat-container {
  width: 100%;
  max-width: 500px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  padding: 10px;
}

.input-container {
  display: flex;
  align-items: center;
}

.chat-input {
  flex: 1;
  margin: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.send-icon {
  cursor: pointer;
  margin-left: 10px;
  font-size: 24px;
  color: #007bff;
}
</style>
