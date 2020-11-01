<template>
  <f7-page name="completed-todo">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-title sliding>Raja's TODO App</f7-nav-title>
      <f7-nav-title-large>Raja's TODO App</f7-nav-title-large>
    </f7-navbar>

    <!-- Page content-->
    <f7-block strong>
      <f7-list>
        <f7-list-item v-for="todo in todoList" :key="todo.id" link="#" :title="todo.name" ></f7-list-item>
      </f7-list>
    </f7-block>
  </f7-page>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
    };
  },
  computed: {
    todoList() {
      return store.getters.getCompletedTodoList;
    }
  }
};
</script>