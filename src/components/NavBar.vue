<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="/users">Usuarios</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/vehicles">Vehículos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/professions">Profesiones</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/municipalities">Municipios</a>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
export default {
  name: "NavBar"
};
</script>

<style>
.navbar {
  float: right;
}
</style>

