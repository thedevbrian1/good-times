import { useState } from 'react'
import ProgressBar from './ProgressBar';
import TaskSuccessful from './TaskSuccessful';
import UploadForm from "./UploadForm";

export default function AddContent({ title, items, submitted, setSubmitted, submitPath, successText }) {
    const [uploading, setUploading] = useState(false);
    // const [submitted, setSubmitted] = useState(false);
    const [percent, setPercent] = useState(0);
    return (
        <div>
            <h2>{title}</h2>
            <UploadForm
                items={items}
                submitPath={submitPath}
                uploading={uploading}
                setUploading={setUploading}
                submitted={submitted}
                setSubmitted={setSubmitted}
                percent={percent}
                setPercent={setPercent}
            />
            <div className='flex flex-col items-start'>
                <div className='mt-3'>
                    {
                        uploading && (
                            <ProgressBar percent={percent} />
                        )
                    }
                </div>
                <div className='mt-2'>
                    {
                        submitted && (
                            <TaskSuccessful text={successText} />
                        )
                    }
                </div>
                
            </div>
        </div>
    )
}