<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h3>Add Task</h3>

        <div class="form-group">
          <label for="note">Instruction:</label>
          <textarea v-model="instruction" class="form-control" rows="3"></textarea>
        </div>

        <div class="button-group">
          <button v-on:click="submitTask" class="btn btn-primary">{{ loading ? 'Loading...': 'Add Task' }}</button>
          <button v-if="parent" v-on:click="postSubTask" class="btn btn-warning">Add Subtask</button>
        </div>
        
      </div>
      
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';
const url = 'http://localhost:3000/api/'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      tasks: [],
      instruction: "",
      user: {},
      parent: null,
      loading: false,
    };
  },
  mounted() {
    this.getUser();
    axios.get(`${url}1108607036778401/tasks`)
      .then((res) => {
        this.tasks = res.data;
      });
  },
  methods: {
    submitTask() {
      this.loading = true;
      axios.post(`${url}1108607036778401/tasks`,
        {
          name: 'This is the main task',
          notes: `Instructions go here: ${this.instruction}`,
          assignee: this.user.gid,
        })
        .then((res) => {
          this.parent = res.data;
          this.loading = true;
        });
    },
    getUser() {
      axios.get(`${url}users`)
      .then((res) => {
        res.data.forEach((user) => {
          if(user.name === 'sfit-admin@systemsandoutsourcing.com') {
            this.user = user;
          }
        });
      });
    },
    postSubTask() {
      axios.post(`${url}${this.parent.gid}/subtasks`,
        {
          name: 'This is the subtask',
          notes: 'This is the task description',
          assignee: this.parent.assignee.gid,
        })
        .then((res) => {
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  margin-left: 15px;
}
</style>
