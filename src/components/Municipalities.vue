<template>
  <div>
    <div class="titles">
      <h2>Municipios</h2>
      <div class="link">
        <a href="/municipalities/new">Nuevo</a>
      </div>
    </div>

    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <div v-if="msg_delete" class="success">Municipio eliminado</div>
    <div
      v-if="msg_validate_record"
      class="danger"
    >No se puede eliminar el municipio, está asignada a un usuario.</div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Actualizar</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in municipalities" :key="item.id">
          <td>{{ item.name }}</td>
          <td>
            <button class="btn btn-success" @click="updateMunicipality(item.id)">
              <i class="fa fa-edit"></i>
            </button>
          </td>
          <td>
            <button class="btn btn-danger" @click="deleteMunicipality(item.id)">
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
  name: "Municipalities",
  mounted() {
    this.getMunicipalities();
  },
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      msg_validate_record: false,
      municipalities: [],
      msg_delete: ""
    };
  },
  methods: {
    async getMunicipalities() {
      this.isLoading = true;
      try {
        const response = await axios.get("http://localhost:8000/api/municipalities");
        response.data.forEach(element => {
          this.municipalities.push({
            id: element.id,
            name: element.name,
          });
        });
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    updateMunicipality(id) {
      this.$router.push(`municipalities/${id}`);
    },
    deleteMunicipality(id) {
      axios
        .delete(`http://localhost:8000/api/municipalities/${id}`, {})
        .then(response => {
          const municipalities = this.municipalities.filter(x => x.id != id);
          this.municipalities = municipalities;
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

<style>
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