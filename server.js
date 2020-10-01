const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRoute = require('./routes/authRoute');
const projectRoute = require('./routes/projectRoute');

app.use('*',checkUser);
app.use('/api', authRoute);
app.use('/api/projects', requireAuth, projectRoute);

const mongo_uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jfnot.mongodb.net/${process.env.MONGO_DBNAMEs}?retryWrites=true&w=majority`;
mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log('Database Connected...'))
.catch(err => console.log(err))


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
