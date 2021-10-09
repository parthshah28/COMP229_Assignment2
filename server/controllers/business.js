/** 
 @author Parth Shah
 @studentID 301171805
 @date October 7, 2021
 @description Personal Portfolio website- Authentication
**/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Business = require('../models/business');

module.exports.displayBusinessList = (req, res, next) => {
    Business.find((err, businessList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BusinessList);

            res.render('business/list', 
            {title: 'Business Contact List', 
            BusinessList: businessList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    }).sort({"name":1})
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('business/add', {title: 'Add Business Contact List',
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newBusiness = Business({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Business.create(newBusiness, (err, Business) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the Business list
            res.redirect('/business-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Business.findById(id, (err, businessToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('business/edit', {title: 'Edit Business Contact List', 
            business: businessToEdit,
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBusiness = Business({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Business.updateOne({_id: id}, updatedBusiness, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the business list
            res.redirect('/business-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Business.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the business list
             res.redirect('/business-list');
        }
    });
}