import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes";
import cors from 'cors';
import { token } from './firebase/token';
dotenv.config()

const app: Application = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(token);

//use of route
app.use("/api/users", userRoutes); //Initial

app.get('/', (req, res) => {
    res.send('Bienvenidos a la aplicacion de CMS con Firebase');
})

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
})

