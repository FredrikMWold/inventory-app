import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../../components/SubmitButton.tsx'
import ProgressBar from '../../../components/progressBar/ProgressBar.tsx'
import { FormContainer, FormRadio } from '../styles.ts'

enum Batch {
    yes,
    no,
    undefined,
}

const BatchForm = () => {
    const [batchType, setBatchType] = useState<Batch>(Batch.undefined)
    const [error, setError] = useState<string>()
    const navigate = useNavigate()

    const handleClick = () => {
        if (batchType === Batch.undefined) {
            setError('One option must be picked')
            return
        }
        navigate('/add-part/checks')
    }

    return (
        <FormContainer>
            <ProgressBar progressLevel={1} />
            <h3>Add as a batch?</h3>
            <span style={{ color: 'red' }}>{error}</span>
            <FormRadio>
                <label>
                    <input
                        type="radio"
                        name="batchCheck"
                        onChange={() => setBatchType(Batch.no)}
                    />{' '}
                    I want to add one unique part
                </label>
                <label>
                    <input
                        type="radio"
                        name="batchCheck"
                        onChange={() => setBatchType(Batch.yes)}
                    />{' '}
                    I want to add a batch of several identical parts, assigning
                    a unique WellPartner serial number to each of them
                </label>
            </FormRadio>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Button onClick={handleClick}>Next</Button>
            </div>
        </FormContainer>
    )
}

export default BatchForm
