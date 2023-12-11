import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'time.manager.webapp',
  appName: 'time-manager-webapp',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
}

export default config
