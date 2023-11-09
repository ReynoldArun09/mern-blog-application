import { app } from './app'

const port = process.env.PORT || 3001
const nodeEnv = process.env.NODE_ENV

app.listen(port, () => {
  console.log(`[${nodeEnv?.toUpperCase()} Server is up and running on http://localhost:${port}]`)
})
 