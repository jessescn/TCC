export const getEmailVerificationTemplate = (url: string) => `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
      rel="stylesheet"
    />
    <title>Alterar Senha</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
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
        cursor: pointer;
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
    </style>
  </head>
  <body>
    <div id="container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UfcgBrasao.jpg/1200px-UfcgBrasao.jpg"
        alt="logo UFCG"
      />
      <h2>Confirmação de email</h2>
      <p>
        Falta pouco para você ter acesso a plataforma da PPGCUFCG. Para
        confirmar seu email e finalizar o cadastro, basta clicar no botão
        abaixo.
      </p>
      <a href=${url} class="nostyle">Confirmar Email</a>
      <p>O link se expira em 5 minutos</p>
      <div class="divider"></div>
      <p class="hidden">
        Caso você não tenha criado uma conta na nossa plataforma, entre em
        contato com nosso suporte.
      </p>
    </div>
  </body>
</html>
`
