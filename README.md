# Chatter

[![Netlify Status](https://api.netlify.com/api/v1/badges/d7a72f86-60fb-4aad-8c66-45ed01d6edee/deploy-status)](https://app.netlify.com/sites/chatter-js-app/deploys)

Chatter is a web chat app, made for educational purposes. It enables you to:
- Sign up with 1 (or more) accounts
- Create private chatrooms, which can be shared using links
- Send encrypted text and image messages in real-time
- Delete the messages you've sent
- Upload .pdf, .docx, .xslx and many other files
- Send links to specific messages
- ... and more!

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
> cd ../client
> npm start
```

### Deploying the front-end

```bash
> cd client
> npm run build
> netlify deploy
```

### Deploying the back-end

```bash
> cd server
> npm run prod
```

## Contributing
Feel free to submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## Technologies
- React
- Tailwind
- Socket.io
- MongoDB
- Firebase Auth

The front-end is hosted on Netlify, while the back-end is deployed using Render.

## License
[MIT](https://choosealicense.com/licenses/mit/)