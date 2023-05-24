import { Configuration, OpenAIApi } from 'openai';
import FormSection from './FormSection';
import AnswerSection from './AnswerSection';
import AiGenerated from './AIgenerated';
import "./modal.css";
import { useSelector } from 'react-redux'
import { useState } from 'react';


const App = ({ message, index }) => {
	const configuration = new Configuration({
		apiKey: process.env.REACT_APP_API_KEY,
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

	const generateJobPoints = async (index)=>{

		const activeJobTitle = dataStore.workEx[index["index"]["index"]].title
	   }

	const generateTags = async (prompt) => {
		setTags([])
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
		
	}
	const toggleLoading = (state) => {
		var loadingBar = document.getElementById("gpt-loading-bar");
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
		toggleLoading(false)

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
			{/* <button className="clear-btn mt-1" onClick={() => generateJobPoints({index})}>
				Job
			</button> */}

		</div>
	);
};

export default App;
