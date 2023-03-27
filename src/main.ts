import { createApp } from "vue";
import { useDrumStore } from "./stores/drum";
import { createPinia } from "pinia";
import './assets/main.css';
import HomeView from "./views/HomeView.vue";
import SoundEngine from "./audio/soundEngine";

const pinia = createPinia();
const app = createApp(HomeView);

app.use(pinia);

const store = useDrumStore(pinia);

const soundEngine = SoundEngine.getInstance();
soundEngine.store = store;

app.mount("#app");