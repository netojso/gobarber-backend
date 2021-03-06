# Recuperação de senha
  **RF** //Requisitos funcionais

  - O usuário deve poder recuperar sua senha informando o seu email;
  - O usuário deve receber um email com instruções de recuperaçãp de senha;
  - o usuário deve poder resetar sua senha;

  **RNF** //Requisitos não funcionais

  - Utilizar Mailtrap para testar envios em ambiente de dev;
  - Utilizar Amazon SES para envios em produção;
  - O envio de e-mails deve acontecer em segundo plano (background job)

  **RN** //Regra de negócios

  - O link enviado por email para resetar senha deve expirar em 2h;
  - O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualizar usuário
  **RF** //Requisitos funcionais

  - O usuário deve poder atualizar seu nome, email e senha;

  **RNF** //Requisitos não funcionais (Parte técnica)

  ---------------------

  **RN** //Regra de negócios

  - O usuário não pode alterar seu email para um email já existente;
  - Para atualizar sua senha, o usuário deve informar a senha antiga;
  - Para atualizar a senha, o usuário precisa confirmar a senha nova;

# Painel do prestador
  **RF** //Requisitos funcionais

  - O usuário deve poder listar seus agendamentos de um dia específico;
  - O prestador deve receber uma notificação sempre que houver um novo agendamento;
  - O prestador deve poder visualizar as notificações não lidas;

  **RNF** //Requisitos não funcionais

  - Os agendamentos do prestador no dia deve ser salvo em cache;
  - As notificações do prestador devem ser armazenadas no MongoDB;
  - As notificações do prestador devem ser enviadas em tempo real usando Socket.io;

  **RN** //Regra de negócios

  - A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;


# Agendamento de serviço
  **RF** //Requisitos funcionais

  - O usuário deve poder listar todos prestadires de serviço cadastrados;
  - O usuário deve poder listsr os dias de um mês com pelo menos um horario disponível de um prestador;
  - O usuário deve poder listar horários disponíveis em um dia específico de um prrestador;
  - O usuário deve poder realizar um novo agendamento com um prestador;

  **RNF** //Requisitos não funcionais

  - A listagem de prestadores deve ser armazenada em cache;

  **RN** //Regra de negócios

  - Cada agendamento deve durar 1h exatamente;
  - Os agendamentos devem estar disponíveis entre as 8h - 18h;
  - O usuário não pode agendar em um horário já ocupado;
  - O usuário não pode agendar em um horário qur já passou;
  - O usuário não pode agendar serviços consigo mesmo;
