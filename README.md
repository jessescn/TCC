# SAT - Sistema de Automação de Procedimentos da PPGCC/UFCG

O SAT é uma solução voltada para o contexto do programa de pós-graduação do curso de ciência da computação da universidade federal de campina grande (PPGCC/UFCG).

O sistema tem como objetivo a automação de procedimentos da PPGCC através de uma plataforma que oferece diversas funcionalidades que automatizam etapas dos processos.

### 1. Ambiente de Validação

Através deste [link](https://tcc-two.vercel.app/login) é possível ter acesso a versão de validação do sistema. É aconselhável criar uma conta com email válido e alterar o tipo de usuário utilizando o perfil de coordenação para poder testar a atualização dos dados do procedimento por email. Para ser possível testar as funcionalidades baseadas nos _profiles_ dos usuários, estão disponíveis os seguintes usuários de testes com senha **teste1234**.

- user@teste.com
- coordenacao@teste.com
- colegiado@teste.com
- secretaria@teste.com

Importante avisar que, devido a configuração da máquina que está hospedando o backend, o primeiro acesso ao sistema depois de algum tempo pode demorar alguns segundos.

### 2. Funcionalidades

As seções a seguir explicam com mais detalhes cada funcionalidade do sistema, bem como os tipos de usuários que possuem acesso.

Cada usuário possui um _profile_ vinculado. Existem 5 tipos de profile: _usuario_, _colegiado_, _secretaria_, _coordenacao_ e _admin_.

- [2.1 Autenticação](/docs/autenticacao.md)
- [2.2 Tela Inicial](/docs/tela-inicial.md)
- [2.3 Meus Procedimentos](/docs/meus-procedimentos.md)
- [2.4 Abrir Procedimento](/docs/abrir-procedimento.md)
- [2.5 Formulários](/docs/formulario.md)
- [2.6 Tipo de Procedimentos](/docs/tipo-procedimento.md)
- [2.7 Todos os Procedimentos](/docs/todos-procedimentos.md)
- [2.8 Homologação](/docs/homologacao.md)
- [2.9 Gerenciamento de Usuários](/docs/gerenciamento-usuarios.md)
- [2.10 Estatísticas Gerais](/docs/estatisticas-gerais.md)

### 3. Arquitetura

A plataforma da nossa solução segue a estrutura padrão de aplicações web, composto de um Frontend e um Backend. O frontend é responsável pela exibição das informações, além de lidar com as interações do usuário. O backend, por sua vez, fica responsável por toda regra de negócio da aplicação, bem como pela persistência dos dados através da conexão com um banco de dados.
