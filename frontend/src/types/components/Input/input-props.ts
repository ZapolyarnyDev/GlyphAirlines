export interface InputProps
 extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'date';
  inputSize?: 'small' | 'medium' | 'large' | 'full';
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  icon?: React.ReactNode;
}