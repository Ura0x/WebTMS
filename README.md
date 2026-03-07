## Simulador de Máquina de Turing

Este projeto é um simulador visual de Máquina de Turing feito em **React + TypeScript** usando **Vite**.
O objetivo é permitir que usuários definam a função de transição, configurem a fita e acompanhem passo a passo a execução de uma máquina de Turing.
O simulador foi desenvolvido como Trabalho de Conclusão de Curso (TCC) por Fabio Ura, sob orientação do Prof. Dr. Roberto Tenório Figueiredo. A forma como a máquina é apresentada, bem como algumas restrições e convenções adotadas, seguem a metodologia didática do professor, que busca simplificar e padronizar o aprendizado dos conceitos teóricos para alunos de graduação.
Suas aulas podem ser encontradas em seu canal no YouTube: www.youtube.com/@osfedera.

---

### Demonstração online
O simulador está disponível para uso imediato em:
https://web-tms.vercel.app

---

### Funcionalidades

* Criação e edição de **tabela de transições**.
* Importação e exportação de máquinas em **JSON** (tabela, fita e estado final).
* Exemplos de máquinas prontas para carregar.
* Simulação manual ou automática da execução.
* Velocidade ajustável na simulação automática.
* Desfazer passos da execução.
* Histórico de execução detalhado com log passo a passo.
* Atalhos de teclado: `Espaço` (play/pause), `→` (passo), `←` (desfazer).
* Interface com design moderno usando **Tailwind CSS**.
* Destaque visual da posição da agulha e da transição atual.
* Fita dinâmica que cresce conforme a execução.
* Modal "Sobre" com informações e convenções (exibido automaticamente na primeira visita).
* Layout responsivo para desktop e mobile.

---

### Convenções adotadas

* A máquina é definida formalmente como uma **nôntupla**.
* O **estado inicial** é sempre `q0`.
* Os estados seguem o formato `q0`, `q1`, `q2`, etc.
* Existe **apenas um estado final**.
* O **delimitador de fita** é sempre o símbolo `>`.
* O **símbolo branco** (vazio) na fita é sempre representado pela letra `b`.

---

### Tecnologias

* [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/) para build rápido.
* [Tailwind CSS](https://tailwindcss.com/) para estilização.

---

### Como executar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

O app estará disponível em: [http://localhost:5173](http://localhost:5173)

---

### Estrutura resumida

```
src/
├── components/       # Componentes (Tabela, Fita, Painel de Controle, Histórico, Modais)
├── context/          # Context API (estado global da máquina)
├── data/             # Exemplos de máquinas
├── utils/            # Funções utilitárias (importar/exportar JSON)
├── types/            # Tipos TypeScript
├── assets/           # Ícones e imagens
├── App.tsx           # Componente principal
└── main.tsx          # Ponto de entrada
```

---

### Sobre

Este projeto foi desenvolvido para fins didáticos, facilitando o estudo de máquinas de Turing por meio de visualização passo a passo.
