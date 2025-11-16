## API Playground

### Um repositório simples para testar APIs, fazer requisições HTTP e experimentar código em Node.js + TypeScript.

---

#### Ideal para estudar, validar endpoints e criar pequenos ApiClient de automação.

---

### Instale as dependências:

```bash
npm install
```

### Executar um script

#### Todos os ApiClient ficam dentro da pasta src/methods.

Para rodar qualquer arquivo .ts, use:

```bash
npm run dev
```

`Atenção: os métodos estão dentro de src/methods e chamo eles dentro de /src/main.ts, o "npm run dev" roda o main e assim os métodos posteriores em que chamo lá, porem se quiser rodar um script em especifico, rode o script abaixo`

Se quiser rodar um script direto:

```bash
ts-node src/seu-script.ts
```

#### Recomendo também dividir as baseUrls por arquivo:

Por exemplo, Brasil API, crie um arquivo dentro de uma pasta como "endpoints", e defina lá a baseUrl que deseja usar

---

É apenas um repositório para diversão!
