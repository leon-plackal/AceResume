import React from 'react'

const tagContent = ({ tags }) => {
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <div className="answer-container">
                {tags.map((value, index) => {
                    return (
                        <div className="answer-section" key={index}>
                            <p className="answer">A: {value.answer}</p>
                            <div
                                className="copy-icon"
                                onClick={() => copyText(value.answer)}
                            >
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default tagContent