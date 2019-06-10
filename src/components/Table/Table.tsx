import * as React from 'react'
import { InjectedProps, withTheme } from '../../hocs/withTheme'
import styled from 'styled-components'

export type TableSize = 's' | 'm' | 'l'
export const tableSizes = {
  s: 's',
  m: 'm',
  l: 'l',
} as const

export type TableContextValue = {
  size: TableSize
  disabled: boolean
}

export type TableGroup = 'head' | 'body' // | 'footer'

export type TableGroupContextValue = {
  group: TableGroup
}

export const TableGroupContext = React.createContext<TableGroupContextValue>({
  group: 'body',
})

export const TableContext = React.createContext<TableContextValue>({
  size: tableSizes.m,
  disabled: false,
})

export type Props = {
  disabled?: boolean
  size?: TableSize
  children?: React.ReactNode
}

type MergedComponentProps = Props & InjectedProps

const Table: React.FC<MergedComponentProps> = ({
  disabled = false,
  size = tableSizes.m,
  ...props
}) => {
  return (
    <TableContext.Provider value={{ disabled: disabled, size: size }}>
      <Wrapper {...props}>{props.children}</Wrapper>
    </TableContext.Provider>
  )
}

const Wrapper = styled.table`
  ${({ theme }: InjectedProps) => `
    border-radius: ${theme.frame.border.radius.m};
    border: ${theme.frame.border.default};
    border-collapse: collapse;
    border-spacing: 0;
`}
`

export default withTheme(Table)