import styled from "styled-components"
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
  max-width: 300px;
  background-color: black;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`
export const CardHeader = styled.div`
  display: flex;
  flex-direction: colum;
  min-height: 50px;
  text-align: center;
  justify-content: center;
  color: #fff;
`
export const CardBody = styled.div`
  display: flex;
  flex-direction: colum;
  justify-content;center;
  min-height: 200px;
  max-width: 300px;
`
export const CardFooter = styled.div`
  display: flex;
  flex-direction: colum;
  min-height: 50px;
`
