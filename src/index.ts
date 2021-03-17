import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { router } from "./routes/loginRoutes";

const app = express();

// ミドルウェア
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["secletkey"] }));

// ルート
app.use(router);

// サーバー
app.listen(3000, () => {
  console.log("port 3000");
});
