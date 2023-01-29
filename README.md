# PCopin

O PCopin é uma solução voltada para o contexto do programa de pós-graduação do curso de ciência da computação da universidade federal de campina grande (PPGCC/UFCG).

O sistema tem como objetivo a automação de procedimentos da PPGCC através de uma plataforma que oferece diversas funcionalidades que automatizam etapas dos processos.

### 1. Funcionalidades

As seções a seguir explicam com mais detalhes cada funcionalidade do sistema, bem como os tipos de usuários que possuem acesso.

Cada usuário possui um _profile_ vinculado. Existem 5 tipos de profile: _usuario_, _colegiado_, _secretaria_, _coordenacao_ e _admin_.

[1.1 Autenticação](/docs/autenticacao.md)
[1.2 Tela Inicial](/docs/tela-inicial.md)
[1.3 Meus Procedimentos](/docs/meus-procedimentos.md)
[1.4 Abrir Procedimento](/docs/abrir-procedimento.md)
[1.5 Formulários](/docs/formulario.md)
[1.6 Tipo de Procedimentos](/docs/tipo-procedimento.md)
[1.7 Todos os Procedimentos](/docs/todos-procedimentos.md)
[1.8 Homologação](/docs/homologacao.md)
[1.9 Gerenciamento de Usuários](/docs/gerenciamento-usuarios.md)
[1.10 Estatísticas Gerais](/docs/estatisticas-gerais.md)

### 2. Arquitetura

A plataforma da nossa solução segue a estrutura padrão de aplicações web, composto de um Frontend e um Backend. O frontend é responsável pela exibição das informações, além de lidar com as interações do usuário. O backend, por sua vez, fica responsável por toda regra de negócio da aplicação, bem como pela persistência dos dados através da conexão com um banco de dados.
