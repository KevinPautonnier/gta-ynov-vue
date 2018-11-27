
<template>
  <div id="employee_sheet">
    <label for="birthdate">Date de naissance</label>
    <input type="date" id="birthdate" v-model="birthdate">
    <label for="address">Adresse</label>
    <input type="input" id="address" v-model="address">
    <label for="phone">Numéro de téléphone</label>
    <input type="text" id="phone" v-model="phone">
    <label for="mail">Adresse mail</label>
    <input type="mail" id="mail" v-model="mail">
    <button v-on:click="saveData()"> Sauvegardé </button>
  </div>
</template>

<script>
  export default {
    data () {
      return{
        birthdate: sessionStorage.getItem("birthdate"),
        address: sessionStorage.getItem("address"),
        phone: sessionStorage.getItem("phone"),
        mail: sessionStorage.getItem("email")
      }
    },

    methods: {
      saveData(){
        sessionStorage.setItem("birthdate", this.birthdate),
        sessionStorage.setItem("address", this.address),
        sessionStorage.setItem("phone", this.phone),
        sessionStorage.setItem("email", this.mail)
      }
    }
  }
</script>



     