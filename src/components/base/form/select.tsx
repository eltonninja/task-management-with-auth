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
  const classes = 'block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline';

  return (
    <div className={`${className} relative`}>
      <select className={classes} value={value} onChange={onChange} {...others}>
        {options.map(opt => (
          <option key={opt.id} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.943 4.832L10 9.882l4.057-5.05L15.664 6l-5 6-5-6 1.279-1.168z"/>
        </svg>
      </div>
      {error && <Text className='text-xs text-red-600 mt-1'>{error}</Text>}
    </div>
  )
}
