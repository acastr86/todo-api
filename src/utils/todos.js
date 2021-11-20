import { nanoid } from "nanoid";
import joi from "joi";

import logger from "./logger";

const todos = [];

const todoSchema = joi.object({
    text: joi.string().min(10).required(),
    completed: joi.boolean().required()
});

const baseTodo = {
    id: nanoid(),
    text: 'Test To do item',
    completed:  false,
};

todos.push(baseTodo);

export const getTodos = (completed = null) => {

    if(completed === null){
        logger.log.success("Getting all todos");
        return todos;
    }

    logger.log.success('Getting by completion todos');

    const isCompleted = completed === 'true'? true: false;

    return todos.filter((todo) => todo.completed === isCompleted);
};

export const getTodo = (id) => {
    logger.log.success(`Getting todo with id: ${id}`);
    return todos.find((todo) => todo.id === id);
};

export const addTodo = (todo) => {
    logger.log.info(`Valiting ${todo} to add`);
    const {error} = todoSchema.validate(todo);

    if (error) {
        logger.log.error(new Error(`Validation error: ${error.message}`));
        return {error};
    }

    logger.log.success(`Validated: ${todo}`); 

    const newTodo = { id: nanoid(), ...todo};
    todos.push(newTodo);
    return {newTodo};
};

export const updateTodo = (id, todo) => {
    logger.log.info(`Validating ${todo} for update`);
    const {error} = todoSchema.validate(todo);

    if (error) {
        logger.log.error(new Error(`Validation error: ${error.message}`));
        return {error};
    };

    logger.log.success(`Validated: ${todo}`);
    const todoIndex = todos.findIndex((t) => t.id === id);
    todos[todoIndex] = {id, ...todo};
    const updatedTodo = todos[todoIndex];
    return {updatedTodo};
};