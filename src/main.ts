import { createApp } from "vue";
import { useDrumStore } from "./stores/drum";
import { createPinia } from "pinia";
import PadFieldVue from "./components/PadField.vue";
import './assets/main.css';
import SoundEngine from "./audio/soundEngine";

const pinia = createPinia();
const app = createApp(PadFieldVue);

app.use(pinia);

const store = useDrumStore(pinia);

const soundEngine = SoundEngine.getInstance();
soundEngine.store = store;

app.mount("#app");