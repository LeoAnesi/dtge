import React, { ChangeEvent } from 'react';
import Input from 'components/Input';
import { Label, Error, Row } from './InputRow.style';

interface Props {
  label?: string | null;
  error?: string | null;
  type: string;
  disabled?: boolean;
  placeholder?: string;
  field: {
    name?: string;
    onBlur?: () => void;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => void;
    value?: string;
  };
  className?: string;
}

const InputRow: React.FunctionComponent<Props> = props => {
  const { error, field, label, disabled, type, placeholder, className } = props;
  const hasError = error !== null && error !== undefined;

  const NULLISH_LABEL_VALUES = [null, undefined, ''];
  const hasLabel = !NULLISH_LABEL_VALUES.includes(label);

  return (
    <Row className={className}>
      {hasLabel && <Label>{label}</Label>}
      <Input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        hasError={hasError}
        {...field}
      />
      {hasError && <Error>{error}</Error>}
    </Row>
  );
};

export default InputRow;
