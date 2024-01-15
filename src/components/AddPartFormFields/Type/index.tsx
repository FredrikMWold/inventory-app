import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { FormOption } from '../../../services/apiTypes.ts';
import { ToolTip } from '../../ToolTip';
import { FormSelect } from '../FormSelect';
import { ErrorP, IconContainer, InputWrap } from './styles';

export const Type = () => {
    const { setValue } = useFormContext();

    const [selectedOption, setSelectedOption] = useState<FormOption | null>(null);

    const options = [
        { value: 'unit', label: 'Unit' },
        { value: 'assembly', label: 'Assembly' },
        { value: 'subassembly', label: 'Subassembly' },
        { value: 'part', label: 'Part' },
    ];

    useEffect(() => {
        setValue('type', selectedOption?.value ?? '');
    }, [selectedOption, setValue]);

    return (
        <>
            <InputWrap>
                <IconContainer>
                    <label htmlFor="type">Choose an item type</label>{' '}
                    <ToolTip content="Specify Unit, or Item (lowest tier)">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </IconContainer>
                <ErrorMessage name="type" render={({ message }) => <ErrorP>{message}</ErrorP>} />
            </InputWrap>
            <FormSelect
                options={options}
                setState={setSelectedOption}
                state={selectedOption}
            ></FormSelect>
        </>
    );
};
