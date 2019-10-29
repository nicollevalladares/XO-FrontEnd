<template>
  <div id="signup">
    <div class="container">
      <form>
        <div>
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 center">
            <h1>Signup</h1>
            <hr>
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" class="form-control" v-model="userData.username">
            </div>

            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" class="form-control" v-model="userData.name">
            </div>
          </div>

          
        </div>

        <p class="feedback">{{feedback}}</p>

        <div>
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 center">
            <button class="btn btn-primary" @click.prevent="signup">Registrarse
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./js/signUp.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./css/signUp.css"></style>
