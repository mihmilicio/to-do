class TaskList {
  /** @type Task[] @description List of tasks */
  tasks;
  /** @type string @description Last prop used for sorting */
  lastSort;

  constructor(tasks) {
    this.tasks = tasks;
    this.lastSort = "order";
  }

  incrementOrder = () => {
    this.tasks.forEach((task) => {
      task.order++;
    });
  };

  sort = (prop) => {
    this.lastSort = prop;
    // this.tasks.sort((a, b) => a[prop] - b[prop]);
    this.tasks.sort((a, b) => {
      if (prop == "order" || prop == "priority" || prop == "completed") {
        return a[prop] - b[prop];
      } else {
        let newA = a[prop].toUpperCase(); // ignore upper and lowercase
        let newB = b[prop].toUpperCase();
        console.log(newA, newB);
        if (newA < newB) {
          return -1;
        }
        if (newA > newB) {
          return 1;
        }

        return 0; // equal
      }
    });
    renderTable(this.tasks);
  };

  /**
   *  @param {{name: string, category: string, priority: number}} task
   */
  addFromJson = (task) => {
    this.incrementOrder();
    this.tasks.push(new Task({ ...task, order: 1 }));
    this.sort(this.lastSort);
    console.log(this.tasks);
  };

  removeByOrder = (order) => {
    let index = this.tasks.findIndex((task) => task.order == order);
    console.log("Remove index:", index);
    this.tasks.splice(index, 1);
    if (this.tasks.length > 0) {
      for (i = index; i < this.tasks.length; i++) {
        this.tasks[i].order--;
      }
    }
    renderTable(this.tasks);
  };

  completeByOrder = (order) => {
    let index = this.tasks.findIndex((task) => task.order == order);
    console.log("Completa index:", index);
    this.tasks[index].completed = true;
    renderTable(this.tasks);
  };

  filterByCategory = (category) => {
    if (category == null) {
      renderTable(this.tasks);
      return;
    }
    const res = this.tasks.filter((task) => task.category == category);
    renderTable(res, false);
  };
}

class Task {
  order;
  name;
  category;
  priority; // 1 a 5
  completed;

  constructor({ order, name, category, priority }) {
    this.order = order;
    this.name = name;
    this.category = category;
    this.priority = priority;
    this.completed = false;
  }
}

const taskList = new TaskList([
  new Task({
    order: 1,
    name: "Nome da tarefa",
    category: "work",
    priority: 3,
  }),
]);
