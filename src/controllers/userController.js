import { parse } from "dotenv";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../services/userService.js";


const handleResponse = (res, message, status, data) => {
    return res.status(status).json({message: message, data: data});
}

export const userCreate = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await createUser({ name, email, password });
        handleResponse(res, 'User created successfully', 201, newUser);
    }catch(err){
        next(err);
    }
}

export const usersGetAll = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        handleResponse(res, 'Users retrieved successfully', 200, users);
    }catch(err){
        next(err);
    }
}

export const userGetById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await getUserById(parseInt(id));
        if(!user){
            return handleResponse(res, 'User not found', 404, null);
        }
        handleResponse(res, 'User retrieved successfully', 200, user);
    }catch(err){
        next(err);
    }
}

export const userUpdate = async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedUser = await updateUser(id, { name, email });
        if(!updatedUser){
            return handleResponse(res, 'User not found', 404, null);
        }
        handleResponse(res, 'User updated successfully', 200, updatedUser);
    }catch(err){
        next(err);
    }
}

export const userDelete = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUser(id);
        if(!deletedUser){
            return handleResponse(res, 'User not found', 404, null);
        }
        handleResponse(res, 'User deleted successfully', 200, deletedUser);
    }catch(err){
        next(err);
    }
}