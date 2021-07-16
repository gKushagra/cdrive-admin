/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var {
    getConnection, execQuery,
} = require('../helpers/db');

var {
    getHash,
    compareHash,
    genToken,
} = require('../helpers/utilities');

// get db connection
var connection = getConnection();
connection.connect();

// queries
const getUserQuery = 'SELECT * FROM `users` WHERE `email`=?;';
const updatePassQuery = 'UPDATE `users` SET `password`=? WHERE `userId`=?;';

/** Login */
async function loginController(data) {
    try {
        var queryResult = await execQuery(
            getUserQuery,
            [data.email],
        );
    } catch (error) {
        throw new Error(error);
    }

    if (queryResult && queryResult.email) {
        // check password
        let isPassValid = await compareHash(data.password, queryResult.password);
        if (isPassValid) {
            return {
                user: {
                    userId: queryResult.userId,
                    name: queryResult.name,
                    email: queryResult.email,
                    joinDate: queryResult.joinDate,
                    admin: queryResult.admin
                },
                token: await genToken(data.email)
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}

/** Refresh Token */
async function refreshTokenController(data) {
    try {
        var queryResult = await execQuery(
            getUserQuery,
            [data],
        );
    } catch (error) {
        throw new Error(error);
    }

    if (queryResult && queryResult.email) {
        return {
            user: {
                userId: queryResult.userId,
                name: queryResult.name,
                email: queryResult.email,
                joinDate: queryResult.joinDate,
                admin: queryResult.admin
            },
            token: await genToken(data)
        }
    } else {
        return null;
    }
}

/** Reset Password */
async function resetPasswordController(data) {
    try {
        var queryResult = await execQuery(
            getUserQuery,
            [data.email],
        );
    } catch (error) {
        throw new Error(error);
    }

    if (queryResult && queryResult.email) {
        try {
            await execQuery(
                updatePassQuery,
                [await getHash(data.password), queryResult.userId]
            );
        } catch (error) {
            throw new Error(error);
        }
        return "updated";
    } else {
        return null;
    }
}

module.exports = {
    loginController,
    resetPasswordController,
    refreshTokenController,
}
