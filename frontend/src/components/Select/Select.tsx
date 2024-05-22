
import { SelectHTMLAttributes, ComponentPropsWithoutRef, forwardRef } from 'react';


type OptionType = {
  id: string | number | null;
  name: string;
};

type SelectProps<T extends OptionType> = {
  options: T[];
  value: T;
  onChange: (value: T) => void;
} & SelectHTMLAttributes<HTMLSelectElement> & ComponentPropsWithoutRef<'select'>;

const Select = forwardRef<HTMLSelectElement, SelectProps<OptionType>>((props, ref) => {
  const { options, value, onChange } = props;

  return (
    <select
      value={value.id!}
      onChange={(e) => {
        const selectedOption = options.find(
          (option) => option.id!.toString() === e.target.value
        );
        if (selectedOption) {
          onChange(selectedOption);
        }
      }}
      className="block w-full py-3 pl-1 pr-4 border-b border-gray-400 outline-none text-sm text-gray-400"
      ref={ref}
    >
      {options.map((option) => (
        <option key={option.id!.toString()} value={option.id!}>
          {option.name}
        </option>
      ))}
    </select>
  );
});

export default Select;