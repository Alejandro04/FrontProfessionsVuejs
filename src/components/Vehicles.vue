<template>
  <div>
    <div class="titles">
      <h2>Vehículos</h2>
      <div class="link">
        <a href="/vehicles/new">Nuevo</a>
      </div>
    </div>

    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <div v-if="msg_delete" class="success">Vehiculo eliminado</div>
    <div
      v-if="msg_validate_record"
      class="danger"
    >No se puede eliminar el vehículo, está asignado a un usuario.</div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Marca</th>
          <th scope="col">Año</th>
          <th scope="col">Actualizar</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in vehicles" :key="item.id">
          <td>{{ item.brand }}</td>
          <td>{{ item.year }}</td>
          <td>
            <button class="btn btn-success" @click="updateVehicle(item.id)">
              <i class="fa fa-edit"></i>
            </button>
          </td>
          <td>
            <button class="btn btn-danger" @click="deleteVehicle(item.id)">
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
  name: "Vehicles",
  mounted() {
    this.getVehicles();
  },
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      msg_validate_record: false,
      vehicles: [],
      msg_delete: ""
    };
  },
  methods: {
    async getVehicles() {
      this.isLoading = true;
      try {
        const response = await axios.get("http://localhost:8000/api/vehicles");
        response.data.forEach(element => {
          this.vehicles.push({
            id: element.id,
            brand: element.brand,
            year: element.year
          });
        });

        console.log(this.vehicles);
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    updateVehicle(id) {
      this.$router.push(`vehicles/${id}`);
    },
    deleteVehicle(id) {
      axios
        .delete(`http://localhost:8000/api/vehicles/${id}`, {})
        .then(response => {
          const vehicles = this.vehicles.filter(x => x.id != id);
          this.vehicles = vehicles;
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