<template>
  <div class="transition">
    <header>
      <div class="containerCabecalho">
        <h2 id="bemVindo">Bem vindo!</h2>
        <v-btn v-on:click="logout" elevation="2" large>Logout</v-btn>
      </div>
    </header>
    <CanvasKanbanVue />
  </div>
</template>

<script>
import CanvasKanbanVue from "@/components/CanvasKanban.vue";
export default {
  name: "DashboardView",
  methods: {
    logout() {
      localStorage.removeItem("@Solomon:token");
      this.$router.push({ name: "home" });
    },
  },
  components: {
    CanvasKanbanVue,
  },
};
</script>

<style>
header {
  width: 100vw;
  border-bottom: 2px solid #212529;
}
.containerCabecalho {
  display: flex;
  height: 10vh;
  width: 65vw;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}
#bemVindo {
  color: #f8f9fa;
}

.transition {
  animation: transition 2s ease-in-out;
  opacity: 1;
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
