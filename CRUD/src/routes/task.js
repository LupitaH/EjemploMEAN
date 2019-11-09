const router = require('express').Router();
const mongojs= require('mongojs');
const database=mongojs('DBMean',['tasks']);

router.get('/api/all', (req, res, next)=>{
    database.tasks.find((err, tasks)=>{
        if(err) return next(err);
        res.json(tasks);
    });
});

router.get('/api/:id', (req, res, next)=>{
    database.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},(err, task)=>{
        if(err) return next(err);
        res.json(task);
    });
});
//Insert
router.post('/api/insert', (req, res, next)=>{
    const task = req.body;
    if(!task.title || !(task.isDone+''))
    {
        res.status(400).json({
            error:"Bad data"
        });
    }
    else
    {
        database.tasks.save(task, (err, task)=>{
            if(err) return next(err);
            res.json(task);
        });
    }
});
//eliminar
router.delete('/api/delete/:id',(req, res, next)=>{
    database.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result)=>{
        if(err) return next(err);
        res.json(result);
    });
});
//actualizar
router.put('/api/update/:id',(req,res,next)=>{
    const task=req.body;
    const updateTask={};
    if(task.isDone)
    {
        updateTask.isDone=task.isDone;
    }
    if(task.title)
    {
        updateTask.title=task.title;
    }
    if(!updateTask)
    {
        res.status(400).json({
            error:"Bad data"
        });
    }
    else
    {
        database.tasks.update({_id: mongojs.ObjectId(req.params.id)}, {$set:{"isDone":updateTask.isDone, "title":updateTask.title}}, (err,task)=>{
            if(err) return next(err);
            res.json(task);
        });
    }
});

module.exports=router;