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
          <div v-if="label_password_validate" class="validate">Por favor ingrese la contraseña</div>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Ingrese la contraseña"
          />
        </div>
        <div class="form-group">
          <div
            v-if="label_password_confirmate_validate"
            class="validate"
          >Por favor repita la contraseña</div>
          <input
            type="password"
            class="form-control"
            v-model="password_confirmation"
            placeholder="Repita la contraseña"
          />
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
        <button @click="saveUsers" class="btn btn-success btn-lg">Save</button>
      </div>
      <div>
        <div v-if="msg_success" class="success">
          Usuario guardado!
          Ver usuarios
          <router-link to="/users">Usuarios</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "saveUsers",
  mounted() {
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
    saveUsers() {
      let validation = this.validation();
      if (validation) {
        axios
          .post("http://localhost:8000/api/users", {
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
            this.name = "";
          })
          .catch(error => {
            // cómo capturar el error con estatus 422
            // para mostrar mensaje o swit alert al usuario
            // contraseña repetida o email con formato malo
            //console.log(error.errors);
            //this.msg_validate_record = false;
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
        this.label_first_name_validate = false
        this.label_last_name_validate = false
        this.label_email_validate = false
        this.label_password_validate = false
        this.label_password_confirmate_validate = false
        this.label_phone_validate = false
        this.label_address_validate = false
        this.label_birthdate_validate = false
        this.label_gender_validate = false
        this.label_vehicle_id_validate = false
        this.label_profession_id_validate = false
        this.label_municipality_id_validate = false

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
.form-users{
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
