import axios from 'axios'
import { promises as fs } from 'fs'

export const generate = async (host: string, output: string) => {
  const response = await axios.get(`${host}/swagger.json`)
  const swaggerJson = response.data
  if (!swaggerJson) {
    throw new Error('swagger.json could not be generated.')
  }
  await fs.writeFile(output, JSON.stringify(swaggerJson))
  console.log('Saved swagger.json to', output)
}
