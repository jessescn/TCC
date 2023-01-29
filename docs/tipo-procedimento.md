#### 1.6 Tipo de Procedimento

Um tipo de procedimento representa uma modalidade de procedimento da PPGCC. Homologação de mestrado/doutorado são exemplos de tipos de procedimento. Assim como os formulários, apenas os profiles _admin_ e _coordenacao_ tem acesso a esse recurso.

![listagem tipos procedimentos image](/screenshots/listagem-tipos-procedimentos.png)

Clicando na opção "Tipos de Procedimentos", o usuário tem acesso a lista dos tipos de procedimentos cadastrados, bem como a possibilidade de realizar busca por ID, nome ou status.

Também é possível criar um novo através do botão "Novo Tipo Procedimento". É possível editar um existente, além de alternar o status entre "ativo" e "inativo" acessando o menu através do ícone de lapis.

![editar tipo procedimento image](/screenshots/eidtar-tipo-procedimento.png)

Existem diversas configurações que alteram o fluxo do procedimento criado a partir desse tipo de procedimento.

###### 1.6.1 Colegiado

A opção "Colegiado" define se o procedimento criado deve passar por votação dos membros do colegiado, ou seja, precisa ser aprovado por votação antes de ser encaminhado a secretaria.

###### 1.6.2 Revisão Colegiado

A opção "Revisão Colegiado" define se o procedimento precisa ser revisado por algum membro da coordenação após ser criado, ou seja, procedimentos criados irão direto para votação do colegiado, caso a opção anterior esteja como "Sim" ou mesmo ficarão disponíveis para serem encaminhados no momento de sua criação.

###### 1.6.3 Data Início e Data Fim

As "data início" e "data fim" definem o prazo que o tipo de procedimento ficará disponível para ser preenchido pelos usuários. Estas datas em conjunto com outras configurações explicadas posteriormente definem se um tipo de procedimento fica disponível na opção "Abrir Procedimento" do menu lateral de um usuário.

###### 1.6.4 Status

O "status" define o estado do tipo procedimento após ser criado. Em geral, todos os tipos de procedimentos criados têm status "ativo", caso seja necessário definir que a indisponibilidade provisória por algum fator específico, basta definir o status como "inativo".

###### 1.6.5 Formulários

Os formulários que o usuário irá preencher ao submeter um novo procedimento são definidos no campo "formulários".

###### 1.6.6 Públicos

É possível definir um escopo de quais usuários terão acesso ao tipo de procedimento através do campo "Públicos". Caso, por exemplo, eu queira que apenas os professores possam preencher um tipo de procedimento, basta adicionar um público "professor" nos usuários e adicionar esse público no tipo de procedimento. Apenas usuários que possuam ao menos um dos públicos podem visualizar o tipo de procedimento.
