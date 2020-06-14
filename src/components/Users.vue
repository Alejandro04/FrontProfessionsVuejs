<template>
  <div>
    <div class="titles">
      <h2>Usuarios</h2>
      <div class="link">
        <a href="/users/new">Nuevo</a>
      </div>
    </div>

    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <div v-if="msg_delete" class="success">Usuario eliminado</div>
    <div class="table_users">
        <table class="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Email</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Dirección</th>
          <th scope="col">Fecha de nacimiento</th>
          <th scope="col">Genero</th>
          <th scope="col">Profesión</th>
          <th scope="col">Municipio</th>
          <th scope="col">Vehículo</th>
          <th scope="col">Actualizar</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.id">
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.birthdate }}</td>
          <td>{{item.gender}}</td>
          <td>{{item.profession_id}}</td>
          <td>{{item.municipality_id}}</td>
          <td>{{item.vehicle_id}}</td>
          <td>
            <button class="btn btn-success" @click="updateUser(item.id)">
              <i class="fa fa-edit"></i>
            </button>
          </td>
          <td>
            <button class="btn btn-danger" @click="deleteUser(item.id)">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>


<script>
import axios from "axios";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Users",
  mounted() {
    this.getUsers();
  },
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      msg_validate_record: false,
      users: [],
      msg_delete: ""
    };
  },
  methods: {
    async getUsers() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users"
        );
        response.data.forEach(element => {
          this.users.push({
            id: element.id,
            first_name: element.first_name,
            last_name: element.last_name,
            email: element.email,
            phone: element.phone,
            address: element.address,
            birthdate: element.birthdate,
            gender: element.gender,
            profession_id: element.profession_id,
            municipality_id: element.municipality_id,
            vehicle_id: element.vehicle_id
          });
        });
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    updateUser(id) {
      this.$router.push(`users/${id}`);
    },
    deleteUser(id) {
      axios
        .delete(`http://localhost:8000/api/users/${id}`, {})
        .then(response => {
          const users = this.users.filter(x => x.id != id);
          this.users = users;
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
.table_users{
    width: 100%;
    overflow-x: scroll;
    padding-bottom: 50px;
}
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