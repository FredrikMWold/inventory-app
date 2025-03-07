import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Container, Button as MuiButton } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AddDocument, Document, Item } from '../../../services/apiTypes';
import { useDeleteDocument } from '../../../services/hooks/documents/useDeleteDocument';
import { useGetDocumentsByItemId } from '../../../services/hooks/documents/useGetDocumentsByItemId';
import { useUploadDocument } from '../../../services/hooks/documents/useUploadDocument';

import { Button } from '../../Button/Button';
import {
    StyledDocumentName,
    StyledFileShapeWrapper,
    StyledFileTypeWrapper,
    StyledFileWrapper,
    StyledIconWrapper,
    Wrapper,
} from './styles';

type UploadProps = {
    item: Item;
};

const UploadMobile = ({ item }: UploadProps) => {
    const { data } = useGetDocumentsByItemId(item.id);
    const { mutate: uploadDocument } = useUploadDocument();
    const { mutate: deleteDocument } = useDeleteDocument(item.id);
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [showArrow, setShowArrow] = useState(true);

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const document: AddDocument = {
                itemId: item.id,
                files: [...e.target.files],
            };
            uploadDocument(document);
        }
    };

    const handleFileDownload = (file: Document) => {
        const downloadLink = document.createElement('a');
        downloadLink.download = `${file.name}`;
        downloadLink.href = `data:${file.contentType};base64,${file.bytes}`;
        downloadLink.click();
    };

    const handleFileDelete = (documentId: string) => {
        deleteDocument(documentId);
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.className = 'visible';
            } else {
                entry.target.className = 'hidden';
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersect, {
        threshold: 0.5,
    });

    useEffect(() => {
        const files = document.getElementsByClassName('files');
        if (files.length !== 0) {
            for (const element of files) {
                observer.observe(element);
            }
        }

        return () => {
            if (files.length !== 0) {
                for (const element of files) {
                    observer.observe(element);
                }
            }
        };
    }, [data]);

    return (
        <>
            <Wrapper onTouchMove={() => setShowArrow(false)}>
                {data?.map((document) => (
                    <StyledFileWrapper key={document.id} className="files">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="121"
                            height="153"
                            viewBox="0 0 121 153"
                            fill="none"
                        >
                            <foreignObject width={121} height={153}>
                                <StyledFileShapeWrapper>
                                    <StyledFileTypeWrapper>
                                        <h3>.{document.contentType.split('/')[1].toUpperCase()}</h3>
                                    </StyledFileTypeWrapper>
                                    <StyledIconWrapper>
                                        <MuiButton
                                            onClick={() => handleFileDownload(document)}
                                            sx={{ color: 'black' }}
                                        >
                                            <FileDownloadOutlinedIcon fontSize="large" />
                                        </MuiButton>
                                        <MuiButton
                                            onClick={() => handleFileDelete(document.id)}
                                            sx={{ color: 'black' }}
                                        >
                                            <DeleteOutlineOutlinedIcon fontSize="large" />
                                        </MuiButton>
                                    </StyledIconWrapper>
                                </StyledFileShapeWrapper>
                            </foreignObject>
                            <path
                                d="M95 1H1V152H120V21.1333M95 1L120 21.1333M95 1V21.1333H120"
                                stroke="black"
                            />
                        </svg>
                        <StyledDocumentName>{document.name.split('.')[0]}</StyledDocumentName>
                    </StyledFileWrapper>
                ))}
                {showArrow === true && (data?.length ?? 0) > 2 && (
                    <ArrowCircleRightOutlinedIcon
                        fontSize="large"
                        sx={{ position: 'sticky', top: '75px', right: '-10px' }}
                    />
                )}
            </Wrapper>
            <Container>
                <Button variant="white" onClick={() => inputFile.current?.click()}>
                    {' '}
                    <input
                        type="file"
                        multiple
                        accept=".pdf,.png,.docx,.jpg"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        ref={inputFile}
                    />
                    UPLOAD NEW
                </Button>
            </Container>
        </>
    );
};

export default UploadMobile;
