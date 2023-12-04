import { FormProvider } from 'react-hook-form'
import ProgressBar from '../../../components/progressBar/ProgressBar.tsx'
import { FormContent } from './FormContent.tsx'

import { usePartsForm } from '../hooks/useAddPartForm.tsx'
import { FormContainer } from '../styles.ts'

import { Button } from '../../../components/SubmitButton.tsx'
import { StyledForm } from './styles.ts'

type response = {
    error: string
}

// WIP
export const AddPartFormm = () => {
    const { methods, onSubmit, formState } = usePartsForm()

    return (
        <FormProvider {...methods}>
            <FormContainer>
                <StyledForm onSubmit={onSubmit} id="addPart">
                    <ProgressBar progressLevel={4} />

                    <FormContent />

                    <Button id="addPart" type="submit">
                        Finish
                    </Button>
                </StyledForm>
            </FormContainer>
        </FormProvider>
    )
}
