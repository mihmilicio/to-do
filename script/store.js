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
    // TODO
    renderTable(this.tasks);
  };

  /**
   *  @param {{name: string, category: string, priority: number}} task
   */
  addFromJson = (task) => {
    this.incrementOrder();
    this.tasks.push(new Task({ ...task, order: 1 }));
    this.sort();
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
