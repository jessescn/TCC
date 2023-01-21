import ReactSelect, { GroupBase, Props } from 'react-select'

export type SelectOption = {
  value: any
  label: string
}

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    padding: '0',
    width: '100%',
    height: '100%',
    fontSize: '0.75rem',
    backgroundColor: 'white'
  }),
  option: (styles: any) => {
    return {
      ...styles,
      width: '100%',
      fontSize: '0.75rem'
    }
  }
}

export const MultipleSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: Props<Option, IsMulti, Group>
) => {
  return <ReactSelect styles={customStyles} {...props} />
}
