<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-title sliding>Raja's TODO App</f7-nav-title>
      <f7-nav-title-large>Raja's TODO App</f7-nav-title-large>
    </f7-navbar>

    <!-- Page content-->
    <f7-block strong>
      <f7-list>
        <f7-list-item
          v-for="todo in todoList"
          :key="todo.id"
          link="#"
          :title="todo.name" @click="editTodo(todo.id)"
        ></f7-list-item>
      </f7-list>
    </f7-block>

    <f7-fab
      position="center-bottom"
      @click="showCreatePopup"
      slot="fixed"
      text="Create"
      color="primary"
    >
      <f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
    </f7-fab>

    <!-- Swipe to close demo sheet -->
    <f7-sheet
      class="demo-sheet-swipe-to-close"
      style="height: auto; --f7-sheet-bg-color: #fff"
      swipe-to-close
      :opened="sheetOpened"
      @sheet:closed="sheetOpened = false"
      backdrop
    >
      <f7-page-content>
        <f7-block-title large>Create TODO !</f7-block-title>
        <br />
        <f7-block>
          <f7-input
            label="Name"
            type="text"
            placeholder="Enter your TODO here..."
            :value="todoItem"
            @input="todoItem = $event.target.value"
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
      todoItem: "",
    };
  },
  methods: {
    showCreatePopup() {
      this.sheetOpened = true;
    },
    addToTodoList() {
      let nextTodoId = store.getters.getNextTodoId;
      store.commit("addTodoList", {
        id: nextTodoId,
        name: this.todoItem,
        status: 1
      });
      this.sheetOpened = false;
      this.todoItem = "";
    },
    editTodo(todoId) {
      console.log(todoId);
    }
  },
  computed: {
    todoList() {
      return store.getters.getTodoList;
    }
  }
};
</script>