<template>
  <div class="grid-2">
    <div class="select-box">
      <div class="options-container" :class="{ active: dropdownIsOpen }">
        <div
          v-for="songKey in allMusicKeys"
          :key="keyNumber + songKey.key"
          class="option"
          :name="keyNumber"
          @click="setKey(songKey)"
        >
          <input
            :id="keyNumber + songKey.key" 
            type="radio" 
            class="radio"
            name="category"
          />
          <label :for="keyNumber + songKey.key">{{ songKey.key }}</label>
        </div>
      </div>
      <div class="selected" @click="toggleDropdown">
        <span>Key{{ keyNumber === 'secondKey' ? ' 2' : null }}: {{ selectedKey }}</span>
      </div>
    </div>
    <div v-if="showQualities" class="qualities">
      <input
        :id="keyNumber + 'major'"
        value="major"
        type="radio"
        :name="keyNumber"
        :checked="selectedQuality === 'major'"
      />
      <label :for="keyNumber + 'major'" @click="setKeyWithQuality('major')">
        Maj
      </label>
      <input
        :id="keyNumber + 'minor'"
        type="radio"
        :name="keyNumber"
        value="minor"
        :checked="selectedQuality === 'minor'"
      />
      <label :for="keyNumber + 'minor'" @click="setKeyWithQuality('minor')">
        Min
      </label>
    </div>
  </div>
  <span style="margin-top:auto">{{ keyNotes }}</span>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, watch } from "vue";
import { useStore} from "vuex";

const store = useStore();
const props = defineProps( ["keyNumber", "musicKey", "keyNotes"]);
const emit = defineEmits(["keySelected"]);

const dropdownIsOpen = ref(false);
const showQualities = ref(false);
const selectedKey = ref(null);
const selectedQuality = ref(null);

const allMusicKeys = computed(() => store.getters.getMusicKeys);

function toggleDropdown() {
  dropdownIsOpen.value = !dropdownIsOpen.value;
}

function setKey(data) {
  selectedKey.value = data.key;
  showQualities.value = true;
  toggleDropdown();
  if (selectedQuality.value) {
    callEmit();
  }
}

function setKeyWithQuality(quality) {
  selectedQuality.value = quality;
  callEmit();
}

function callEmit() {
  const newKey = selectedKey.value + ' ' + selectedQuality.value;
  emit('keySelected', { keyWithQuality: newKey, keyNumber: props.keyNumber});
}

watch(
  () => props.musicKey,
  (newsongKey) => {
    if(newsongKey) {
      [selectedKey.value, selectedQuality.value] = props.musicKey.split(' ');
      showQualities.value = true;
    }
  }
);
</script>

<style lang="scss" scoped>
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}
.qualities {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: flex-end;
}
.qualities input[type="checkbox"],
.qualities input[type="radio"] {
  display: none;
}
.qualities input[type="checkbox"] + label,
.qualities input[type="radio"] + label {
  transition: all 500ms ease;
  cursor: pointer;
  border-radius: 4px;
  background-color: #fff;
  padding: 6px;
  text-align: center;
  border: none;
  display: inline-block;
  user-select: none;
  text-transform: capitalize;
  font-size: 15px;
  font-weight: 600;

  margin-top: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.qualities input[type="checkbox"]:checked + label,
.qualities input[type="radio"]:checked + label {
  transition: all 500ms ease;
  background-color: var(--dark_gray_font);
  color: #fff;
}

/*  */
.select-box {
  display: flex;
  width: 10.875rem;
  flex-direction: column;
  position: relative;
  z-index: 20;
  user-select: none;
}
.select-box .options-container {
  background: #fff;
  max-height: 0;
  width: 100%;
  text-align: center;
  opacity: 0;
  transition: all 0.4s;
  border-radius: 4px;
  overflow: hidden;
  order: 1;
  position: absolute;
}
.selected {
  box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
  background-color: #fff;
  position: relative;
  color: inherit;
  order: 0;
  border-radius: 4px;
  text-transform: capitalize;
}
.selected:before {
  content: "";
  position: absolute;
  top: 14px;
  right: 12px;
  width: 6px;
  height: 6px;
  border: 2px solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.85) rgba(0, 0, 0, 0.85);
  transform: rotate(-45deg);
  transition: all 0.3s ease;
}

.select-box .options-container.active {
  opacity: 1;
  max-height: 210px;
  overflow-y: scroll;

  position: absolute;
  top: 50px;
}
.select-box .options-container.active + .selected:before {
  top: 18px;
  transform: rotate(-225deg);
}
.select-box .option,
.selected {
  padding: 12px 20px;
  cursor: pointer;
}
.select-box .option:hover {
  background-color: var(--f1_gray);
}

.select-box label {
  cursor: pointer;
}

.select-box .option .radio {
  display: none;
}

.secondOption {
  justify-self: center;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
.secondOption #secondSelectOption {
  display: inline-block;
  width: 20px;
  margin-top: 0;
  height: 18px;
}
</style>