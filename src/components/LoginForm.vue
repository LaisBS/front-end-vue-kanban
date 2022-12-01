<template>
  <v-card elevation="2" :dark="true" tile :hover="true" id="login">
    <v-form v-model="valid" v-on:submit.prevent="insert">
      <v-card-title> Login </v-card-title>
      <v-container>
        <v-col>
          <v-row cols="4" md="3">
            <v-text-field
              :dark="true"
              v-model="input.email"
              :rules="emailRules"
              label="Email"
              required
            ></v-text-field>
          </v-row>

          <v-row cols="12" md="4">
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :dark="true"
              v-model="input.password"
              :rules="passwordRules"
              :type="show ? 'text' : 'password'"
              label="Passoword"
              hint="At least 4 characters"
              required
              @click:append="show = !show"
            ></v-text-field>
          </v-row>
        </v-col>
      </v-container>
      <v-btn color="#0D47A1" elevation="2" type="submit">Entrar</v-btn>
    </v-form>
  </v-card>
</template>

<script>
const url = "http://127.0.0.1:3333/authenticate";
import axios from "axios";
export default {
  name: "LoginForm",
  data() {
    return {
      valid: false,
      show: false,
      input: {
        email: "",
        password: "",
      },
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 4 || "Min 4 characters",
      ],
      msg: "",
      disabled: false,
    };
  },
  methods: {
    insert(event) {
      event.preventDefault();
      axios
        .post(url, this.input)
        .then((res) => {
          const { token } = res.data;
          localStorage.setItem("@Solomon:token", token);
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          this.msg = error.response.data.message;
          this.disabled = true;
          setTimeout(() => {
            this.msg = "";
            this.disabled = false;
          }, "3000");
        });
    },
  },
};
</script>

<style>
#login {
  margin-top: 30vh;
}
.v-form {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.v-card {
  width: 30vw;
  margin: auto;
}
.v-card__title {
  font-size: 2rem;
}
</style>
