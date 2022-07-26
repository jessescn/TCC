import { CampoFormulario } from 'domain/models/formulario'

export type BaseBuildFieldProps = {
  campo: CampoFormulario
  onUpdate: (campo: CampoFormulario) => void
}
