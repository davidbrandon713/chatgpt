import { config } from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import readline from 'readline'

// Initialization
config()
process.title = 'ChatGPT'
const model = 'gpt-3.5-turbo'
const colors = {
  red: `\x1b[31m`,
  green: `\x1b[32m`,
  yellow: `\x1b[33m`,
  blue: `\x1b[34m`,
  magenta: `\x1b[35m`,
  cyan: `\x1b[36m`,
  white: `\x1b[37m`,
  default: `\x1b[39m`,

  lightred: `\x1b[91m`,
  lightgreen: `\x1b[92m`,
  lightyellow: `\x1b[93m`,
  lightblue: `\x1b[94m`,
  lightmagenta: `\x1b[95m`,
  lightcyan: `\x1b[96m`,
}
const color = colors.lightcyan

const openai = new OpenAIApi(
	new Configuration({
		apiKey: process.env.API_KEY,
	})
)

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
userInterface.on('line', async (input) => {
	// Put special case inputs here like 'help' or 'version'
  // Clear the shell
	if (input == 'clear') {
		console.clear()
		return beginConversation()
	}

	const res = await openai.createChatCompletion({
		model: model,
		messages: [{ role: 'user', content: input }],
	})
	console.log(`\n>>${color}`, res.data.choices[0].message.content, `\x1b[0m\n`)
	userInterface.prompt()
})
