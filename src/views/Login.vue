<template>
    <article class="login-container flex col gap-1">
      <h1>Login</h1>
  
      <div class="input-group">
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
      </div>
  
      <button @click="handleLogin" class="login-button full-w">Log in</button>
    </article>
  </template>
  
  <script setup>
  import router from '../router/index';
  import { ref } from 'vue';
  import { checkLogin } from '../backend/accountManager';
  import { currentUser } from '../backend/accountManager';
  
  const username = ref("");
  const password = ref("");
  
  const handleLogin = () => {
    if (username.value.length === 0 || password.value.length === 0) {
      alert("Username or password is empty");
      return;
    }
  
    if (checkLogin(username.value, password.value)) {
      router.push({ path: `/${currentUser.accountType}/${currentUser.username}` });
      return;
    }
  
    alert("Login failed! Please check your credentials.");
  };
  </script>
  
  <style scoped>

  .login-container {
    width: 400px;
    height: auto;
    margin: 18rem auto;
    padding: 4rem;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    background: #1e1e1e; /* Darker container background */
    text-align: center;
  }
  
  h1 {
    margin-bottom: 20px;
    color: #ffffff; /* White heading */
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  input {
    padding: 10px;
    border: 1px solid #555; /* Darker border */
    border-radius: 5px;
    background: #333; /* Dark input background */
    color: #ffffff; /* White text in inputs */
    font-size: 16px;
    transition: border 0.3s;
  }
  
  input::placeholder {
    color: #aaa; /* Light gray placeholder */
  }
  
  input:focus {
    border-color: #007bff; /* Highlight border on focus */
    outline: none;
  }
  
  .login-button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff; /* Blue button */
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .login-button:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
  
  .footer-text {
    margin-top: 20px;
    font-size: 14px;
    color: #bbb; /* Light gray footer text */
  }
  
  .footer-text a {
    color: #007bff; /* Blue link */
    text-decoration: none;
  }
  
  .footer-text a:hover {
    text-decoration: underline;
  }
  </style>