import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'

import {
    StringOutputParser,
    CommaSeparatedListOutputParser,
    StructuredOutputParser,
} from '@langchain/core/output_parsers'

import z from 'zod'
// Import environment variables
import * as dotenv from 'dotenv'
dotenv.config()

// Instantiate the model
const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.9,
})

// Create Prompt Template using fromTemplate
// const prompt = ChatPromptTemplate.fromTemplate('Tell a joke about {word}');

async function callStringOutputParser() {
    // Create Prompt Template from fromMessages
    const prompt = ChatPromptTemplate.fromMessages([
        ['system', 'Generate a joke based on word provided by the user'],
        ['human', '{input}'],
    ])

    // Create Parser
    const parser = new StringOutputParser()

    const chain = prompt.pipe(model).pipe(parser)

    return await chain.invoke({
        input: 'dog',
    })
}

// const response = await callStringOutputParser()
// console.log(response)

async function callListOutputParser() {
    const prompt = ChatPromptTemplate.fromTemplate(
        'Provide 5 synonyms, separated by commas, for the word {word}'
    )

    const outputParser = new CommaSeparatedListOutputParser()

    const chain = prompt.pipe(model).pipe(outputParser)

    return await chain.invoke({
        word: 'happy',
    })
}

// const response2 = await callListOutputParser()
// console.log(response2)

// structured output parser
async function callStructuredOutputParser() {
    const prompt = ChatPromptTemplate.fromTemplate(
        `Extract information from the following phrase.
         Formatting instructions: {format_instructions}
         Phrase: {phrase}`
    )

    const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
        name: 'the name of the person',
        age: 'the age of the person',
    })

    const chain = prompt.pipe(model).pipe(outputParser)

    return await chain.invoke({
        phrase: 'Serhii is 30 years old',
        format_instructions: outputParser.getFormatInstructions(),
    })
}

// const response3 = await callStructuredOutputParser()
// console.log(response3)

async function callZodOutputParser() {
    const prompt =
        ChatPromptTemplate.fromTemplate(`Extract information from the following phrase.
      Formatting instructions: {format_instructions}
      Phrase: {phrase}`)

    const outputParser = StructuredOutputParser.fromZodSchema(
        z.object({
            recipe: z.string().describe('the name of the recipe'),
            ingredients: z
                .array(z.string())
                .describe('the ingredients of the recipe'),
        })
    )

    const chain = prompt.pipe(model).pipe(outputParser)

    return await chain.invoke({
        phrase: 'The ingredients for a Spaghetti Carbonara are eggs, bacon, and cheese',
        format_instructions: outputParser.getFormatInstructions(),
    })
}

const response = await callZodOutputParser()
console.log(response)
