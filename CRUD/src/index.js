const cors=require('cors');
const express=require('express');
const app=express();
//const indexRoutes=require('./routes/index');
const taskRoutes=require('./routes/task');
const path = require('path');

//setting
app.set('port', process.env.PORT || 3000)
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//static files
app.use(express.static(path.join(__dirname,'dist/client')));

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
//app.use(indexRoutes);
app.use(taskRoutes);

app.listen(app.get('port'), () =>{
    console.log('Server Online', app.get('port'))
});