<template>
  <f7-page name="completed-todo">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-title sliding>Raja's TODO App</f7-nav-title>
      <f7-nav-title-large>Raja's TODO App</f7-nav-title-large>
    </f7-navbar>

    <f7-list>
      <f7-list-item
        v-for="todo in todoList"
        :title="todo.name"
        :key="todo.id"
        @click="editTodo(todo.id)" style="text-decoration: line-through"
      >
        <f7-checkbox
          checked
          :key="todo.id"
          @change="changeTodoStatus(todo.id)"
        ></f7-checkbox>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      sheetOpened: false,
      todoItem: {
        id: "",
        name: "",
        status: 1,
      },
      taskName: "",
      actionSheetTitle: "Create TODO",
      isEdit: false,
    };
  },
  computed: {
    todoList() {
      return store.getters.getCompletedTodoList;
    },
  },
  methods: {
    editTodo(todoId) {
      let index = this.todoList.findIndex((todo) => todo.id == todoId);
      if (index >= 0) {
        this.isEdit = true;
        this.todoItem = this.todoList[index];
        this.taskName = this.todoList[index].name;
        this.actionSheetTitle = "Update TODO";
        this.sheetOpened = true;
      }
    },
    changeTodoStatus(todoId) {
      this.sheetOpened = false;
      this.todoItem = {};
      let index = this.todoList.findIndex((todo) => todo.id == todoId);
      if (index >= 0) {
        this.todoList[index].status = this.todoList[index].status == 1 ? 2 : 1;
        this.showSuccessToast(todoId);
      }
    },
    showSuccessToast(todoId) {
      let toastWithCustomButton = this.$f7.toast.create({
        text: "TODO moved to Pending List !",
        closeButton: true,
        closeTimeout: 3000,
        closeButtonText: "Undo",
        closeButtonColor: "red",
        store: store,
        Id: todoId,
        on: {
          closeButtonClick: (ind) => {
            let store = ind.params.store;
            let todos = store.getters.getTodoList;
            let todoIndex = todos.findIndex(
              (todo) => todo.id == ind.params.Id
            );
            if (todoIndex >= 0) {
              todos[todoIndex].status = 2;
              store.commit("updateTodoList", todos[todoIndex]);
            }
          },
        },
      });
      toastWithCustomButton.open();
    },
  },
};
</script>