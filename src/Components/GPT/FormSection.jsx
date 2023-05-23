import { useState } from 'react';
import { AiOutlineSearch} from 'react-icons/ai'

const FormSection = ({ generateResponse }) => {
    const [newQuestion, setNewQuestion] = useState('');
    return (
        <div className="form-section">
            <div className='gpt-loading-bar'></div>
            <textarea
                rows="5"
                className="form-control"
                placeholder="Ask me anything...&#10;eg. Personal Summary Examples for a Software Developer"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
            ></textarea>
            
            <button className="search-btn" onClick={() => generateResponse(newQuestion, setNewQuestion)}>
            <AiOutlineSearch/>
            </button>
            
        </div>
    )
}

export default FormSection