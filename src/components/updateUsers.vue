<template>
  <div>
    <p class="app_title">Guardar Usuario</p>
    <div class="form-container form-users">
      <div>
        <div class="form-group">
          <div v-if="label_first_name_validate" class="validate">Por favor ingrese el nombre</div>
          <input
            type="text"
            class="form-control"
            v-model="first_name"
            placeholder="Ingrese el nombre"
          />
        </div>
        <div class="form-group">
          <div v-if="label_last_name_validate" class="validate">Por favor ingrese el apellido</div>
          <input
            type="text"
            class="form-control"
            v-model="last_name"
            placeholder="Ingrese el apellido"
          />
        </div>
        <div class="form-group">
          <div v-if="label_email_validate" class="validate">Por favor ingrese el email</div>
          <input type="email" class="form-control" v-model="email" placeholder="Ingrese el email" />
        </div>
        <div class="form-group">
          <div v-if="label_phone_validate" class="validate">Por favor ingrese el teléfono</div>
          <input type="text" class="form-control" v-model="phone" placeholder="Ingrese el teléfono" />
        </div>
        <div class="form-group">
          <div v-if="label_address_validate" class="validate">Por favor ingrese la dirección</div>
          <input
            type="text"
            class="form-control"
            v-model="address"
            placeholder="Ingrese la dirección"
          />
        </div>
        <div class="form-group">
          <div
            v-if="label_birthdate_validate"
            class="validate"
          >Por favor ingrese la fecha de nacimiento</div>
          <input
            type="date"
            class="form-control"
            v-model="birthdate"
            placeholder="Ingrese la fecha de nacimiento"
          />
        </div>
      </div>
      <div>
        <div class="form-group">
          <div v-if="label_gender_validate" class="validate">Por favor ingrese el género</div>
          <select name="gender" v-model="gender" class="form-control">
            <option value selected>Seleccione género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div class="form-group">
          <div v-if="label_vehicle_id_validate" class="validate">Por favor ingrese el vehículo</div>
          <select
            name="vehicles"
            v-model="vehicle_id"
            v-on:change="vehicleSelected()"
            class="form-control"
          >
            <option value selected>Seleccione vehículo</option>
            <option
              v-for="vehicle in vehicles"
              :value="vehicle.id"
              :key="vehicle.id"
            >{{ vehicle.brand }} {{ vehicle.year }}</option>
          </select>
        </div>
        <div class="form-group">
          <div v-if="label_profession_id_validate" class="validate">Por favor ingrese la profesión</div>
          <select
            name="professions"
            v-model="profession_id"
            v-on:change="professionSelected()"
            class="form-control"
          >
            <option value selected>Seleccione profesión</option>
            <option
              v-for="profession in professions"
              :value="profession.id"
              :key="profession.id"
            >{{ profession.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <div v-if="label_municipality_id_validate" class="validate">Por favor ingrese el municipio</div>
          <select
            name="municipalities"
            v-model="municipality_id"
            v-on:change="municipalitySelected()"
            class="form-control"
          >
            <option value selected>Seleccione municipio</option>
            <option
              v-for="municipality in municipalities"
              :value="municipality.id"
              :key="municipality.id"
            >{{ municipality.name }}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <button @click="updateUsers" class="btn btn-success btn-lg">Update</button>
      </div>
      <div>
        <div v-if="msg_success" class="success">
          Usuario actualizado!
          Ver usuarios
          <router-link to="/users">Usuarios</router-link>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "updateUsers",
  mounted() {
    this.getUser();
    this.getVehicles();
    this.getProfessions();
    this.getMunicipalities();
  },
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
      address: "",
      birthdate: "",
      gender: "",
      vehicle_id: "",
      vehicles: [],
      profession_id: "",
      professions: [],
      municipality_id: "",
      municipalities: [],
      label_first_name_validate: false,
      label_last_name_validate: false,
      label_email_validate: false,
      label_password_validate: false,
      label_password_confirmate_validate: false,
      label_phone_validate: false,
      label_address_validate: false,
      label_birthdate_validate: false,
      label_gender_validate: false,
      label_vehicle_id_validate: false,
      label_profession_id_validate: false,
      label_municipality_id_validate: false,
      msg_success: false
    };
  },
  methods: {
    async getUser() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/${this.$route.params.id}`
        );
        this.first_name = response.data.first_name;
        this.last_name = response.data.last_name;
        this.email = response.data.email;
        this.phone = response.data.phone;
        this.address = response.data.address;
        this.password = response.data.password;
        this.password_confirmation = response.data.password_confirmation;
        this.birthdate = response.data.birthdate;
        this.gender = response.data.gender;
        this.vehicle_id = response.data.vehicle_id;
        this.profession_id = response.data.profession_id;
        this.municipality_id = response.data.municipality_id;
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    updateUsers() {
      let validation = this.validation();
      if (validation) {
        axios
          .patch(`http://localhost:8000/api/users/${this.$route.params.id}`, {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            phone: this.phone,
            address: this.address,
            birthdate: this.birthdate,
            gender: this.gender,
            vehicle_id: this.vehicle_id,
            profession_id: this.profession_id,
            municipality_id: this.municipality_id
          })
          .then(response => {
            console.log(response);
            this.msg_success = true;
            swal("Excelente!", "Usuario actualizado", "success");
          })
          .catch(error => {
            if (error.response.data.errors.password) {
              if (this.password !== this.password_confirmation) {
                swal(
                  "Error!",
                  "La contraseña debe ser igual a la confirmación de la contraseña",
                  "error"
                );
              } else {
                swal(
                  "Error!",
                  "La contraseña debe tener 8 caracteres como mínimo",
                  "error"
                );
              }
            }
            if (error.response.data.errors.email) {
              if (
                error.response.data.errors.email ==
                "The email has already been taken."
              ) {
                swal("Error!", "El email ya se encuentra registrado", "error");
              } else {
                swal("Error!", "El formato de email es inválido", "error");
              }
            }
          });
      }
    },
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
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    async getProfessions() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          "http://localhost:8000/api/professions"
        );
        response.data.forEach(element => {
          this.professions.push({
            id: element.id,
            name: element.name
          });
        });
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    async getMunicipalities() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          "http://localhost:8000/api/municipalities"
        );
        response.data.forEach(element => {
          this.municipalities.push({
            id: element.id,
            name: element.name
          });
        });
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    vehicleSelected() {
      console.log(this.vehicle_id);
    },
    professionSelected() {
      console.log(this.profession_id);
    },
    municipalitySelected() {
      console.log(this.municipality_id);
    },
    validation() {
      if (
        this.first_name == "" ||
        this.last_name == "" ||
        this.email == "" ||
        this.password == "" ||
        this.password_confirmation == "" ||
        this.phone == "" ||
        this.birthdate == "" ||
        this.address == "" ||
        this.gender == "" ||
        this.vehicle_id == "" ||
        this.profession_id == "" ||
        this.municipality_id == ""
      ) {
        if (this.first_name == "") {
          this.label_first_name_validate = true;
        } else {
          this.label_first_name_validate = false;
        }
        if (this.last_name == "") {
          this.label_last_name_validate = true;
        } else {
          this.label_last_name_validate = false;
        }
        if (this.email == "") {
          this.label_email_validate = true;
        } else {
          this.label_email_validate = false;
        }
        if (this.password == "") {
          this.label_password_validate = true;
        } else {
          this.label_password_validate = false;
        }
        if (this.password_confirmation == "") {
          this.label_password_confirmate_validate = true;
        } else {
          this.label_password_confirmate_validate = false;
        }
        if (this.phone == "") {
          this.label_phone_validate = true;
        } else {
          this.label_phone_validate = false;
        }
        if (this.address == "") {
          this.label_address_validate = true;
        } else {
          this.label_address_validate = false;
        }
        if (this.vehicle_id == "") {
          this.label_vehicle_id_validate = true;
        } else {
          this.label_vehicle_id_validate = false;
        }
        if (this.profession_id == "") {
          this.label_profession_id_validate = true;
        } else {
          this.label_profession_id_validate = false;
        }
        if (this.municipality_id == "") {
          this.label_municipality_id_validate = true;
        } else {
          this.label_municipality_id_validate = false;
        }
        return false;
      } else {
        // Se ejecuta cuando la validación viene del api
        this.label_first_name_validate = false;
        this.label_last_name_validate = false;
        this.label_email_validate = false;
        this.label_password_validate = false;
        this.label_password_confirmate_validate = false;
        this.label_phone_validate = false;
        this.label_address_validate = false;
        this.label_birthdate_validate = false;
        this.label_gender_validate = false;
        this.label_vehicle_id_validate = false;
        this.label_profession_id_validate = false;
        this.label_municipality_id_validate = false;

        return true;
      }
    }
  }
};
</script>

<style scoped>
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
.form-users {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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
    width: 90%;
  }
}
</style>
