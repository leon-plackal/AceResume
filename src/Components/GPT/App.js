import { Configuration, OpenAIApi } from 'openai';
import FormSection from './FormSection';
import AnswerSection from './AnswerSection';

import { useState } from 'react';

const App = () => {
	const configuration = new Configuration({
		apiKey: "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",
	});
	// console.log()
	const openai = new OpenAIApi(configuration);

	const [storedValues, setStoredValues] = useState([]);
	const clearResponse = () => {
        setStoredValues([])
    }

	const generateResponse = async (newQuestion, setNewQuestion) => {
		let options = {
			model: 'text-davinci-003',
			temperature: 0,
			max_tokens: 2000,
			top_p: 1,
			frequency_penalty: 0.5,
			presence_penalty: 0.0,
			stop: ['/'],
		};

		let completeOptions = {
			...options,
			prompt: newQuestion,
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
			<div className="header-section">
				{storedValues.length < 1 && (
					<p>
						AI Assisted Autocompletion
					</p>
				)}
			</div>

			<FormSection generateResponse={generateResponse} />

			{storedValues.length > 0 && <AnswerSection storedValues={storedValues} />}
			<button className="submit-btn mt-1" onClick={() => clearResponse()}>
                Clear
            </button>
		</div>
	);
};

export default App;
