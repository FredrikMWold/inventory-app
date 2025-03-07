import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Button, Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button as SubmitButton } from '../Button/Button';
import {
    StyledDocumentName,
    StyledFileShapeWrapper,
    StyledFileWrapper,
    StyledIconWrapper,
    StyledTypeWrapper,
    Wrapper,
} from './styles';

const AddPartUpload = () => {
    const { register, setValue } = useFormContext();
    const [files, setFiles] = useState<File[]>();

    const documentationField = register('files');
    const inputFile = useRef<HTMLInputElement | null>(null);

    const handleFileDownload = (file: File) => {
        const downloadLink = document.createElement('a');
        downloadLink.download = `${file.name}`;
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.click();
    };

    const handleFileRemoval = (index: number) => {
        const filesCopy = [...files!];
        filesCopy.splice(index, 1);
        setFiles(filesCopy);
    };

    useEffect(() => {
        setValue('files', files);
    }, [files]);

    return (
        <>
            <Wrapper>
                {files?.map((file, index) => (
                    <StyledFileWrapper key={index}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="121"
                            height="153"
                            viewBox="0 0 121 153"
                            fill="none"
                        >
                            <foreignObject width={121} height={153}>
                                <StyledFileShapeWrapper>
                                    <StyledTypeWrapper>
                                        {file instanceof File ? (
                                            <h3>.{file.type.split('/')[1].toUpperCase()}</h3>
                                        ) : null}
                                    </StyledTypeWrapper>
                                    <StyledIconWrapper>
                                        <Button
                                            sx={{ color: 'black' }}
                                            onClick={() => handleFileDownload(file)}
                                        >
                                            {' '}
                                            <FileDownloadOutlinedIcon fontSize="large" />
                                        </Button>
                                        <Button
                                            sx={{ color: 'black' }}
                                            onClick={() => handleFileRemoval(index)}
                                        >
                                            <DeleteOutlineOutlinedIcon fontSize="large" />
                                        </Button>
                                    </StyledIconWrapper>
                                </StyledFileShapeWrapper>
                            </foreignObject>
                            <path
                                d="M95 1H1V152H120V21.1333M95 1L120 21.1333M95 1V21.1333H120"
                                stroke="black"
                            />
                        </svg>
                        <StyledDocumentName>{file.name.split('.')[0]}</StyledDocumentName>
                    </StyledFileWrapper>
                ))}
            </Wrapper>
            <Container>
                <SubmitButton variant="white" onClick={() => inputFile.current?.click()}>
                    {' '}
                    <input
                        type="file"
                        multiple
                        accept=".pdf,.png,.docx,.jpg"
                        style={{ display: 'none' }}
                        {...documentationField}
                        onChange={(e) => {
                            setFiles([...e.target.files!]);
                        }}
                        ref={(e) => {
                            documentationField.ref(e);
                            inputFile.current = e;
                        }}
                    />
                    UPLOAD NEW
                </SubmitButton>
            </Container>
        </>
    );
};

export default AddPartUpload;
