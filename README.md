# Como executar o projeto localmente:

## API:

Acesse a raíz da pasta 'api' e execute os commandos em ordem:

```
py -3 -m venv .venv

.\.venv\Scripts\activate

pip install -r requirements.txt
```

## Configuração de DB:

Crie um arquivo '.ini', assim o como .ini.example, e insira sua key de conexão:

```
[PROD]
DB_URI = 'sua_key'
```

## Execução do modelo de IA:

Ainda na raíz de 'api', execute o comando:

```
python recommendation_engine.py
```

## Com o modelo pronto, roda a API Flask:

```
python run.py
```

## WEB:

Na raíz da pasta web, rode para instalação de pacotes:

```
npm i
```

Após, ainda na pasta web, inicie o serviço com:

```
npm start
```
