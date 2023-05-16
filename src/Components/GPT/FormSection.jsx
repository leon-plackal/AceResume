import { useState } from 'react';
import { useSelector } from 'react-redux'

const FormSection = ({ generateResponse }) => {
    const [newQuestion, setNewQuestion] = useState('');
    const dataStore = useSelector(state => state.dataStore)
    var role = dataStore.personalInfo
    
    return (
        <div className="form-section">
            <textarea
                rows="5"
                className="form-control"
                placeholder="Ask me anything...&#10;eg. Personal Summary Examples for a Software Developer"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
            ></textarea>
            <hr className="hr-line" />
            <button className="search-btn" onClick={() => generateResponse(newQuestion, setNewQuestion)}>
                Search
            </button>
            
        </div>
    )
}

export default FormSection