import styled from 'styled-components';

export default styled.div.attrs({
  buttonbordersize: '8px',
})`
  color: #ccc;
  float: left;
  font-family: 'Lato', sans-serif;
  height: 430px;
  position: relative;
  width: 400px;

  header {
    background-color: #555;
    float: left;
    font-size: 18px;
    height: 50px;
    line-height: 2.78;
    position: relative;
    text-align: center;
    width: 100%;
  }

  .wrapper {
    height: 100%;
    position: relative;

    &:first-child {
      float: left;
    }

    &:last-child {
      float: right;
    }
  }

  button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    float: left;
    height: 100%;
    padding-left: 15px;
    position: relative;
    transition: background .3s ease;

    &:hover {
      background-color: #666;
    }
  }

  button.left {
    &::before {
      border-bottom: ${props => props.buttonbordersize} solid transparent;
      border-right: ${props => props.buttonbordersize} solid #888;
      border-top: ${props => props.buttonbordersize} solid transparent;
      content: '';
      display: inline-block;
      height: 0;
      margin-right: 10px;
      vertical-align: middle;
      width: 0;
    }
  }

  button.right {
    &::before {
      border-bottom: ${props => props.buttonbordersize} solid transparent;
      border-left: ${props => props.buttonbordersize} solid #888;
      border-top: ${props => props.buttonbordersize} solid transparent;
      content: '';
      display: inline-block;
      height: 0;
      margin-right: 10px;
      vertical-align: middle;
      width: 0;
    }
  }

  .week {
    float: left;
    width: 100%;
  }

  .weekday {
    background-color: #444;
    float: left;
    height: 40px;
    line-height: 2.5;
    text-align: center;
    width: 14.28%;
  }

  .day {
    background-color: #444;
    box-sizing: border-box;
    float: left;
    font-weight: 300;
    height: 50px;
    padding: 10px 0;
    position: relative;
    text-align: center;
    transition: background .2s ease;
    width: 14.28%;
    z-index: 999;
  }

  .soft {
    color: #565656;
  }

  .holiday {
    color: #d63636;
    cursor: pointer;

    &:hover {
      background-color: #333;
    }
  }

  .name {
    background-color: #a75c5c;
    box-sizing: border-box;
    float: left;
    margin-top: -40px;
    padding: 10px;
    position: relative;
    text-align: center;
    transition: margin .3s ease;
    width: 100%;
    z-index: 0;
  }

  .show {
    margin-top: 0;
  }
`;
