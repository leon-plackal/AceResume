import React from 'react'
import { FaRegCopy} from 'react-icons/fa'

const AnswerSection = ({ storedValues }) => {
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <div className="answer-container">
                {storedValues.map((value, index) => {
                    return (
                        <div className="answer-section" key={index}>
                            <p className="question">Q: {value.question}</p>
                            <div className="answer">{value.answer}
                                <div
                                    className="copy-icon"
                                    onClick={() => copyText(value.answer)}
                                >
                                    <FaRegCopy/>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default AnswerSection