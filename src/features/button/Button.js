import React from 'react';
import './Button.scss';
import block from 'bem-cn';
import { getTheme } from '../../theme';
import { Link } from 'react-router-dom';

const b = block('button');

export default function Button(props) {
  const {    
    link,
    onClick,
    isDisabled = false,
    theme,
    isSubmitButton = false
  } = props;

  const themeClass = getTheme(theme);
  const classes = b({ disabled: isDisabled, theme: themeClass });
  const href = link;

  return (
    isSubmitButton || isDisabled ?
      <button
        className={classes}        
        disabled={isDisabled}
        onClick={onClick}>
        {props.text}
      </button> :    
      <Link
        className={classes}
        to={href}
        onClick={onClick}>
        {props.text}
      </Link>      
  );
}