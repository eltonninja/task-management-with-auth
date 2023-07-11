import { SelectHTMLAttributes } from 'react';
import { StyledProps } from '@/types';
import { Text } from './text';

export type SelectOption = {
  id: number;
  label: string;
  value: string;
}

export type SelectProps = StyledProps & SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  onChange: (value: string) => void;
  error?: string;
}
export const Select = ({ className, options, value, error, onChange, ...others }: SelectProps) => {
  const classes = 'px-1.5 py-1 rounded w-full';

  return (
    <div className={className}>
      <select className={classes} value={value} onChange={onChange} {...others}>
        {options.map(opt => (
          <option key={opt.id} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {error && <Text className='text-xs text-red-600 mt-1'>{error}</Text>}
    </div>
  )
}
