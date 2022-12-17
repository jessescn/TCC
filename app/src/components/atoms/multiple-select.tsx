import ReactSelect, { GroupBase, Props } from 'react-select'

export type SelectOption = {
  value: any
  label: string
}

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    width: '100%',
    fontSize: '14px',
    backgroundColor: 'white'
  }),
  option: (styles: any) => {
    return {
      ...styles,
      width: '100%',
      fontSize: '12px'
    }
  }
}

function MultipleSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return <ReactSelect styles={customStyles} {...props} />
}

export default MultipleSelect
