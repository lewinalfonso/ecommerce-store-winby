/* eslint-disable camelcase */
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { Button, Container, TextAvailable, TextCount, Wrapper } from './styled'

export const AddMoreButton = ({ total, available, changeTotal, loading }) => {
    return <Container>
        <Wrapper>
            <Button onClick={() => (total - 1 > 0 && !loading) && changeTotal(total - 1)}>-</Button>
            <TextCount>
                {loading
                    ? <FontAwesomeIcon icon={faSpinner} size='sm' color='#575757' />
                    : total}
            </TextCount>
            <Button onClick={() => (total + 1 <= available && !loading) && changeTotal(total + 1)}>+</Button>
        </Wrapper>
        <TextAvailable>{available} disponibles</TextAvailable>
    </Container>
}