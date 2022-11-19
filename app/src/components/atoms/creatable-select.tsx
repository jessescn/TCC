import BaseCreatableSelect from 'react-select/creatable'
import { GroupBase, Props } from 'react-select'

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

function CreatableSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return <BaseCreatableSelect styles={customStyles} {...props} />
}

export default CreatableSelect
