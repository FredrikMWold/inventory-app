import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const StyledInfoDiv = styled.div`
    background-color: ${COLORS.white};
    border-radius: 8px;

    padding: 2rem;
    box-shadow: 2.5px 2.5px gray;
`

export const Lists = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    grid-auto-rows: auto;

    border-radius: 5px;
`

export const CompactLists = styled.div`
    border-radius: 5px;
    display: flex;
    justify-content: start;
    flex-direction: column;
    margin-inline: auto;
    width: 100%;
`

export const Title = styled.h1`
    font-weight: 600;
    color: grey;
    letter-spacing: 0.3rem;
    display: inline;
    font-size: 1.2rem;
`
