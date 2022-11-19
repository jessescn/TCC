import { Box, Text } from '@chakra-ui/react'
import MultipleSelect from 'components/atoms/multiple-select'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { selectors, useSelector } from 'store'

type Option = {
  value: any
  label: string
}

export const ProfileSelect = () => {
  const { watch, setValue } = useFormContext()
  const profileId = watch('permissoes')

  const existentProfiles = useSelector(selectors.userDetalhes.getProfiles)

  const profileOptions: Option[] = useMemo(() => {
    return existentProfiles.map(profile => ({
      value: profile.id,
      label: profile.nome
    }))
  }, [existentProfiles])

  const getSelectedOption = () => {
    return profileOptions.find(option => option.value === profileId)
  }

  const handleOnChangeProfile = (newValue: any) => {
    setValue('permissoes', newValue)
  }

  return (
    <Box>
      <Text fontSize="14px" fontWeight="bold" mb="8px">
        Profile
      </Text>
      <Text fontSize="10px" my="8px">
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
