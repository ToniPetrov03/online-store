import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models';
import productRoute from './routes/product.js'

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

db.sequelize.sync();

app.get('/', (req, res) => {
    res.json({message: 'Hello world.'});
});

productRoute(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
