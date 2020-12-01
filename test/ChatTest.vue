<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      expand-separator
      icon="mail"
      label="Inbox"
      caption="5 unread emails"
      default-opened>


      <q-separator />
      <q-item-label header>Offline</q-item-label>

    </q-expansion-item>



  </q-list>
</template>

<script>
  export default {
    name: "ChatTest"
  }
</script>

<style scoped>

</style>
