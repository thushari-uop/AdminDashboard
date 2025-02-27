import express from 'express';
import bodyParser from 'body-parser';
import Mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

//data importing
import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import { dataUser, dataProduct, dataProductStat } from './data/index.js';

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet());
app.use(helmet({
    crossOriginEmbedderPolicy: { policy: 'require-corp' } // Invalid value causing the error
  }));
// app.use(helmet.crossOriginEmbedderPolicy({policy: "cross-origin"}));
app.use(morgan("common"))
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


//ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);


//MONGOOS setup
const PORT = process.env.PORT || 9000;
Mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // data add only one time
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
         //insertMany is Mongoose function used to insert multiple documents into a MongoDB collection in a single operation
}).catch((error) => console.log(`${error} did not connect`))

