# 🚛 Transportadora Ajofer — Dashboard de Horas Extras

Sistema web desenvolvido para **controle de ponto, horas extras e folha de colaboradores PJ**, com uma interface de dashboard voltada para facilitar o acompanhamento mensal das horas trabalhadas e dos respectivos custos.

O projeto também conta com um módulo de **autenticação**, permitindo login, cadastro de funcionários, recuperação de senha e controle da sessão do usuário.

---

## 📌 Sobre o projeto

O **Dashboard de Horas Extras** foi desenvolvido com o objetivo de centralizar o controle de horas extras dos colaboradores, permitindo registrar lançamentos por dia e semana, calcular automaticamente os valores correspondentes e visualizar os resultados por meio de indicadores e gráficos.

A aplicação possui uma interface inspirada em sistemas administrativos, com foco em organização, praticidade e visualização rápida das informações.

O sistema apresenta a identificação da **Transportadora Ajofer** e a proposta de **Controle de ponto & folha PJ**.

---

## ✨ Principais funcionalidades

### 🔐 Autenticação

- Tela de login;
- Login por usuário e senha;
- Mostrar/ocultar senha;
- Validação dos campos;
- Cadastro de funcionário;
- Validação de senha;
- Confirmação de senha;
- Recuperação de senha;
- Logout;
- Controle de sessão;
- Hash de senha utilizando Web Crypto API;
- Controle dos usuários armazenado no navegador.

### 👥 Cadastro de colaboradores

Permite cadastrar colaboradores que serão utilizados no controle de horas.

Informações principais:

- Nome do colaborador;
- Valor da hora normal;
- Valor da hora para domingo/feriado;
- Identificador interno do colaborador.

### ⏱️ Controle de horas extras

- Cadastro de semanas;
- Registro de horas por colaborador;
- Registro de horas por dia;
- Inclusão de observações;
- Identificação de domingo/feriado;
- Edição de lançamentos;
- Exclusão de lançamentos;
- Filtro por colaborador;
- Cálculo automático das horas;
- Cálculo automático dos custos.

### 📊 Dashboard

O painel principal apresenta indicadores como:

- Total de horas extras do mês;
- Custo total do mês;
- Colaborador com maior quantidade de horas;
- Total de horas em domingos/feriados;
- Quantidade de semanas registradas;
- Quantidade de lançamentos.

### 📈 Gráficos

O sistema apresenta visualizações para facilitar a análise dos dados:

- Horas extras por colaborador;
- Evolução semanal das horas extras.

### 📅 Controle mensal

- Seleção do mês;
- Criação de novos meses;
- Possibilidade de copiar os colaboradores do mês anterior;
- Organização dos lançamentos por período.

### 📑 Exportação e importação

O projeto permite:

- Exportar relatório em **Excel (.xlsx)**;
- Exportar dados em **JSON**;
- Importar dados de um arquivo **JSON**;
- Gerar relatório com resumo geral;
- Gerar uma aba individual por colaborador no Excel.

### 🖼️ Personalização

- Alteração do logotipo da empresa;
- Persistência do logotipo no navegador;
- Interface responsiva;
- Layout adaptado para diferentes tamanhos de tela.

---

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura da aplicação;
- **CSS3** — estilização e layout responsivo;
- **JavaScript** — lógica e interatividade;
- **Web Crypto API** — hash das senhas;
- **LocalStorage** — persistência local dos dados;
- **Chart.js** — criação dos gráficos;
- **SheetJS (XLSX)** — geração de relatórios Excel;
- **Google Fonts** — tipografia da interface.

---

## 🗂️ Estrutura atual

```text
📦 projeto
 └── 📄 index.html
```

Atualmente, a aplicação está concentrada em um único arquivo HTML, contendo estrutura, estilos e scripts JavaScript.

Uma evolução natural do projeto seria separar os arquivos:

```text
📦 transportadora-ajofer
 ├── 📁 assets
 │   ├── 📁 images
 │   └── 📁 icons
 │
 ├── 📁 css
 │   └── style.css
 │
 ├── 📁 js
 │   ├── auth.js
 │   ├── dashboard.js
 │   ├── employees.js
 │   ├── reports.js
 │   └── storage.js
 │
 ├── 📁 database
 │   └── schema.sql
 │
 ├── 📄 index.html
 └── 📄 README.md
```

---

## 🔄 Fluxo de autenticação

```text
                    ┌───────────────┐
                    │     INÍCIO    │
                    └───────┬───────┘
                            │
                            ▼
                 ┌────────────────────┐
                 │ Existem usuários?  │
                 └─────────┬──────────┘
                       NÃO  │  SIM
                    ┌───────┘  └───────┐
                    ▼                   ▼
          ┌─────────────────┐    ┌─────────────┐
          │ Primeiro        │    │    Login    │
          │ cadastro        │    └──────┬──────┘
          └────────┬────────┘           │
                   │                    ▼
                   │            ┌───────────────┐
                   │            │ Validar dados │
                   │            └───────┬───────┘
                   │                    │
                   └──────────┬─────────┘
                              ▼
                    ┌──────────────────┐
                    │     Dashboard    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Controle de      │
                    │ horas e usuários │
                    └──────────────────┘
```

---

## 📊 Fluxo do dashboard

```text
Login
  │
  ▼
Dashboard
  │
  ├── Selecionar mês
  │
  ├── Cadastrar colaborador
  │       ├── Valor/hora normal
  │       └── Valor/hora domingo/feriado
  │
  ├── Criar semana
  │
  ├── Lançar horas
  │       ├── Horas trabalhadas
  │       ├── Observação
  │       └── Domingo/Feriado
  │
  ├── Visualizar indicadores
  │
  ├── Analisar gráficos
  │
  └── Exportar relatório
          ├── Excel
          └── JSON
```

---

## 💾 Armazenamento dos dados

A versão atual utiliza o **LocalStorage do navegador** para persistir os dados da aplicação.

São armazenadas informações referentes a:

- Dados dos usuários;
- Sessão do usuário;
- Dados dos meses;
- Colaboradores;
- Semanas;
- Lançamentos de horas;
- Logotipo da empresa.

> ⚠️ **Importante:** por utilizar armazenamento local, os dados ficam vinculados ao navegador/dispositivo utilizado. Esta versão não possui banco de dados ou servidor backend.

---

## 🔒 Segurança

O projeto possui uma implementação inicial de autenticação utilizando **Web Crypto API para geração de hash SHA-256 das senhas**.

Entretanto, por ser uma aplicação exclusivamente frontend e utilizar `localStorage`, essa implementação **não deve ser considerada adequada para um ambiente de produção com dados reais**.

Para uma versão profissional, recomenda-se implementar:

- Backend;
- Banco de dados;
- Autenticação no servidor;
- Hash de senha com algoritmo apropriado para senhas, como Argon2 ou bcrypt;
- Controle de permissões;
- Tokens/sessões seguras;
- Recuperação de senha via e-mail;
- Proteção contra tentativas excessivas de login;
- Auditoria de acessos.

---

## 🚀 Como executar o projeto

Como o projeto atualmente utiliza HTML, CSS e JavaScript no frontend, é possível executá-lo diretamente no navegador.

### Opção 1 — Abrir diretamente

Baixe/clique no arquivo:

```text
index.html
```

e abra-o utilizando um navegador moderno.

### Opção 2 — Visual Studio Code

Recomenda-se utilizar o **Visual Studio Code**.

Após abrir a pasta do projeto:

1. Abra o `index.html`;
2. Instale a extensão **Live Server**;
3. Clique com o botão direito no arquivo;
4. Selecione **Open with Live Server**.

A aplicação será aberta automaticamente no navegador.

---

## 📦 Bibliotecas externas

O projeto utiliza:

- **Chart.js** para gráficos;
- **SheetJS/XLSX** para geração de arquivos Excel;
- **Google Fonts** para tipografia.

As bibliotecas são carregadas por CDN no arquivo `index.html`.

---

## 🧮 Cálculo das horas

O custo de cada lançamento é calculado de acordo com o valor/hora do colaborador.

Para dias normais:

```text
Custo = Horas × Valor da hora normal
```

Para domingos ou feriados:

```text
Custo = Horas × Valor da hora especial
```

O dashboard consolida os lançamentos para apresentar o total de horas e o custo do período.

---

## 📑 Relatório Excel

A exportação em Excel gera um arquivo contendo um resumo do mês com informações como:

- Colaborador;
- Valor da hora normal;
- Valor da hora de domingo/feriado;
- Total de horas;
- Horas de domingo/feriado;
- Custo total.

Também é criada uma aba individual para cada colaborador.

---

## 🧪 Validações implementadas

O cadastro de usuário possui validações para:

- Campos obrigatórios;
- Nome completo;
- E-mail;
- Nome de usuário;
- Usuário duplicado;
- Senha mínima de 8 caracteres;
- Letra maiúscula;
- Número;
- Caractere especial;
- Confirmação de senha.

---

## 🔮 Melhorias futuras

### Backend e banco de dados

- [ ] Criar API REST;
- [ ] Implementar banco de dados;
- [ ] Migrar dados do LocalStorage para banco;
- [ ] Criar CRUD de usuários;
- [ ] Criar CRUD de colaboradores;
- [ ] Criar CRUD de horas extras.

### Autenticação

- [ ] Sistema de permissões por perfil;
- [ ] Perfil Administrador;
- [ ] Perfil Usuário;
- [ ] Recuperação de senha por e-mail;
- [ ] Autenticação em dois fatores;
- [ ] Controle de tentativas de login;
- [ ] Histórico de acessos.

### Dashboard

- [ ] Filtros avançados;
- [ ] Relatórios por período;
- [ ] Relatórios por colaborador;
- [ ] Comparativo entre meses;
- [ ] Indicadores financeiros;
- [ ] Exportação em PDF;
- [ ] Dashboard administrativo.

### Arquitetura

- [ ] Separar HTML, CSS e JavaScript;
- [ ] Componentizar a aplicação;
- [ ] Implementar backend;
- [ ] Criar ambiente de desenvolvimento e produção;
- [ ] Criar testes automatizados;
- [ ] Configurar CI/CD.

---

## 🎯 Objetivo profissional do projeto

Este projeto foi desenvolvido com foco em demonstrar conhecimentos de:

- Desenvolvimento Frontend;
- JavaScript;
- Manipulação do DOM;
- Autenticação;
- Validação de formulários;
- Persistência de dados;
- Geração de relatórios;
- Visualização de dados;
- Responsividade;
- Organização de sistemas administrativos;
- Desenvolvimento orientado a necessidades reais de negócio.

---

## 👨‍💻 Status do projeto

**🟢 Em desenvolvimento**

A versão atual apresenta o frontend funcional do dashboard e o fluxo inicial de autenticação.

O próximo grande passo do projeto é evoluir a aplicação para uma arquitetura **Frontend + Backend + Banco de Dados**, permitindo que diferentes usuários acessem os mesmos dados de forma centralizada e segura.

---

## 📸 Demonstração

Sugestão para o repositório:

```text
📁 screenshots
 ├── login.png
 ├── cadastro.png
 ├── dashboard.png
 ├── cadastro-colaborador.png
 └── relatorio-excel.png
```

Depois, adicionar as imagens ao README:

```markdown
![Tela de Login](screenshots/login.png)

![Dashboard](screenshots/dashboard.png)
```

---

## 📄 Licença

Este projeto pode ser utilizado para fins acadêmicos, de estudo e demonstração de desenvolvimento de software.

---

⭐ Se este projeto foi útil ou interessante, considere deixar uma estrela no repositório!
