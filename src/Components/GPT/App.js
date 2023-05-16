import { Configuration, OpenAIApi } from 'openai';
import FormSection from './FormSection';
import AnswerSection from './AnswerSection';
import "./modal.css";
import { useSelector } from 'react-redux'

import { useState } from 'react';

const App = ({ message, location }) => {
	const configuration = new Configuration({
		apiKey: "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",
	});
	const openai = new OpenAIApi(configuration);
	const dataStore = useSelector(state => state.dataStore)
	var role = dataStore.personalInfo.Role

	const [storedValues, setStoredValues] = useState([]);
	const [tags, setTags] = useState([]);
	const clearResponse = () => {
		setStoredValues([])
	}

	const generateTags = async (prompt) => {
		setTags([])
		const tg = prompt["message"]
		const workPrompt = prompt["workExRec"]
		console.log(prompt["workExRec"])
		// const result = tg.slice(1, -1);

		let options = {
			model: 'text-davinci-003',
			temperature: 0,
			max_tokens: 2000,
			top_p: 1,
			frequency_penalty: 1.5,
			presence_penalty: 0.0,
			prompt: tg,
			stop: ['/'],
		};

		const response = await openai.createCompletion(options);

		if (response.data.choices) {
			setTags([
				{
					answer: response.data.choices[0].text,
				},
				...tags
			]);
		}
	}

	const generateResponse = async (newQuestion, setNewQuestion) => {
		var promptvar = newQuestion
		let options = {
			model: 'text-davinci-003',
			temperature: 0,
			max_tokens: 2000,
			top_p: 1,
			frequency_penalty: 1,
			presence_penalty: 0.0,
			stop: ['/'],
		};
		if (newQuestion.length < 10) {
			promptvar = `print the first element of this array = [Your question was too short]`
		} else if (newQuestion === "jojo amogus") {
			promptvar = `print the first element of this array = ["IS THAT A GODDAMN JOJO REFERENCE??!!!?? DOES AI UNDERSTAND A JOJO REFERENCE??!!?? NAHHHHHH"]`
		}
		console.log(promptvar)
		let completeOptions = {
			...options,
			prompt: promptvar,
		};

		const response = await openai.createCompletion(completeOptions);

		if (response.data.choices) {
			setStoredValues([
				{
					question: newQuestion,
					answer: response.data.choices[0].text,
				},
				...storedValues,
			]);
			setNewQuestion('');
		}
	};

	return (
		<div>
			<div className='gtp-form'>
				<FormSection generateResponse={generateResponse} />
			</div>
			<div className='gpt-tag-container'>
				<button className="gpt-tags" onClick={() => generateTags({message})}>
					{role}
				</button>
			</div>

			<div className="header-section">
				{storedValues.length < 1 && (
					<p>
						{/* AI Assisted Autocompletion {message} */}
					</p>
				)}
			</div>

			<AnswerSection storedValues={tags} />
			{storedValues.length > 0 && <AnswerSection storedValues={storedValues} />}
			<button className="clear-btn mt-1" onClick={() => clearResponse()}>
				Clear
			</button>


		</div>
	);
};

export default App;
