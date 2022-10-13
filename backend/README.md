Simple backend boilerplate from node projects with typescript

Dependencies

- [Typescript](https://www.typescriptlang.org/)
- [prettier](https://prettier.io/)
- [eslint](https://eslint.org/)

## Implementar um novo recurso

Grande parte dos recursos estão seguindo o mesmo padrão, ou seja, a implementacão de um novo segue alguns passos bem definidos. Todos os recursos
citados abaixo que forem implementados devem possuir testes com 100% de coverage seguindo o padrão dos testes já existentes.

### 1.Models

Caso seja uma nova entidade no sistema, a primeira coisa a ser feita é modelar quais campos ela possui. Para isso deve ser criado
um novo modelo em **/domain/models**. Caso Exista alguma relacão com outra entidade, a declaracão deve ser feita nesse mesmo arquivo.

### 2.Repository

Caso seja uma nova entidade no sistema, deve ser criado um novo repositório que implementa a interface IRepository. O repositório deve
ser criado em **/repositories/sequelize/**. Além disso, deve ser criado uma factory para esse repositório em **/factories/repositories/**
seguindo o formato das outras factories.

Caso seja um novo recurso em uma entidade existente. Verificar se os métodos que já existem não satisfazem, por exemplo, caso queira buscar
um _profile_ pelo nome, ao invés de implementar um novo método que busca pelo nome, basta utilizar o findAll passando nome na query.

### 3.Service

Da mesma forma dos passos acima, sendo uma nova entidade deve ser criado um novo arquivo em **/services/**. Dentro desse arquivo deve ser implementado
uma interface que extende do IService com o nome do novo servico (essa interface vai ser utilizada nos controllers para declarar os servicos consumidos e evitar
ficar atrelado a tipagem da implementacão). Além da interface, deve ser desenvolvida uma classe que implementa tal interface.

Atentar para as dependências do servico, todos os repositórios/servicos que ele consome devem ser declarados no construtor. De forma nenhuma ele deve possuir
ligacão com alguma camada acima.

Deve ser criada uma factory em **/factories/services** caso seja um novo servico.

### 4.Controllers

Para separar as responsabilidades e simplificar a implementacão de testes, deve ser criado uma classe para cada recurso. Caso seja relacionado a um recurso novo,
os arquivos devem ser criados dentro **/controllers/nome_do_recurso/**. Caso seja relacionado a um recurso já existente, deve ser criado dentro da pasta referente. Todo novo controller
deve extender a classe abstrata _Controller_ passando a tipagem do servico que ele consome.

Se atentar de consumir, sempre que possível, apenas de recursos das camadas logo abaixo dele, ou seja, importar recursos apenas dos servicos.

Deve ser criada uma factory em **/factories/controllers** caso seja um novo servico. Se atentar de instanciar um objeto da classe do recurso criado dentro do arquvivo **index.ts** dentro
da respectiva factory.
