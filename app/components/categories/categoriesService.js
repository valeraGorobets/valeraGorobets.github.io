CategoriesService.$inject = ['$http'];

export default function CategoriesService($http) {
  const store = {
    categories: [],
    currentCategory: {}
  }
  store.getAll = () => {
    return $http.get('/categories')
      .then(function(success) {
          angular.copy(success.data, store.categories)
        },
        error => console.log(error))
  }

  store.get = (id) => {
    return $http.get('/categories/' + id)
      .then(success => angular.copy(success.data, store.currentCategory))
  }
  store.create = (category) => {
    return $http.post('categories', category)
      .then(function(success) {
          store.categories.push(success.data)
        },
        error => console.log(error))
  }
  store.delete = id => {
    return $http.delete('/categories/' + id)
      .then(success => {
        let deleteId;
        store.categories.forEach((el, index) => {
          if (el._id === id) {
            deleteId = index;
          }
        })
        store.categories.splice(deleteId, 1);
        store.setDefaultCurrentCategory();
      })
  }

  store.setDefaultCurrentCategory = () => {
    if (store.categories.length) {
      store.get(store.categories[0]._id)
    } else {
      angular.copy({}, store.currentCategory);
      window.location = '/#/home';
    }
  }

  store.addTodo = (id, todo) => {
    return $http.post('categories/' + id + '/todos', todo)
  }

  store.deleteTodo = (category, todo) => {
    return $http.delete('/categories/' + category._id + '/todos/' + todo._id)
      .then(success => {
        let deleteId;
        category.todos.forEach((el, index) => {
          if (el._id === todo._id) {
            deleteId = index;
          }
        })
        category.todos.splice(deleteId, 1)
      })
  }
  return store;
}
