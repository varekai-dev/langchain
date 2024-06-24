import { ChatOpenAI } from '@langchain/openai'
import * as dotenv from 'dotenv'

dotenv.config()

const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temparature: 0.7,
    maxTokens: 1000,
    verbose: true,
})

const response = await model.invoke('Write a poem about AI')

console.log(response)

// const response = await model.stream('Write a poem about AI')

// for await (const chunk of response) {
//     console.log(chunk)
// }
