import styled, { css } from 'styled-components'

export const BoxTitle = styled.div`
  width: 100%;
  height: 50px;
  text-align: left;
  padding: 10px 5%;
  border-bottom: 1px solid #020202;
  height: fit-content;
`
export const BoxSpan = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 10px 20%;
`
export const Aside = styled.aside`
  width: 20%;
  height: 80%;
  display: flex;
  align-items: left;
  padding: 5px;
  flex-wrap: wrap;
  min-width: 300px;
  flex-direction: column;
  @media(max-width: 920px) {
    display: none;
  }
`
export const BoxLeft = styled.div`
  width: 20%;
  height: 80%;
  display: flex;
  align-items: left;
  padding: 5px;
  flex-wrap: wrap;
  min-width: 300px;
  flex-direction: column;
  @media(max-width: 920px) {
    display: none;
  }
`
export const Span = styled.span`
  width:100%;
  text-transform: uppercase;
  padding-top:5px;
  padding-bottom: 5px;
  margin: 6px 0;
  font-family: ${({ fontFamily }) => fontFamily ? fontFamily : 'PFont-Regular'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '13px'};
  
`
export const AsideItemsText = styled.span`
  display: inline-block;
  width:100%;
  padding-top:10px;
  padding-bottom: 10px;
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 15px;
  margin: 6px 0;
  text-transform: uppercase;
  position: relative;
  font-family: ${({ fontFamily }) => fontFamily ? fontFamily : 'PFont-Regular'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '15px'};
  cursor: pointer;

  &:hover{
    background: #cccccc;
    text-decoration-style: solid;
    &::before{
      top:0px;
      height: 100%;
      transition: .14s linear;
    }
  }
  

  &::before{
    content:'';
    height: 0.5rem;
    width: 0.5rem;
    top:15px;
    margin-right: 0.375rem;
    background: red;
    display: block;
    position: absolute;
    left: 0;
  }

`
export const AsideListItem = styled.li`
  display: inline-block;
  width:100%;
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 15px;
  margin: 6px 0;
  text-transform: uppercase;
  position: relative;
  font-family: ${({ fontFamily }) => fontFamily ? fontFamily : 'PFont-Regular'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '15px'};
  cursor: pointer;
  ${({ selected }) => selected && css`background: #ccc;`}

  &::before {
    content:'';
    height: ${({ selected }) => selected ? '100%' : '0.5rem'};
    width: 0.5rem;
    top: ${({ selected }) => selected ? '0' : '15px'};
    margin-right: 0.375rem;
    background: red;
    display: block;
    position: absolute;
    left: 0;
    transition: .14s linear;
  }

  ${({ selected }) => !selected && css`
      &:hover {
        background: #ccc;
        text-decoration-style: solid;
        &::before{
          top: 0px;
          height: 100%;
        }
      }
    `}
`