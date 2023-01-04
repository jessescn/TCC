import { merge } from 'lodash'
import {
  Mention as ReactMention,
  MentionProps,
  MentionsInput as ReactMentionInput,
  OnChangeHandlerFunc,
  SuggestionDataItem
} from 'react-mentions'
import defaultStyle from './default-style'

type Mention = {
  trigger: string
  data: SuggestionDataItem[]
  markup?: string
}

type Props = {
  onChange?: OnChangeHandlerFunc
  value?: string
  mentions: Mention[]
  customStyle?: Partial<MentionProps>
  height?: number
}

export default function CustomMentionsInput({
  onChange,
  value,
  mentions,
  customStyle,
  height
}: Props) {
  const mergedStyle = merge({}, defaultStyle, {
    input: {
      overflow: 'auto',
      height: height || 400
    },
    highlighter: {
      boxSizing: 'border-box',
      overflow: 'hidden',
      height: height || 400
    }
  })

  const style = merge({}, mergedStyle, customStyle?.style)

  return (
    <ReactMentionInput style={style} onChange={onChange} value={value}>
      {mentions.map(mention => (
        <ReactMention
          key={mention.trigger}
          trigger={mention.trigger}
          markup={mention.markup}
          data={mention.data}
          style={{
            backgroundColor: '#cee4e5'
          }}
        />
      ))}
    </ReactMentionInput>
  )
}
