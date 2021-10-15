const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;

const { initializeRouteAuth } = require('./api/v1/helpers/RouterHelper')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const mainRouter = require('./api/v1/routes/index')

app.use('/api/v1', mainRouter)

app.listen(PORT, () => {
    console.log("Server is listening at port: ", PORT);

    const routes = initializeRouteAuth(app);
})