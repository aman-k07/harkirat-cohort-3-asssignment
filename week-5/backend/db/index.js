//  start writing from here
const jwt=require('jsonwebtoken');

let users=[];


const generateJWT=(useremail)=>{
    // const userame=req.body.useremail;
    const token=jwt.sign({useremail:useremail},process.env.JWT_SECRET)
    return token;
}



const signup=(req,res)=>{
    console.log(req.body);
    
    const user={
        useremail:req.body.useremail,
        password:req.body.password,
        todosCount:0,
        todos:[]
    }
    console.log(user.useremail,user.password);
    
    if(!user.useremail||!user.password){
        return res.status(403).send({message:"User Details required"});
    }

    for(let i=0;i<users.length;i++)
    {
        if(user.useremail===users[i].useremail&&user.password===users[i].password){
            return res.status(400).send({message:"User already exists"})
        }
    }

    users.push(user);
    const token=generateJWT(user.useremail);
    return res
    .status(201)
    .send({
        token,
        message:"User signed up successfully"
    })

}

const signin=(req,res)=>{
    const user={useremail:req.body.useremail,password:req.body.password};
    if(!user.useremail||!user.password){
        return res.status(403).send({message:"User Details required"});
    }

    for(let i=0;i<users.length;i++)
    {
        if(user.useremail===users[i].useremail&&user.password===users[i].password){
            const token=generateJWT(user.useremail);
            return res
            .status(201)
            .send({
                token,
                message:"User signed in successfully"
            })
        }
    }

    return res
    .status(404)
    .send({
        message:"Email/Password incorrect"
    })
}

const logout=(req,res)=>{

}



//TODOs list/create/delete/update/done marking

const allTodos=(req,res)=>{
    const useremail=req.useremail;
    if(!useremail){
        return res.status(400).send({message:"User required"});
    }
    for(let i=0;i<users.length;i++)
    {
        if(useremail===users[i].useremail){
            return res.status(200).send({todos:users[i].todos,todosCount:users[i].todosCount});
        }
    }

    return res.status(404).send({message:"Invalid user"});
}

const createTodo=(req,res)=>{
    const useremail=req.useremail;
    if(!useremail||!req.body.todo){
        return res.status(400).send({message:"Details required"});
    }
    for(let i=0;i<users.length;i++)
    {
        if(useremail===users[i].useremail){
            users[i].todosCount=req.body.todo.id;
            users[i].todos.push(req.body.todo);
            return res.status(201).send({message:"Todo created successfully"});
        }
    }

    return res.status(404).send({message:"Invalid user"});

}

const deleteTodo=(req,res)=>{
    //validate the details from req
    //search for user
    //search for todo
    //delete the todo
    //Didn't find the user

    const useremail=req.useremail;
    if(!useremail||!req.body.id){
        return res.status(400).send({message:"Details required"});
    }
    for(let i=0;i<users.length;i++)
    {
        if(useremail===users[i].useremail){
            for(let j=0;j<users[i].todos.length;j++)
            {
                if(users[i].todos[j].id===req.body.id){
                    const removedTodo= users[i].todos.splice(j,1);
                    if(removedTodo.length===0){
                        return res.status(500).send({message:"Error occured while removing the todo"});
                    }
                    return res.status(200).send({message:"Todo deleted successfully"});
                }
            }
            return res.status(404).send({message:"Todo not found"});
        }
    }

    return res.status(404).send({message:"Invalid user"});

}

const completeTodo=(req,res)=>{
    //validate the details
    //find the user
    //find the todo
    //mark todo as completed
    
    const useremail=req.useremail;
    if(!useremail||!req.body.id){
        return res.status(400).send({message:"Details required"});
    }
    for(let i=0;i<users.length;i++)
    {
        if(useremail===users[i].useremail){
            for(let j=0;j<users[i].todos.length;j++)
            {
                if(users[i].todos[j].id===req.body.id){
                    users[i].todos[j].completed=1;
                    return res.status(200).send({message:"Todo marked as done successfully"});
                }
            }
            return res.status(404).send({message:"Todo not found"});
        }
    }

    return res.status(404).send({message:"Invalid user"});
}

const updateTodo=(req,res)=>{
    const useremail=req.useremail;
    if(!useremail||!req.body.todo){
        return res.status(400).send({message:"Details required"});
    }
    for(let i=0;i<users.length;i++)
    {
        if(useremail===users[i].useremail){
            for(let j=0;j<users[i].todos.length;j++)
            {
                if(users[i].todos[j].id===req.body.todo.id){
                    users[i].todos[j]=req.body.todo;
                    return res.status(200).send({message:"Todo updated successfully"});
                }
            }
            return res.status(404).send({message:"Todo not found"});
        }
    }

    return res.status(404).send({message:"Invalid user"});
}

module.exports={
    signup,
    signin,
    logout,
    allTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    completeTodo
};