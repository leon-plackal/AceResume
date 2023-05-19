import { Configuration, OpenAIApi } from 'openai';
import FormSection from './FormSection';
import AnswerSection from './AnswerSection';
import AiGenerated from './AIgenerated';
import "./modal.css";
import { useSelector } from 'react-redux'

import { useState } from 'react';

const App = ({ message, workDetails }) => {
	const configuration = new Configuration({
		apiKey: "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",
	});
	const openai = new OpenAIApi(configuration);
	const dataStore = useSelector(state => state.dataStore)
	var role = dataStore.personalInfo.Role

	const [storedValues, setStoredValues] = useState([]);
	const [tags, setTags] = useState([]);
	const [expRec, setExpRec] = useState([])
	const clearResponse = () => {
		setStoredValues([])
		setTags([])
	};

	const generateAIAnswer = async (workDetails)=>{
		// some code…
		
	   }

	const generateTags = async (prompt) => {
		setTags([])
		const tg = prompt["message"]
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
					answer: response.data.choices[0].text.trim(),
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
		let completeOptions = {
			...options,
			prompt: promptvar,
		};

		const response = await openai.createCompletion(completeOptions);

		if (response.data.choices) {
			setStoredValues([
				{
					question: newQuestion,
					answer: response.data.choices[0].text.trim(),
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
			{storedValues.length > 0 && <AnswerSection storedValues={storedValues} />}
			<AiGenerated storedValues={tags} />
			<button className="clear-btn mt-1" onClick={() => clearResponse()}>
				Clear
			</button>

		</div>
	);
};

export default App;
