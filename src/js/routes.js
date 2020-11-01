
import HomePage from '../pages/home.vue';
import CompletedTodos from '../pages/completed-todos.vue';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/completed',
    component: CompletedTodos
  },
];

export default routes;
