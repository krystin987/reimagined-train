<script setup lang="ts">
import './assets/styles.css'
import { ref } from 'vue'
import { fetchThreatsByIP } from './services/otxService'

const ipAddress = ref('')
interface ThreatData {
  pulse_info: {
    count: number
  }
  reputation?: string
  malware_count: number
}

const threatData = ref<ThreatData | null>(null)
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
