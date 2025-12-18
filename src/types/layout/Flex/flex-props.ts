export interface FlexProps <T extends React.ElementType = 'div'>
 extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: T;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  direction?: 'column' | 'row' | 'row-reverse' | 'column-reverse';
  gap?: number | string;
}