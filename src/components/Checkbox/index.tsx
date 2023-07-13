import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import { Container } from './styles';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  nameLabel: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ nameLabel, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // novo estado para controlar se o checkbox está marcado

  const { fieldName, defaultValue, registerField } = useField(nameLabel);

  const handleCheckboxFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputChange = useCallback(() => {
    setIsChecked(inputRef.current?.checked || false); // atualiza o estado isChecked com o valor atual do checkbox
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked', // atualiza o path para 'checked' em vez de 'value'
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      <label>
        <input
          type="checkbox"
          onFocus={handleCheckboxFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange} // adiciona o evento onChange para atualizar o estado isChecked
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
        {nameLabel}
      </label>
    </Container>
  );
};

export default Checkbox;


