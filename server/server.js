const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const port = 8000;
const { Board } = require('./models/board.model');
const { Column } = require('./models/column.model');
const { Task } = require('./models/task.model');

require('./config/mongoose.config');

const mongoDBStore = new MongoDBStore({
    uri: 'mongodb://localhost/tazkr',
    collection: "sessions"
});

app.use(cors(),express.urlencoded({extended:true}),express.json(),passport.initialize(),passport.session());
app.use(session({
    name: "session-id",
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    store: mongoDBStore,
    cookie:{
        maxAge: 1000 * 60 * 60 * 3,//3 hours
        sameSite: false,
        secure: false
    }
}));

require('./config/passport.config')();
require('./routes/user.routes')(app);
require('./routes/board.routes')(app);
require('./routes/task.routes')(app);
require('./routes/column.routes')(app);
require('./routes/oauth.routes')(app);

const server = app.listen(port,() => console.log(`Listening on port ${port}`));
const io = require("socket.io")(server);
app.set('io',io);

io.on('connection', socket => {
    socket.on('addColumn',async column => {
        const newColumn = await Column.create(column);
        await Board.findOneAndUpdate({_id:column.board}, {$push:{columns:newColumn}}, {new:true});
        io.emit('addColumn',newColumn);
    });
    socket.on('delColumn',async column => {
        console.log(column);
        await Column.findOneAndDelete({_id:column.id});
        io.emit('delColumn',column);
    });
    socket.on('addTask',async task => {
        const newTask = await Task.create(task);
        await Column.findOneAndUpdate({_id:task.column}, {$push:{tasks:newTask}}, {new:true});
        io.emit('addTask',newTask);
    });
    socket.on('updateTask',async task => {
        const updated = await Task.findOneAndUpdate({_id:task._id}, task, {new:true});
        console.log("TEEEST");
        io.emit('updateTask',updated);
    });
    socket.on('moveTask', async ({task,to,from}) => {
        await Column.findOneAndUpdate({_id:from}, {$pull:{tasks:task._id}});
        await Column.findOneAndUpdate({_id:to}, {$push:{tasks:task}}, {new:true});
        io.emit('moveTask',{task,to,from});
    });
    socket.on('logout', async user => {
        session.destroy(err => console.log(err));
        socket.emit('logout',user);
    });
});