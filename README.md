# pamii-gabriel-fernandes
# Criação de Projeto Expo

Guia passo a passo para criar, executar e compartilhar um projeto Expo (React Native).

## Sumário

1. [Pré-requisitos](#1-pré-requisitos)
2. [Passo a Passo](#2-passo-a-passo)
   - 2.1 [Instale o Expo CLI](#21-instale-o-expo-cli)
   - 2.2 [Crie o projeto](#22-crie-o-projeto)
   - 2.3 [Acesse a pasta do projeto](#23-acesse-a-pasta-do-projeto)
   - 2.4 [Inicie o servidor de desenvolvimento](#24-inicie-o-servidor-de-desenvolvimento)
   - 2.5 [Teste o app no seu celular](#25-teste-o-app-no-seu-celular)
   - 2.6 [Compartilhe seu app](#26-compartilhe-seu-app)
3. [Erros comuns](#3-erros-comuns)

---

## 1. Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (preferencialmente a versão LTS)
- **npm** ou **yarn** (gerenciadores de pacotes)
- **Expo CLI** (instalado via npm)
- Um celular com o app **Expo Go** (disponível na Play Store e App Store)

---

## 2. Passo a Passo

### 2.1 Instale o Expo CLI

Abra o terminal e execute o comando:

```
npm install -g expo-cli
```

### 2.2 Crie o projeto

Após a instalação, crie um novo projeto com o comando:

```
npx create-expo-app@latest exemplo-app
```

### 2.3 Acesse a pasta do projeto

Entre na pasta recém-criada:

```
cd exemplo-app
```

### 2.4 Inicie o servidor de desenvolvimento

Execute o comando:

```
npx expo start
```

Isso abrirá a interface do Expo Developer Tools no navegador, de onde você pode iniciar seu app em emuladores ou dispositivos físicos.

### 2.5 Teste o app no seu celular

1. Abra o app **Expo Go** no seu celular
2. Escaneie o QR Code que aparece no terminal ou no navegador
3. Seu aplicativo será carregado e você poderá ver as mudanças em tempo real conforme edita o código

### 2.6 Compartilhe seu app

Você pode compartilhar o app com outras pessoas via QR Code, ou exportar para publicação usando:

```
npx expo export
```

---

## 3. Erros comuns

| Erro | Solução |
|---|---|
| `Deprecated` (ao rodar `expo-cli`) | Basta rodar `expo start` diretamente, sem passar pelo `expo-cli` |
- Use o **IntelliJ IDEA** para agilizar o processo sem sair da IDE.

**Resumo:** independente do método, o resultado final é um projeto Spring Boot funcional, com estrutura de pastas correta, dependências configuradas e pronto para desenvolvimento.
