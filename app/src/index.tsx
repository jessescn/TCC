import '@fontsource/inter'
import PageWrapper from 'components/template/page-wrapper'
import { createRoot } from 'react-dom/client'
import Routes from './routes'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <PageWrapper>
    <Routes />
  </PageWrapper>
)
