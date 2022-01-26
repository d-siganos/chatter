# Chatter

Chatter is a web chat app, made for educational purposes.

## Using
### Installation

**This requires having Git and Node.js installed.**

```bash
> git clone https://github.com/BonfireScratch/chatter
> cd chatter/server
> npm install
> cd ../client
> npm install
```

### Running

```bash
> cd server
> npm start
> cd client
> npm start
```

### Deploying the front-end

```bash
> cd client
> npm run build
> netlify deploy
```

### Dockerising/Deploying the back-end

```bash
> docker build .
> heroku container:push web
```

## Contributing
Feel free to submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## Technologies
- React
- Tailwind
- Socket.io
- MongoDB
- Firebase Auth

The front-end is hosted on Netlify, while the back-end is deployed using Heroku.

## License
[MIT](https://choosealicense.com/licenses/mit/)