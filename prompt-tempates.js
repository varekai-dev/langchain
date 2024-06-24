import dotenv from 'dotenv'
import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'

dotenv.config()

const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.7,
})

//Create Prompt Template

// first variant
// const prompt = ChatPromptTemplate.fromTemplate(
//     'You are a comedian. Tell a joke based on the following word {input}'
// )

// second variant
const prompt = ChatPromptTemplate.fromMessages([
    ['system', 'You are a comedian. Tell a joke provided by the user'],
    ['user', '{input}'],
])

// console.log(await prompt.format({ input: 'banana' }))

// Create chain

const chain = prompt.pipe(model)

// Call chain

const response = await chain.invoke({ input: 'programmer' })

console.log(response)
