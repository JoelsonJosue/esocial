import styled from 'styled-components';

export const RowStyle = styled.div`
  //margin-top: 10px;
  select {
      width: 65% !important;
      margin-bottom: 20px;
  }
  label{
      margin-bottom: 0px !important;
  }
  .labelRadio{
    margin-right: 15px;
    margin-top: 15px;
  }
  .labelRadio input {
    cursor: pointer;
    margin-right: 5px;
  }
  .tab-content{
    border: 1px solid #ddd;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-bottom: 15px;
  }
  .tab-content .tab-pane{
    margin-left: 15px;
  }
  input[type=submit]{
    margin-bottom: 15px;
  }
  .nav {
    border-bottom: hidden !important;
  }
  .log{
    overflow: scroll;
    height: 290px;
  }
  .log p {
    margin-bottom: 0px !important;
  }
`;
