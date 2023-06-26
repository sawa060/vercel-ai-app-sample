import React, {InputHTMLAttributes} from 'react';
import deepmerge from 'deepmerge';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const baseProps: InputHTMLAttributes<HTMLInputElement> = {
  className:
    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
  type: 'text',
};

export const BaseInput = ({...props}: InputProps): JSX.Element => {
  const mergedProps = deepmerge(baseProps, props);

  return <input {...mergedProps} />;
};
