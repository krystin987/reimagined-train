<script setup lang="ts">
import './assets/styles.css'
import { ref } from 'vue'
import { fetchThreatsByIP } from './services/otxService'

interface ThreatData {
  pulse_info: { count: number }
  reputation?: number // Change from string to number
  malware_count?: number
}

interface AbuseData {
  abuseConfidenceScore: number
  lastReportedAt?: string
}

const ipAddress = ref<string>('')
const threatData = ref<ThreatData | null>(null)
const loading = ref<boolean>(false)
const error = ref<string>('')
const abuseData = ref<AbuseData | null>(null)
const history = ref<string[]>([])

const checkThreat = async () => {
  if (!ipAddress.value) return

  history.value.push(ipAddress.value) // Save search history
  loading.value = true
  error.value = ''
  threatData.value = null

  const data = await fetchThreatsByIP(ipAddress.value)
  if (data) {
    threatData.value = data
  } else {
    error.value = 'Failed to retrieve data.'
  }

  loading.value = false
  setTimeout(() => {
    const inputField = document.querySelector('input')
    if (inputField) inputField.focus() // Null-check before calling .focus()
  }, 100)
}
</script>

<template>
  <div class="terminal-container">
    <h1>Cyber Threat Intelligence Tool</h1>

    <div class="input-group">
      <span class="prompt">>_</span>
      <input v-model="ipAddress" placeholder="Enter an IP address" @keyup.enter="checkThreat" />
      <button @click="checkThreat" :disabled="loading">Check</button>
    </div>

    <p v-if="loading" class="loading">Fetching data...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="threatData || abuseData" class="results">
      <h2>Threat Data for {{ ipAddress }}</h2>

      <table>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
        <tr v-if="threatData">
          <td>OTX Pulse Count</td>
          <td>{{ threatData.pulse_info.count }}</td>
        </tr>
        <tr v-if="abuseData">
          <td>AbuseIPDB Confidence Score</td>
          <td>{{ abuseData.abuseConfidenceScore }}%</td>
        </tr>
        <tr v-if="abuseData">
          <td>Last Reported</td>
          <td>{{ abuseData.lastReportedAt || 'Never' }}</td>
        </tr>
      </table>
    </div>
    <div class="history">
      <h2>Search History</h2>
      <ul>
        <li v-for="ip in history" :key="ip">{{ ip }}</li>
      </ul>
    </div>
  </div>
</template>
