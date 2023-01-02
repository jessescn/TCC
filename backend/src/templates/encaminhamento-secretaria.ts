import { ActorModel } from 'domain/models/actor'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'

export const getEncaminhamentoSecretariaTemplate = (
  tipoProcedimento: TipoProcedimentoModel,
  autor: ActorModel
) => {
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
    <title>Novo Procedimento Encaminhado</title>
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
      <h2>Novo Procedimento Encaminhado</h2>
      <p>
        Um novo procedimento do tipo ${tipoProcedimento.nome} foi realizado dentro da plataforma do PPGCC/UFCG pelo usuário ${autor.nome}(${autor.email}).
        Os dados preenchidos pelo usuário, separados por formulário, foram
        anexados junto a este email.
      </p>
    </div>
  </body>
</html>`
}
