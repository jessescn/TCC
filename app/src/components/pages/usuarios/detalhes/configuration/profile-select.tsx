import { Box, Text } from '@chakra-ui/react'
import { SelectOption, MultipleSelect } from 'components/atoms/multiple-select'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { selectors, useSelector } from 'store'

export default function ProfileSelect() {
  const { watch, setValue } = useFormContext()
  const profile = watch('permissoes')

  const existentProfiles = useSelector(selectors.userDetalhes.getProfiles)

  const profileOptions: SelectOption[] = useMemo(() => {
    return existentProfiles.map(profile => ({
      value: profile.id,
      label: profile.nome
    }))
  }, [existentProfiles])

  const getSelectedOption = () => {
    return profileOptions.find(option => option.value === profile)
  }

  const handleOnChangeProfile = (newValue: any) => {
    setValue('permissoes', newValue)
  }

  return (
    <Box>
      <Text fontSize="sm" fontWeight="bold">
        Profile
      </Text>
      <Text fontSize="xs" my="0.5rem">
        Selecione o profile do usuário. Alterações do profile resultam em
        mudanças nas permissões do usuário na plataforma.
      </Text>
      <MultipleSelect
        value={getSelectedOption()}
        options={profileOptions}
        onChange={e => handleOnChangeProfile(e?.value)}
      />
    </Box>
  )
}
