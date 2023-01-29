#### 1.5 Formulários

Assim como formulários Google, um formulário é um conjunto de campos que devem ser preenchidos pelos usuários ao submeter um novo procedimento. Usuários do tipo _admin_ e _coordenacao_ podem gerenciar os formulários do sistema.

Clicando na opção "Formulários", o usuário tem acesso a lista dos formulários cadastrados, bem como a possibilidade de realizar busca por ID ou nome.

![listagem formulários image](/screenshots/listagem-formularios.png)

Também é possível criar um novo através do botão "Novo Formulário", bem como editar um existente clicando no ícone de lapis > Editar.

![editar formulário image](/screenshots/editar-formulario.png)

Ao acessar a tela de criação/edição, além de poder preencher os campos de nome e descrição, é possivel realizar algumas ações.

##### 1.5.1 Duplicar Formulário

A primeira é duplicação a partir de um formulário existente, clicando em "Duplicar Formulário", é aberto um modal onde é possível selecionar um formulário existente para importar as suas configurações. Uma vez que é realizada a importação, todos os dados atuais são sobrescritos pelo formulário selecionado.

![duplicar formulário image](/screenshots/duplicar-formulario.png)

##### 1.5.2 Exportar PDF

Uma das etapas de um procedimento é o encaminhamento a secretaria, onde é enviado um email contendo informações do procedimento. Também existe a possibilidade de anexar um arquivo pdf contendo informações preenchidas pelo usuário. Para isso, o coordenador pode cadastrar um template ao formulário que será utilizado para a geração desse pdf. No momento de cadastrar o template, o usuário pode vincular com campos presentes no formulário, ou seja, caso ele queira que em certa parte do pdf tenha uma resposta do usuário, como por exemplo, o email do orientador, ele pode referenciar o campo digitando "@" e selecionando o campo desejado.

![template pdf formulário image](/screenshots/template-pdf.png)

##### 1.5.3 Configuração dos Campos

Um dos pontos principais do formulário é exatamente a manipulação dos campos que o compõem. Para isso, o usuário tem acesso a um construtor de campos. Através do menu flutuante no canto direito, o usuário pode adicionar novos campos.

Cada campo possui um **Título** e uma **Descrição**. Dependendo do tipo do campo, as demais informações de cadastro mudam. Os campos suportados hoje no sistema são:

- Resposta
- Parágrafo
- Hora
- Data
- Escolha Múltipla
- Caixa Verificação
- Grelha Múltipla
- Grelha Verificação

É possível também definir se o campo é obrigatório, bem como duplicá-lo ou removê-lo. Para alterar a ordem dos campos, basta segurar o campo com botão esquerdo do mouse e arrastá-lo para a posição desejada.

![campos formulário image](/screenshots/campos-formulario.png)

Por fim, é possível visualizar a prévia do formulário através do menu "Visualizar Prévia".

![prévia formulário image](/screenshots/previa-formulario.png)
