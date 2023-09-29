import React from 'react'
import styled from 'styled-components'

export default () => (
    <Container>
        <Title></Title>
        <TabOne>
            <form>

                <label>
                    Nombre
                    <input style={{ display: 'flex', padding: '5px', margin: '5px', borderRadius: '10px', paddingTop: '5px', paddingBottom: '5px', border: '1px solid #333', alignItems: 'end', marginTop: '10px', marginBottom: '25px' }} type="text" name="Hola" /**value="Submit"*/ />
                    Lorem
                    <input style={{ display: 'flex', padding: '5px', margin: '5px', borderRadius: '10px', paddingTop: '5px', paddingBottom: '5px', border: '1px solid #333', alignItems: 'end', marginTop: '10px', marginBottom: '25px' }} type="text" name="Hola" /**name="name"*/ />
                    Inpsum
                    <input style={{ display: 'flex', padding: '5px', margin: '5px', borderRadius: '10px', paddingTop: '5px', paddingBottom: '5px', border: '1px solid #333', alignItems: 'end', marginTop: '10px', marginBottom: '25px' }} type="text" name="Hola" /**value="Submit"*/ />
                    Dolor
                    <input style={{ display: 'flex', padding: '5px', margin: '5px', borderRadius: '10px', paddingTop: '5px', paddingBottom: '5px', border: '1px solid #333', alignItems: 'end', marginTop: '10px', marginBottom: '25px' }} type="text" name="Hola" /**value="Submit"*/ />

                </label>

            </form>
        </TabOne>
    </Container>

)

const TabOne = styled.div`

`

const Container = styled.div`
    flex-wrap: wrap;
`
const Title = styled.div`

`