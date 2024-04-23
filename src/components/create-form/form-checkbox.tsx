import { useState } from "react";

interface CheckboxProps {
  label: string;
  id: string;
  description?: string;
  checked: boolean;
}
export function FormCheckbox({label, id, description, checked}: CheckboxProps): JSX.Element {
  const [isChecked, setChecked] = useState(checked);
  return (
    <label htmlFor={id} className="create-form__label create-form__label--checkbox">
      {label}
      <span className="create-form__label-description">{description}</span>
      <input className="create-form__input visually-hidden" type="checkbox" name="put-on-sale" id={id} checked={isChecked} onChange={(() => setChecked(!isChecked))}/>
      <span className="create-form__checkbox"></span>
    </label>
  )
}
