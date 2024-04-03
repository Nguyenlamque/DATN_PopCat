import express from "express";
import connectToMongoDB from "./src/Connect_Server/connect_sv.js";
import router from "./src/routes/Product.js";
import dotenv from "dotenv";
import routerAuth from "./src/routes/Auth.js";
import route_Category from "./src/routes/Category.js";

const app = express();
// bảo mật thông tin
dotenv.config();
const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB;

// hàm kết nối tới Mongodb
connectToMongoDB(URI_DB);

// Định nghĩa json để gửi body lên server
app.use(express.json());

//router server
app.use("/api/",router);
app.use("/api",routerAuth);
app.use("/api",route_Category);


// Hàm chạy cổng
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
