import { formatISODate } from 'utils/format'

type Props = {
  previousStatus?: string
  currentStatus: string
  date?: string
  url: string
  procedimentoId: number
}

export const getUpdateStatusTemplate = ({
  url,
  previousStatus,
  currentStatus,
  date,
  procedimentoId
}: Props) => {
  const dateText = date ? `às ${formatISODate(date)}` : ''
  const isFirstStatusUpdate = !previousStatus
  const firstStatusText = `
  <p>
    O procedimento de número ${procedimentoId} sofreu atualização ${dateText}. O procedimento passou a ter status
    <span class="after">${currentStatus}</span>. Para mais detalhes sobre ações a
    serem tomadas, acesse a plataforma clicando no botão abaixo.
  </p>
  `
  const transitionStatusText = `
  <p>
    O procedimento de número ${procedimentoId} sofreu atualização ${dateText}. O
    status passou de
    <span class="before">${previousStatus}</span> para
    <span class="after">${currentStatus}</span>. Para mais detalhes sobre ações a
    serem tomadas, acesse a plataforma clicandon no botão abaixo.
  </p>
  `

  const content = isFirstStatusUpdate ? firstStatusText : transitionStatusText

  return `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <title>Alterar Senha</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
      body {
        font-family: 'Roboto', sans-serif;
        color: #333333;
      }

      p {
        font-size: 14px;
        margin: 24px 0;
      }

      #container {
        width: 500px;
        margin: 0 auto;
        text-align: center;
      }

      a.nostyle:link {
        text-decoration: inherit;
        color: inherit;
        cursor: auto;
      }

      a.nostyle:visited {
        text-decoration: inherit;
        color: inherit;
        cursor: auto;
      }

      a {
        padding: 8px 16px;
        font-size: 18px;
        color: white !important;
        background-color: #31498f;
        border-radius: 4px;
        cursor: pointer !important;
      }

      img {
        width: 200px;
      }

      .hidden {
        color: #bcbcbc;
      }

      .divider {
        width: 100%;
        height: 1px;
        background-color: #bcbcbc;
        margin-top: 28px;
      }

      strong {
        color: #31498f;
        font-weight: bold;
      }

      span {
        font-weight: bold;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <div id="container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UfcgBrasao.jpg/1200px-UfcgBrasao.jpg"
        alt="logo UFCG"
      />
      <h2>Atualização de Status</h2>
      ${content}
      <a href="${url}" class="nostyle">Acessar plataforma</a>
    </div>
  </body>
</html>
`
}
