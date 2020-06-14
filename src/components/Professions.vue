<template>
  <div>
    <div class="titles">
      <h2>Profesiones</h2>
      <div class="link">
        <a href="/professions/new">Nuevo</a>
      </div>
    </div>

    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <div v-if="msg_delete" class="success">Profesión eliminada</div>
    <div
      v-if="msg_validate_record"
      class="danger"
    >No se puede eliminar la profesión, está asignada a un usuario.</div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Actualizar</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in professions" :key="item.id">
          <td>{{ item.name }}</td>
          <td>
            <button class="btn btn-success" @click="updateProfession(item.id)">
              <i class="fa fa-edit"></i>
            </button>
          </td>
          <td>
            <button class="btn btn-danger" @click="deleteProfession(item.id)">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import axios from "axios";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Professions",
  mounted() {
    this.getProfessions();
  },
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      msg_validate_record: false,
      professions: [],
      msg_delete: ""
    };
  },
  methods: {
    async getProfessions() {
      this.isLoading = true;
      try {
        const response = await axios.get("http://localhost:8000/api/professions");
        response.data.forEach(element => {
          this.professions.push({
            id: element.id,
            name: element.name,
          });
        });
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    updateProfession(id) {
      this.$router.push(`professions/${id}`);
    },
    deleteProfession(id) {
      axios
        .delete(`http://localhost:8000/api/professions/${id}`, {})
        .then(response => {
          const professions = this.professions.filter(x => x.id != id);
          this.professions = professions;
          this.msg_delete = true;
          this.msg_validate_record = false;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
          this.msg_delete = false;
          this.msg_validate_record = true;
        });
    }
  }
};
</script>

<style scoped>
.success {
  color: green;
}
.danger {
  color: red;
}
.danger,
.success {
  font-size: 20px;
}
.titles {
  margin-top: 50px;
  display: flex;
  align-items: flex-start;
}
.titles > h2 {
  margin-right: 20px;
}
.titles > .link > a {
  position: relative;
  top: 12px;
}
</style>