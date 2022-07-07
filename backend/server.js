const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({json: true}));

app.use(async (ctx, next) => {
    const headers = { "Access-Control-Allow-Origin": "*" };
    ctx.response.set({ ...headers });
  
    const origin = ctx.request.get("Origin");
    if (!origin) {
      return await next();
    }
  
    if (ctx.request.method !== "OPTIONS") {
      try {
        return await next();
      } catch (e) {
        e.headers = { ...e.headers, ...headers };
        throw e;
      }
    }
    if (ctx.request.get("Access-Control-Request-Method")) {
      ctx.response.set({
        ...headers,
        "Access-Control-Allow-Methods": "GET, POST, DELETE",
      });
      if (ctx.request.get("Access-Control-Request-Headers")) {
        ctx.response.set(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
      }
      ctx.response.status = 204;
    }
  });



const notes = [];
let nextId = 1;

const router = new Router();

router.get('/notes', async (ctx, next) => {
    ctx.response.body = notes;
});

router.post('/notes', async(ctx, next) => {
    notes.push({...ctx.request.body, id: nextId++});
    ctx.response.status = 204;
});

router.delete('/notes/:id', async(ctx, next) => {
    const noteId = Number(ctx.params.id);
    const index = notes.findIndex(o => o.id === noteId);
    if (index !== -1) {
        notes.splice(index, 1);
    }
    ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started'));