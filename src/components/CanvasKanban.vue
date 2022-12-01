<template>
  <div data-app id="mainContainer">
    <FormModal v-model="showModalForm" @post-alert="modalData" />
    <v-alert
      v-if="msg"
      :ligth="true"
      :color="type"
      dismissible
      :type="type"
      id="alert"
      >{{ msg }}</v-alert
    >
    <v-btn
      color="accent"
      :dark="true"
      large
      @click.stop="showModalForm = true"
      id="newlead"
      >Adicionar novo lead</v-btn
    >
    <div id="containerDashboard" class="transition">
      <kanban-board
        :stages="stages"
        :blocks="blocks"
        @update-block="updateBlock"
      >
        <div v-for="stage in stages" :slot="stage" :key="stage">
          <h2>{{ stage }}</h2>
        </div>
        <CardKanban
          v-for="block in blocks"
          :slot="block.id"
          :key="block.id"
          :value="block"
          :id="block.id"
          :list="blocks"
          @post-alert="modalData"
          @post-updated="updateBlock(block.id, block.status)"
        />
      </kanban-board>
    </div>
  </div>
</template>

<script>
import api from "@/services";
import CardKanban from "./CardKanban.vue";
import FormModal from "./FormModal.vue";
export default {
  name: "CanvasKanban",
  data() {
    return {
      stages: ["on-hold", "in-progress", "needs-review", "approved"],
      blocks: [],
      showModalForm: false,
      removeOnSpill: true,
      msg: "",
      type: "",
      editableBlock: false,
    };
  },
  components: {
    FormModal,
    CardKanban,
  },
  created() {
    this.getInfo();
  },

  methods: {
    async getInfo() {
      try {
        await api.get("/leads").then((res) => {
          this.blocks = [];
          res.data.map((elem) =>
            this.blocks.push({
              id: elem.id,
              status: elem.status,
              title: elem.name,
              email: elem.email,
              phone: elem.phone,
            })
          );
        });
      } catch (err) {
        this.type = "error";
        this.msg = err.response.data.message;
        setTimeout(() => {
          this.msg = "";
        }, "3000");
      }
    },
    async updateBlock(id, status) {
      this.blocks.find((b) => b.id === Number(id)).status = status;
      let block = this.blocks.find((b) => b.id === Number(id));
      try {
        await api.patch(`/leads/${block.id}`, block).then((res) => {
          this.getInfo();

          return res;
        });
      } catch (err) {
        this.type = "error";
        this.msg = err.response.data.message;
        setTimeout(() => {
          this.msg = "";
        }, "3000");
      }
    },

    modalData(alertData) {
      this.msg = alertData.msg;
      this.type = alertData.type;
      this.getInfo();
      setTimeout(() => {
        this.msg = "";
      }, "3000");
    },
  },
};
</script>

<style>
ul.drag-inner-list .drag-item {
  height: auto;
}
.drag-column-on-hold .drag-column-header {
  background: #fb7d44;
}
.drag-column-in-progress .drag-column-header {
  background: #2a92bf;
}
.drag-column-needs-review .drag-column-header {
  background: #f4ce46;
}
.drag-column-approved .drag-column-header {
  background: #00b961;
}

#head {
  display: flex;
  justify-content: space-between;
}
#head span {
  color: black;
}
#head span:hover {
  cursor: pointer;
  font-weight: 1000;
  color: white;
}
.transition {
  animation: transition 2s ease-in-out;
  opacity: 1;
}
.newCard {
  color: white;
  cursor: pointer;
}
#mainContainer {
  max-width: 65vw;
  margin: auto;
  margin-top: 10px;
}
#alert {
  max-width: 25vw;
}
@keyframes transition {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
