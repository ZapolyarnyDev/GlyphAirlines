import type { FlexProps } from "../../../types/layout/Flex/flex-props"


export const Flex = <T extends React.ElementType = 'div'>({
  children,
  as,
  align = 'start',
  justify = 'start',
  wrap = 'nowrap',
  gap = 0,
  direction = 'row',
  ...props
}: FlexProps<T>) => {
  const Component = as || 'div';
  return (
    <Component
      {...props}
      style={{
        display: 'flex',
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        flexDirection: direction,
        gap,
      }}
    >
      {children}
    </Component>
  )
}