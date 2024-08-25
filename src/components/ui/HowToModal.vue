<template>
  <div
    id="modal"
    class="modal-wrapper"
    @click.self="closeYtModal"
  >
    <div class="modal">
      <div class="modal-header">
        <h3>How to insert valid Youtube link</h3>
      </div>
      <div class="modal-body">
        <img src="@/assets/yt_link.webp" alt="How to insert youtube link to display video" title="How to insert youtube link to display video" />
      </div>
      <div class="modal-footer">
        <button @click="closeYtModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["closeModal"]);
function closeYtModal() {
  emit("closeModal");
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  @include modal-wrapper;
}
.modal {
  @include center-inner-modal;
  width: 23.75rem;
  max-width: 95%;
}

@media (min-width: 768px) {
  .modal {
    width: 50rem;
  }
}
.modal-header {
  background: var(--burgundy);
  color: #fff;
  padding: 1rem 0;

  h3 {
    margin: 0;
  }
}


.modal-body {
  padding: 1rem 1.25rem;

  img {
    width: 100%;
    height: 100%;
  }
}

.modal-footer {
  background-color: #eee;
  padding: 1rem 0;
}

button {
  background-color: var(--burgundy);
  border-radius: 3.125rem;
  border: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  color: #fff;
  cursor: pointer;
  padding: 0.625rem 1.5625rem;
  transition: all 0.1s ease-in-out;

  &:active {
    opacity: 0.8;
  }
  &:focus {
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
}

</style>