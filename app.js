const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {OpenApiValidator} = require('express-openapi-validator');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const cors = require('cors');


const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const spec = path.join(__dirname, 'swagger.yaml');


new OpenApiValidator({
    apiSpec: spec,
    // validateResponses: true,
    validateRequests: true,
}).installSync(app);

app.use('/api/v1/meeting/{meetingId}', (req, res) => {
    return res.send("success")
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});
app.listen(3000,()=>{
    console.log("App listening")
})
module.exports = app;
