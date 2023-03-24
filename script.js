import { config } from 'dotenv'
config()

import { Configuration, OpenAIApi } from 'openai'
import readline from 'readline'

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.API_KEY
}))

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Custom message
const beginConversation = () => {
  console.log('You are now communicating with ChatGPT using gpt-3.5-turbo')
  console.log('Type clear to wipe the log \n')
  userInterface.prompt()
}

beginConversation()
userInterface.on('line', async input => {
  // Put special case inputs here like 'clear' or 'help'
  if (input == 'clear') {
    console.clear()
    return beginConversation()
  }

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  })
  console.log(`\n>>`, res.data.choices[0].message.content, `\n`)
  userInterface.prompt()
})
