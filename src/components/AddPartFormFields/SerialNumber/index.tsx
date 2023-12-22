import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa'
import { ToolTip } from '../../ToolTip'
import { ErrorP, IconContainer, InputWrap, StyledInput } from './styles'

export const SerialNumber = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <div style={{ marginTop: '24px' }}>
            <InputWrap>
                <IconContainer>
                    <label htmlFor="Serial number">Serial number </label>{' '}
                    <ToolTip content="If left empty, a unique WP S/N will be generated">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </IconContainer>
                <ErrorMessage
                    name="serialNumber"
                    render={({ message }) => <ErrorP>{message}</ErrorP>}
                />{' '}
            </InputWrap>
            <StyledInput
                type="text"
                placeholder="E.g 1-12-2023.1.2"
                {...register('serialNumber')}
            />
        </div>
    )
}
