class TaskList {
  /** @type Task[] @description List of tasks */
  tasks;
  /** @type string @description Last prop used for sorting */
  lastSort = "order";

  constructor(tasks) {
    this.tasks = tasks;
  }

  incrementOrder = () => {
    this.tasks.forEach((task) => {
      task.order++;
    });
  };

  sort = (prop) => {
    this.lastSort = prop;
    // TODO
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
}

class Task {
  order;
  name;
  category;
  priority; // 1 a 5

  constructor({ order, name, category, priority }) {
    this.order = order;
    this.name = name;
    this.category = category;
    this.priority = priority;
  }
}

const taskList = new List([
  new Task({
    order: 1,
    name: "Nome da tarefa",
    category: "work",
    priority: 3,
  }),
]);
