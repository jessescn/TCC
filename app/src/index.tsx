import '@fontsource/inter'
import React from 'react'
import PageWrapper from 'components/template/page-wrapper'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import ReactDOM from 'react-dom/client'
import Routes from './routes'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <PageWrapper>
      <Routes />
    </PageWrapper>
  </React.StrictMode>
)
