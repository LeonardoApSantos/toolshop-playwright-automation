# Test Plan – Toolshop (Practice Software Testing)

## 1. Objetivo
Mapear os casos de teste para serem automatizados, visando servir de portfólio para minha atuação como Engenheiro de QA.

## 2. Escopo
**Dentro:** login/cadastro, catálogo, carrinho, checkout.
**Fora:** testes de carga, acessibilidade

## 3. Estratégia
- API: validar regras e dados com rapidez e estabilidade
- UI: cobrir os fluxos críticos de ponta a ponta
- Manual/exploratório: UX e comportamentos subjetivos
- Dados: massa em JSON, usuários criados via API

## 4. Ambiente e dados
Utilização de Docker para criação de máquina virtual e servidor local.

## 5. Matriz de risco e cobertura
Funcionalidade   | Impacto se falhar (1-5) | Frequência de Fluxo (1-5) | Automatizar?
Login            | 5                       | 5                         | Sim
Checkout         | 5                       | 5                         | Sim
Busca/filtros    | 3                       | 3                         | Sim, parcial
Aparência visual | 2                       | 4                         | Não

## 6. Ferramentas
Playwright + TypeScript, GitHub Actions

## 7. Cenários e casos de teste
- Fluxos de autenticação
 - Login valído, inválido, campos vazios.
 - Cadastro valido, inválido, duplicado.

## 8. Bugs
- O campo password não possui "*" no seu placeholder para indicar que é um campo obrigatório.