import { Configuration, OpenAIApi } from 'openai';
import FormSection from './FormSection';
import AnswerSection from './AnswerSection';
import AiGenerated from './AIgenerated';
import "./modal.css";
import { useSelector } from 'react-redux'
import { useState } from 'react';


const App = ({ message }) => {
	const configuration = new Configuration({
		apiKey: process.env.REACT_APP_API_KEY,
	});
	const openai = new OpenAIApi(configuration);
	const dataStore = useSelector(state => state.dataStore)
	const role = dataStore.personalInfo.Role

	// Retrieve 3 latest jobs from datastore,
	let job1 = ''
	if (dataStore.workEx[0]) {
		job1 = dataStore.workEx[0].title
	}
	let job2 = ''
	if (dataStore.workEx[1]) {
		job2 = dataStore.workEx[1].title
	}
	let job3 = ''
	if (dataStore.workEx[2]) {
		job3 = dataStore.workEx[2].title
	}

	const [storedValues, setStoredValues] = useState([]);
	const [tags, setTags] = useState([]);

	// Clear the stored messages
	const clearResponse = () => {
		setStoredValues([])
		setTags([])
	};

	const generateTags = async (prompt) => {
		toggleLoading(true)
		const tag = prompt["message"]
		let options = {
			model: 'text-davinci-003',
			temperature: 0,
			max_tokens: 2000,
			top_p: 1,
			frequency_penalty: 1.5,
			presence_penalty: 0.0,
			prompt: tag,
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
		toggleLoading(false)
	}
	// Toggle popup loading bar when searching
	const toggleLoading = (state) => {
		const loadingBar = document.getElementById("gpt-loading-bar");
		if (state === true) {
			loadingBar.style.visibility = 'visible'
		} else {
			loadingBar.style.visibility = 'hidden'
		}
	}

	const generateResponse = async (newQuestion, setNewQuestion) => {
		var promptvar = newQuestion
		toggleLoading(true)
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
			setStoredValues([
				{
					question: newQuestion,
					answer: "Your question was too short!"
				},
				...storedValues,
			]);
			setNewQuestion('')
		}
		else {
			var completeOptions = {
				...options,
				prompt: promptvar,
			}
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
		toggleLoading(false)

	};

	return (
		<div>
			<div className='gtp-form'>
				<FormSection generateResponse={generateResponse} />
			</div>
			<div className='gpt-tag-container'>
				<div className='gpt-tag-container-lt'>
					<button className="gpt-tags" onClick={() => generateTags({ message })}>
						{role}
					</button>
				</div>
				<div className='gpt-tag-container-rt'>
					<button className="gpt-tags" onClick={() => generateTags({ message })}>
						{job1}
					</button>
					<button className="gpt-tags" onClick={() => generateTags({ message })}>
						{job2}
					</button>
					<button className="gpt-tags" onClick={() => generateTags({ message })}>
						{job3}
					</button>
				</div>
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
