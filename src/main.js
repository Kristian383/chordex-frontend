import { createApp } from 'vue';
import { Dropdown } from 'floating-vue';
import 'floating-vue/dist/style.css';

import { faHeart as HeartRegular, faCopy, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faPenSquare, faEye, faSearch, faMusic, faSignOutAlt, faUserAlt, faGuitar, faPlusSquare, faEdit, faStar, faHistory, faClipboard, faClipboardList, faQuestionCircle, faPlayCircle, faHeadphones, faHeart, faVolumeUp, faArrowLeft, faTrashAlt, faMoon, faSun, faMapPin, faCheckSquare, faSave, faLock, faEnvelope, faAngleRight, faAngleLeft, faStickyNote, faArrowUp, faEyeSlash, faLockOpen, faPauseCircle, faMinus, faPlus, faDrum, faListUl, faUsers, faChevronDown, faChevronUp, faEllipsisV, faTimes, faCheckCircle, faExclamationCircle, faPen, faSortAmountDownAlt, faCog, faChevronLeft, faChevronRight, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from "./router.js";
import store from "./store/index.js";
import BaseCard from "./components/ui/BaseCard.vue";
import TheLoader from "./components/ui/TheLoader.vue";
import ScrollUp from "./components/ui/ScrollUp.vue";

library.add(
    faBars, faEye, faSearch, faPenSquare, faMusic, faSignOutAlt, faHeart,
     faUserAlt, faGuitar, faPlusSquare, faEdit, faStar, faHistory, faClipboard,
      faClipboardList, faQuestionCircle, faPlayCircle, faHeadphones,
       faVolumeUp, faArrowLeft, faTrashAlt, HeartRegular, faMoon, faSun, faMapPin,
        faTimesCircle, faCheckSquare, faSave, faLock, faEnvelope, faAngleRight, faAngleLeft,
         faStickyNote, faArrowUp, faEyeSlash, faAngleLeft, faAngleRight, faLockOpen,
          faPauseCircle, faMinus, faPlus, faDrum, faListUl, faUsers, faChevronDown,
           faChevronUp, faEllipsisV, faTimes, faCheckCircle, faExclamationCircle,
           faPen, faSortAmountDownAlt, faCog, faChevronLeft, faChevronRight, faCopy,
           faSearchMinus
           );

const app = createApp(App);

app.component('FontAwesomeIcon', FontAwesomeIcon);
app.component('BaseCard', BaseCard);
app.component('TheLoader', TheLoader);
app.component('ScrollUp', ScrollUp);
app.component('VDropdown', Dropdown);

app.use(router);
app.use(store);

app.mount('#app');
