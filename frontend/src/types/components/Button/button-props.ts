export interface ButtonProps
 extends React.ButtonHTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large' | 'full';
  color?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}