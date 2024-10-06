# 2024 Holders snapshot
This small project allows you to get snapshot of token holders by **Block**, **Token address** and **Chain**. For that you might need [covalent API key](https://www.covalenthq.com) (now GoldRush API) to pass it into the .env file.
---
### Installing dependecies
Initially install ann necessary dependecies (no matter via npm/yarn/pnpm etc.).
```bash
npm install
```
### Adding environment variables
After all dependencies insalled you need to create `.env` file in project root. Then create there an environment variable `API_KEY` (use `.example` file as reference).
It shold look something like that:
```
API_KEY=your_covalent_hq_api_key
```
### Runing search script
To run script it's urgent to use exact same flags and order or it will just throw you an error.
For block you can use just block height number.
For address it's necessary to wrap it with `'0x...'` to prevent it from trnsforming to a number.
For a chain you can use either `0x - like` form or regular `number`
```bash
npm run start --block 8377800 --address '0x554c20b7c486beee439277b4540a434566dc4c02' --chain 1
```
### Data output 
After that, all the info wolud be added to the `holders.csv` file and can be imported and used wherever needed.
