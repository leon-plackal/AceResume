import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import Template1 from '../TemplatesComponents/Template1'
import Template2 from '../TemplatesComponents/Template2'
import Template3 from '../TemplatesComponents/Template3'
import Template4 from '../TemplatesComponents/Template4'
import html2canvas from 'html2canvas'
import NavBar from '../Navigation/Navbar'

function MyResume() {
    const selectedTemplate = useSelector(state => state.dataStore.selectedTemplate)
    const downloadComponentPDF = () => {

        const input = document.getElementById('divToPrint');
        window.devicePixelRatio = 2.5;
        html2canvas(input, { scrollY: -window.scrollY})
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF("p", "px", "a4");
                var ratio = canvas.width / canvas.height;
                var width = pdf.internal.pageSize.getWidth();
                var height = width / ratio;
                pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
                pdf.save("resume.pdf");
            })
    }

    return (
        <div className='background'>
            <div>
                <NavBar></NavBar>
            </div>
            <div className='container'>
                <div className='p-3'>
                    <div className='w-100 d-flex justify-content-center gap-4'>
                        <Link to="/build" style={{ fontSize: '1rem' }}>
                            <button className=''> Go-Back</button>
                        </Link>
                        <button className='' onClick={downloadComponentPDF} >
                            Save Resume
                        </button>
                    </div>
                </div>
                <div className=' w-100  d-flex justify-content-center align-content-center flex-row printdivcont'>

                    <div id='divToPrint' style={{ transform: 'scale(0.9)', position: 'relative', top: '0px' }} >
                        {selectedTemplate === ""
                            ? <div><h1>Please select a template!</h1></div>
                            : selectedTemplate === "Template 1"
                                ? <Template1 />
                                : selectedTemplate === "Template 2"
                                    ? <Template2 />
                                    : selectedTemplate === "Template 3"
                                        ? <Template3 />
                                        : <Template4 />}
                    </div>

                    <div className='export-info'>
                        <h6>Tips:</h6>
                        <p>Remember, the more concise the better. </p>
                        <p>One page resumes are quite mainstream and will retain the employers attention better than many pages of filler information</p>
                        <p>Avoiding spelling mistakes is vital in your resume's integrity!</p>
                        <p>Make sure you remember to list your responsibilities and competence in specific tasks in your work experience</p>
                        <p>Avoid over-using filler words like “that,” “the,” “a,” “an,” or “like.”</p>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default MyResume
