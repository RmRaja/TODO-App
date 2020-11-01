import vue from 'vue';
import Vuex from 'vuex';

vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        todoList: [
            {
                id: 1,
                name: "Buy vegetables for next week",
                status: 1 // Not completed
            },
            {
                id: 2,
                name: "Get my hair cut on sunday",
                status: 2 // Completed.
            }
        ],
        todoId: 3
    },
    getters: {
        getTodoList(state) {
            let todoList = [];
            for (let i = 0; i < state.todoList.length; i++) {
                if (state.todoList[i].status == 1) {
                    todoList.push(state.todoList[i]);
                }
            }
            return todoList;
        },
        getCompletedTodoList(state) {
            let todoList = [];
            for (let i = 0; i < state.todoList.length; i++) {
                if (state.todoList[i].status == 2) {
                    todoList.push(state.todoList[i]);
                }
            }
            return todoList;
        },
        getNextTodoId(state) {
            return state.todoId;
        }
    },
    mutations: {
        addTodoList(state, payload) {
            state.todoList.push(payload);
            state.todoId++;
        },
        updateTodoList(state, payload) {

        },
        deleteTodoList(state, payload) {

        },
    },
    actions: {

    }
});

export default store;