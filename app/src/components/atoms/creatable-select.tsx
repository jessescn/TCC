import BaseCreatableSelect from 'react-select/creatable'
import { GroupBase, Props } from 'react-select'

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    width: '100%',
    fontSize: '0.875rem',
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

function CreatableSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return <BaseCreatableSelect styles={customStyles} {...props} />
}

export default CreatableSelect
