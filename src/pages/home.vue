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
        @click="editTodo(todo.id)"
      >
        <f7-checkbox
          :key="todo.id"
          @change="changeTodoStatus(todo.id)"
        ></f7-checkbox>
      </f7-list-item>
    </f7-list>

    <f7-fab
      position="center-bottom"
      @click="showCreatePopup"
      slot="fixed"
      text="Create"
      color="primary"
    >
      <f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
    </f7-fab>

    <f7-sheet
      class="demo-sheet-swipe-to-close"
      style="height: auto; --f7-sheet-bg-color: #fff"
      swipe-to-close
      :opened="sheetOpened"
      @sheet:closed="sheetOpened = false"
      backdrop
    >
      <f7-page-content>
        <f7-block-title large
          >{{ isEdit ? "Edit" : "Create" }} TODO !</f7-block-title
        >
        <br />
        <f7-block>
          <f7-input
            label="Name"
            type="text"
            placeholder="Enter your TODO here..."
            :value="taskName"
            @input="taskName = $event.target.value"
            clear-button
            required
          >
          </f7-input>
          <f7-row tag="p">
            <f7-col tag="span"> </f7-col>
            <f7-col tag="span">
              <f7-button raised fill round @click="addToTodoList"
                >Save</f7-button
              >
            </f7-col>
            <f7-col tag="span"> </f7-col>
          </f7-row>
        </f7-block>
      </f7-page-content>
    </f7-sheet>
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
      return store.getters.getTodoList;
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
        text: "TODO moved to Completed List !",
        closeButton: true,
        closeTimeout: 3000,
        closeButtonText: "Undo",
        closeButtonColor: "red",
        store: store,
        Id: todoId,
        on: {
          closeButtonClick: (ind) => {
            let store = ind.params.store;
            let todos = store.getters.getCompletedTodoList;
            let todoIndex = todos.findIndex((todo) => todo.id == ind.params.Id);
            if (todoIndex >= 0) {
              todos[todoIndex].status = 1;
              store.commit("updateTodoList", todos[todoIndex]);
            }
          },
        },
      });
      toastWithCustomButton.open();
    },
    showCreatePopup() {
      this.actionSheetTitle = "Create TODO";
      this.sheetOpened = true;
      this.isEdit = false;
      this.taskName = "";
      this.todoItem = {};
    },
    addToTodoList() {
      if (this.isEdit) {
        this.updateTodo();
      } else {
        let nextTodoId = store.getters.getNextTodoId;
        store.commit("addTodoList", {
          id: nextTodoId,
          name: this.taskName,
          status: 1,
        });
      }
      this.sheetOpened = false;
      this.todoItem = {};
      this.taskName = "";
    },
    updateTodo() {
      this.todoItem.name = this.taskName;
      store.commit("updateTodoList", this.todoItem);
    },
  },
};
</script>