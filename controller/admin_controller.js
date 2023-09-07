const Users = require('../models/user');

// This function is used for assigning task and sending some data
module.exports.assignWork = async function(req, res){
    let employe = await Users.find({});

    return res.render('admin',  {
        title : 'Employee-Review System  | Assign Work',
        employe : employe
    });
}

// This function is used to show the list of employees.
module.exports.showEmployeeList = async function(req, res){
    if(!req.isAuthenticated()){
        req.flash('error' , 'You are not Authorized !');
        return res.redirect('/users/sign-in');
    }
    if(req.user.isAdmin == false){
        req.flash('error' , 'You are not Authorized');
        return res.redirect('/');
    }
    let employeList = await Users.find({});

    return res.render('employee', {
        title : "Employee-Review System | Employe-List",
        employes : employeList
    });
}

// To Set the Review and Reviewer
module.exports.setReviewrAndReviewe = async function(req, res){
    try{
        // first checking if the req is made correct or not.
        if(!req.isAuthenticated()){
            
            req.flash('success' , 'Please Login !');
            return res.redirect('/users/sign-in');
        }else{
            let employee = await Users.findById(req.user.id);
    
            if(employee.isAdmin == false){
                req.flash('error' , 'Opps ! Not Authorized ');
                return res.redirect('/users/sign-in');
            }
        
            else if(req.body.sender == req.body.reciver){
                req.flash('error' , 'Sender and reciver should not be same !');
                return res.redirect('back');
            }
            // After checking all the authentication , part the main part start from here.
            else{
                let sender = await Users.findById(req.body.sender);
                let reciver = await Users.findById(req.body.reciver);
                //console.log(sender + " " + reciver);
                sender.userToReview.push(reciver);
                sender.save();
                reciver.reviewRecivedFrom.push(sender);
                reciver.save();
                
                req.flash('success', 'Task Assigned !');
                return res.redirect('back');
            }
        }
    
        
    }catch(err){
        console.log("Errror in setting up the user " + err);
    }

}

// This function is used to make New Admin and checking Authentication
module.exports.newAdmin = async function(req, res){
    try{
        if(!req.isAuthenticated()){
            console.log('Please LogIn');
            req.flash("success" , 'Please LogIn !');
            return res.redirect('/users/sign-in');
        }
        if(req.user.isAdmin == false){
            req.flash('error' , 'You are not Admin !');
            return res.redirect('/');
        }
    
        if(req.user.isAdmin){
            let user = await Users.findById(req.body.selectedUser);
            if(!user){
                return res.redirect('back');
            }
            req.flash('success' , 'New Admin Added');
            user.isAdmin = "true";
            user.save();
            return res.redirect('back');
        }
        
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

// This function is used for delete Employee
module.exports.deleteEmployee = async function(req, res){
    try{
        // Authentication and Authoriztion chekcing
        if(!req.isAuthenticated()){
            // flash Messages
            req.flash('error' , 'Please Login !')
            return res.redirect('users/sign-in');
        }

        if(!req.user.isAdmin){
            // flash Messages
            req.flash('error' , 'You are not admin !')
            return res.redirect('/');
        }
        // Deleting the user.
        let employee = await Users.deleteOne({_id : req.params.id});
        // flash Messages
        req.flash('success' , 'User Deleted!')
        return res.redirect('back');

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.addEmployee = function(req, res){
    return res.render('addEmployee', {
        title : 'Employee-Review System | Add Employee'
    });
}