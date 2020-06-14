<template>
  <div>
    <p class="app_title">Actualizar Vehículo</p>

    <div class="form-container">
      <div class="form-group">
        <div v-if="label_brand_validate" class="validate">Por favor ingrese la marca</div>
        <input type="text" class="form-control" v-model="brand" placeholder="Ingrese la marca" />
      </div>
      <div class="form-group">
        <div v-if="label_year_validate" class="validate">Por favor ingrese el año</div>
        <input type="text" class="form-control" v-model="year" placeholder="Ingrese el año" />
      </div>
      <div class="form-group">
        <button @click="updateVehicle" class="btn btn-success btn-lg">Update</button>
      </div>
      <div>
        <div v-if="msg_success" class="success">
          Vehiclulo actualizado!
          Ver vehículo
          <router-link to="/vehicles">Vehículos</router-link>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";

export default {
  name: "updateVehicle",
  mounted() {
    this.getVehicle();
  },
  data() {
    return {
      brand: "",
      year: "",
      label_brand_validate: false,
      label_year_validate: false,
      msg_success: false
    };
  },
  methods: {
    async getVehicle() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `http://localhost:8000/api/vehicles/${this.$route.params.id}`
        );
        this.brand = response.data.brand;
        this.year = response.data.year;
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    updateVehicle() {
      let validation = this.validation();
      if (validation) {
        axios
          .put(`http://localhost:8000/api/vehicles/${this.$route.params.id}`, {
            brand: this.brand,
            year: this.year
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
      if (this.brand == "" || this.year == "") {
        if (this.brand == "") {
          this.label_brand_validate = true;
        } else {
          this.label_brand_validate = false;
        }
        if (this.year == "") {
          this.label_year_validate = true;
        } else {
          this.label_year_validate = false;
        }
        return false;
      } else {
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
