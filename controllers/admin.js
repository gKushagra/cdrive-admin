/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var {
    getConnection,
    execQuery,
} = require('../helpers/db');

var {
    getHash,
    compareHash,
    genUUID,
} = require('../helpers/utilities');

// get db connection
var connection = getConnection();
connection.connect();

// queries
const getUsersQuery = 'SELECT * FROM `users`;';
const addUserQuery = 'INSERT INTO `users`(`userId`,`name`,`email`,`password`,`joinDate`) VALUES(?,?,?,?,?);';
const updateUserQuery = 'UPDATE `users` SET `email`=?,`name`=? WHERE `userId`=?;';
const deleteUserQuery = 'DELETE FROM `users` WHERE `userId`=?;';

/** Admin - get all users */
async function getAllUsersController() {
    try {
        var users = await execQuery(getUsersQuery, null);
    } catch (error) {
        throw new Error(error);
    }
    return users;
}

/** Admin - add new user */
async function addNewUserController(data) {
    try {
        await execQuery(
            addUserQuery,
            [await genUUID(), data.name, data.email, await getHash(data.password), new Date()]
        );
    } catch (error) {
        throw new Error(error);
    }
    return "created";
}

/** Admin - update user email, name */
async function updateUserController(data) {
    try {
        await execQuery(
            updateUserQuery,
            [data.name, data.email, data.userId]
        );
    } catch (error) {
        throw new Error(error);
    }
    return "updated";
}

/** Admin - delete user */
async function deleteUserController(data) {
    try {
        await execQuery(
            deleteUserQuery,
            [data],
        );
    } catch (error) {
        throw new Error(error);
    }
    return "deleted";
}

module.exports = {
    getAllUsersController,
    addNewUserController,
    updateUserController,
    deleteUserController
}

