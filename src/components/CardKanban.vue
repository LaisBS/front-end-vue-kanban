<template>
  <div>
    <div id="head">
      <v-text-field
        :placeholder="value.title"
        :dark="true"
        dense
        v-model="input.title"
      ></v-text-field>

      <span @click.stop="exclude(id)">X</span>
    </div>
    <div>
      <v-text-field
        v-model="input.email"
        :placeholder="value.email"
        :dark="true"
        dense
      ></v-text-field>
      <v-text-field
        :placeholder="value.phone"
        :dark="true"
        dense
        v-model="input.phone"
      ></v-text-field>
      <v-btn elevation="2" x-small @click.stop="editBlock(id, list)"
        >Salvar</v-btn
      >
    </div>
  </div>
</template>
<script>
import api from "@/services";
export default {
  name: "CardKanban",
  props: {
    value: {
      type: Object,
    },
    id: {
      type: Number,
    },
    list: {
      type: Array,
    },
  },

  data() {
    return {
      input: {
        email: "",
        title: "",
        phone: "",
      },
      updatedData: {
        status: "",
        id: "",
      },
      alertData: {
        type: "",
        msg: "",
      },
    };
  },

  methods: {
    async exclude(id) {
      try {
        await api.delete(`/leads/${id}`).then((res) => {
          if (res) {
            this.alertData.msg = "Lider editado com sucesso";
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
    editBlock(id, list) {
      let bloco = list.find((b) => b.id === Number(id));
      if (this.input.title) {
        bloco.name = this.input.title;
      }
      if (this.input.email) {
        bloco.email = this.input.email;
      }
      if (this.input.phone) {
        bloco.phone = this.input.phone;
      }
      console.log(bloco);

      this.$emit("post-updated");
    },
  },
};
</script>
