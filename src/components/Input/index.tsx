import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

import { useAuth } from '../../hooks/auth';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  defaultValue?: string;
  icon?: React.ComponentType<IconBaseProps>;
}
interface PhoneData {
  phone?: string;
}

const Input: React.FC<InputProps> = ({ name, defaultValue, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { findPhoneCustomer } = useAuth();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleCustomer = useCallback(async (data: PhoneData) => {
    try {
      await findPhoneCustomer({ phone: data.phone });
    } catch (error) {}
  }, [findPhoneCustomer]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, [name, handleCustomer]);

  const validateInput = useCallback(
    (value: string) => {
      if (name === 'name') {
        if (!value) {
          return 'Campo obrigatório';
        }
      } else if (name === 'phone') {
        const phonePattern = /^\d{10}$/;
        if (!value || !phonePattern.test(value)) {
          return 'Telefone inválido. Digite apenas números (10 dígitos)';
        }
      }
      return undefined; // Retorna undefined se o valor for válido
    },
    [name],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
