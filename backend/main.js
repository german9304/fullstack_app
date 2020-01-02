const server = require('./server');
const cookieParser = require('cookie-parser');

const PORT = 5000; // port

function main() {
  // middleware to parse cookies from request
  server.express.use(cookieParser());
  // authentication middleware
  server.express.use((req, res, next) => {
    console.log(req.cookies);
    if (!('signedAuthor' in req.cookies)) {
      next();
      return;
    }
    const { signedAuthor } = req.cookies;
    req.authorID = signedAuthor;
    // console.log(`author ${JSON.stringify(req.cookies, null, '  ')}`);
    next();
  });

  server.start(
    {
      port: PORT,
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders:
          'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
        credentials: true
      }
    },
    resp => {
      console.log(`app listening on port http://localhost:${resp.port}`);
    }
  );
}

main();
