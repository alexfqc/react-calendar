import styled from 'styled-components';

export default styled.header.attrs({
  background: '#ff6347',
  color: '#fff',
})`
  background-color: ${props => props.background};
  float: left;
  position: relative;
  width: 100%;

  ul {
    margin: 0;
  }

  li {
    display: inline-block;
    font-family: 'Lato', sans-serif;
    padding: 10px;
    transition: background .3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, .1);
    }
  }

  a {
    color: ${props => props.color};
    text-decoration: none;
  }
`;
