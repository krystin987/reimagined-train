<script setup lang="ts">
import { ref } from 'vue'
import { fetchThreatsByIP } from './services/otxService'

const ipAddress = ref('')
const threatData = ref(null)
const loading = ref(false)
const error = ref('')

const checkThreat = async () => {
  if (!ipAddress.value) return

  loading.value = true
  error.value = ''
  threatData.value = null

  const data = await fetchThreatsByIP(ipAddress.value)
  if (data) {
    threatData.value = data
  } else {
    error.value = 'Failed to retrieve data. Please try again.'
  }

  loading.value = false
}
</script>

<template>
  <div class="terminal-container">
    <h1>Cyber Threat Intelligence Tool</h1>

    <div class="input-group">
      <span class="prompt">>_</span>
      <input v-model="ipAddress" placeholder="Enter an IP address" />
      <button @click="checkThreat" :disabled="loading">Check</button>
    </div>

    <p v-if="loading" class="loading">Fetching data...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="threatData" class="results">
      <h2>Threat Data for {{ ipAddress }}</h2>

      <table>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Pulse Count</td>
          <td>{{ threatData.pulse_info.count }}</td>
        </tr>
        <tr>
          <td>Reputation</td>
          <td>{{ threatData.reputation || 'Unknown' }}</td>
        </tr>
        <tr>
          <td>Malware Found</td>
          <td>{{ threatData.malware_count }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style>
/* General Terminal Aesthetic */
.terminal-container {
  background-color: #000;
  color: #0f0;
  font-family: 'Courier New', monospace;
  text-align: left;
  padding: 20px;
  border-radius: 5px;
  max-width: 700px;
  margin: 50px auto;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
}

/* Input Group Styling */
.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.prompt {
  color: #0f0;
  font-weight: bold;
  margin-right: 5px;
}

input {
  flex: 1;
  background: black;
  border: 1px solid #0f0;
  color: #0f0;
  padding: 10px;
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  outline: none;
  caret-color: #0f0;
}

button {
  background: black;
  border: 1px solid #0f0;
  color: #0f0;
  padding: 10px;
  cursor: pointer;
  font-family: 'Courier New', monospace;
}

button:hover {
  background: #0f0;
  color: black;
  transition: 0.3s;
}

button:disabled {
  border-color: #555;
  color: #555;
  cursor: not-allowed;
}

/* Error & Loading Messages */
.error {
  color: red;
}

.loading {
  color: cyan;
}

/* Table Styling */
.results {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  border: 1px solid #0f0;
  padding: 8px;
  text-align: left;
}

th {
  background: black;
  color: #0f0;
}

td {
  color: #0f0;
}

/* Text Glow Effect */
@keyframes glow {
  0% {
    text-shadow: 0 0 5px #0f0;
  }
  50% {
    text-shadow: 0 0 10px #0f0;
  }
  100% {
    text-shadow: 0 0 5px #0f0;
  }
}

h1 {
  text-align: center;
  animation: glow 1.5s infinite alternate;
}
</style>
