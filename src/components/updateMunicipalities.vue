<template>
  <div>
    <p class="app_title">Actualizar Municipio</p>

    <div class="form-container">
      <div class="form-group">
        <div v-if="label_name_validate" class="validate">Por favor ingrese el nombre</div>
        <input type="text" class="form-control" v-model="name" placeholder="Ingrese el nombre" />
      </div>
      <div class="form-group">
        <button @click="updateMunicipality" class="btn btn-success btn-lg">Update</button>
      </div>
      <div>
        <div v-if="msg_success" class="success">
          Municipio actualizado!
          Ver municipio
          <router-link to="/municipalities">Municipios</router-link>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";

export default {
  name: "updateMunicipalities",
  mounted() {
    this.getMunicipality();
  },
  data() {
    return {
      name: "",
      label_name_validate: false,
      msg_success: false
    };
  },
  methods: {
    async getMunicipality() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `http://localhost:8000/api/municipalities/${this.$route.params.id}`
        );
        this.name = response.data.name;
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    updateMunicipality() {
      let validation = this.validation();
      if (validation) {
        axios
          .put(`http://localhost:8000/api/municipalities/${this.$route.params.id}`, {
            name: this.name,
          })
          .then(response => {
            console.log(response);
            this.msg_success = true;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    validation() {
      if (this.name == "") {
        this.label_name_validate = true;
        return false;
      } else {
        this.label_name_validate = false;
        return true;
      }
    }
  }
};
</script>

<style>
.app_title {
  font-size: 25px;
  margin-top: 50px;
}
.form-container {
  margin: auto;
}
.validate {
  color: red;
}
.success {
  font-size: 20px;
  color: green;
}
@media screen and (min-width: 480px) {
  .form-container {
    width: 90%;
  }
}
@media screen and (min-width: 767px) {
  .form-container {
    width: 70%;
  }
}
@media screen and (min-width: 950px) {
  .form-container {
    width: 50%;
  }
}
</style>
