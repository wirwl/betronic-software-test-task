import React from 'react';
import './Button.scss';
import block from 'bem-cn';
import { getTheme } from '../../theme';

const b = block('button');

export default function Button(props) {
  const {
    type = "button",
    link,
    onClick,
    isDisabled = false,
    theme
  } = props;

  const themeClass = getTheme(theme);
  const classes = b({ disabled: isDisabled, theme: themeClass });
  const href = isDisabled ? undefined : link;

  return (
    link ?
      <a
        className={classes}
        href={href}
        onClick={onClick}>
        {props.text}
      </a>
      :
      <button
        className={classes}
        type={type}
        disabled={isDisabled}
        onClick={onClick}>
        {props.text}
      </button>
  );
}