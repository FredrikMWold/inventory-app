import { useContext } from 'react'
import { FormProvider } from 'react-hook-form'
import { ActionFunctionArgs, redirect, useActionData } from 'react-router-dom'
import ProgressBar from '../../components/progressBar/ProgressBar.tsx'
import UmAppContext from '../../contexts/UmAppContext.tsx'
import apiService from '../../services/api.ts'
import { InputsForm } from './InputsForm.tsx'
import { usePartsForm } from './hooks/useAddPart.tsx'
import { FormContainer, PartForm, SubmitButton } from './styles.ts'

type response = {
    error: string
}

const AddPartFormm = () => {
    const data = useActionData() as response

    const { methods, onSubmit } = usePartsForm()
    const { handleSubmit } = methods

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} id="addPart">
                <ProgressBar progressLevel={4} />
                {data && data.error && <p>{data.error}</p>}
                {/* input list
                <datalist id="types">
                    <option value="Unit" />
                    <option value="Assembly" />
                    <option value="Sub-assembly" />
                    <option value="Part" />
                </datalist> */}
                <InputsForm />
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <button id="addPart" type="submit" form="addPart">
                        Finish
                    </button>
                </div>
            </form>
        </FormProvider>
    )
}

const AddPartForm = () => {
    const data = useActionData() as response

    const { currentUser } = useContext(UmAppContext)
    return (
        <FormContainer>
            <ProgressBar progressLevel={4} />
            <PartForm
                method="post"
                action="/add-part/add-form"
                autoComplete="off"
            >
                {data && data.error && <p>{data.error}</p>}

                <input list="types" name="type" placeholder="Item type" />
                <datalist id="types">
                    <option value="Unit" />
                    <option value="Assembly" />
                    <option value="Sub-assembly" />
                    <option value="Part" />
                </datalist>
                <input type="text" name="desc" placeholder="Item description" />
                <input type="text" name="serial" placeholder="Serial number" />
                <input
                    type="text"
                    name="product"
                    placeholder="Product number"
                />
                <input type="text" name="vendor" placeholder="Vendor" />
                <input type="text" name="comment" placeholder="Comment" />
                <input
                    type="text"
                    name="user"
                    value={currentUser?.id}
                    style={{ display: 'none' }}
                />
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <SubmitButton>Finish</SubmitButton>
                </div>
            </PartForm>
        </FormContainer>
    )
}

export const submitPart = async ({ request }: ActionFunctionArgs) => {
    const data = await request.formData()
    const api = apiService()

    const serialNumber = data.get('serial')
    const productNumber = data.get('product')
    const description = data.get('desc')
    const vendor = data.get('vendor')
    const type = data.get('type')?.toString().toLowerCase()
    const user = data.get('user')

    if (
        !(
            type === 'unit' ||
            type === 'assembly' ||
            type === 'sub-assembly' ||
            type === 'part'
        )
    ) {
        return { error: 'Type must be Unit, Assembly, Sub-assembly or Item' }
    }

    if (serialNumber && productNumber && description && vendor && user) {
        const item = {
            WPId: '45hjgdjg',
            SerialNumber: serialNumber.toString(),
            ProductNumber: productNumber.toString(),
            Type: type,
            Description: description.toString(),
            Vendor: vendor.toString(),
            AddedById: user.toString(),
        }

        await api.addItem(item)

        return redirect('/add-part')
    }
    return { error: 'All fields must be filled out' }
}

export default AddPartForm
