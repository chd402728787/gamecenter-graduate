<template>
  <div class="person">
    <PersonNality></PersonNality>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import PersonNality from '@/components/User/PersonNality.vue';
@Options({
  components: {
    PersonNality
  }
})
export default class PersonNalityView extends Vue {}
</script>
