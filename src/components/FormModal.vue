<template>
  <v-dialog v-model="show" max-width="500px" persistent>
    <v-card>
      <v-card-title>Preencha os dados</v-card-title>
      <v-form id="modalForm">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Digite o nome do lead*"
                  required
                  v-model="input.name"
                  name="name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Digite o email do lider*"
                  required
                  v-model="input.email"
                  name="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Digite o telefone do lead*"
                  type="phone"
                  required
                  v-model="input.phone"
                  name="phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" data-app>
                <v-select
                  :items="items"
                  item-text="state"
                  item-value="abbr"
                  label="Status"
                  persistent-hint
                  return-object
                  single-line
                  v-model="input.status"
                  name="status"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-form>
      <v-card-actions>
        <v-btn color="primary" text @click.stop="show = false">Cancelar</v-btn>
        <v-btn color="primary" text @click.stop="show = false" @click="insert"
          >Cadastrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services";
export default {
  props: {
    value: Boolean,
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  data() {
    return {
      items: ["on-hold", "in-progress", "needs-review", "approved"],
      input: {
        name: "",
        phone: "",
        email: "",
        status: "",
      },
      alertData: {
        type: "",
        msg: "",
      },
    };
  },
  methods: {
    async insert(event) {
      event.preventDefault();
      console.log(this.input);
      try {
        await api.post("/leads", this.input).then((res) => {
          if (res) {
            this.alertData.msg = "Lider cadastrado com sucesso";
            this.alertData.type = "success";
            this.$emit("post-alert", this.alertData);
          }
        });
      } catch (error) {
        this.alertData.msg = error.response.data.message;
        this.alertData.type = "error";
        this.$emit("post-alert", this.alertData);
      }
    },
  },
};
</script>
