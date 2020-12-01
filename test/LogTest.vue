<template>
  <div>

    <!--          <q-dialog v-model="registerPersistent">-->
    <!--            <q-card style="width: 400px" class="q-pa-md">-->
    <!--              <q-form-->
    <!--                @submit="onSubmit"-->
    <!--                @reset="onReset"-->
    <!--                class="q-gutter-md">-->
    <!--                <q-input-->
    <!--                  filled-->
    <!--                  v-model="user.email"-->
    <!--                  label="Your email *"-->
    <!--                  lazy-rules-->
    <!--                  :rules="[ val => val && val.length > 0 || 'Please type something']"-->
    <!--                />-->

    <!--                <q-input-->
    <!--                  filled-->
    <!--                  v-model="user.password"-->
    <!--                  label="Your password *"-->
    <!--                  lazy-rules-->
    <!--                  :rules="[ val => val && val.length > 0 || 'Please type something']"-->
    <!--                />-->

    <!--                <q-input-->
    <!--                  filled-->
    <!--                  v-model="user.username"-->
    <!--                  label="Your username *"-->
    <!--                  lazy-rules-->
    <!--                  :rules="[ val => val && val.length > 0 || 'Please type something']"-->
    <!--                />-->

    <!--                <q-toggle v-model="accept" label="确认填写的信息" />-->

    <!--              </q-form>-->

    <!--              <q-card-actions class="bg-white text-teal">-->
    <!--                <q-btn flat label="Cancel" v-close-popup />-->
    <!--                <q-space />-->
    <!--                <q-btn label="Submit" type="submit" color="primary" v-close-popup />-->
    <!--              </q-card-actions>-->

    <!--            </q-card>-->
    <!--          </q-dialog>-->





    <!--          <q-dialog v-model="loginPersistent" persistent transition-show="scale" transition-hide="scale">-->
    <!--            <q-card class="bg-white text-teal q-pa-md" style="width: 400px">-->
    <!--              <q-form-->
    <!--                @submit="onSubmit"-->
    <!--                @reset="onReset"-->
    <!--                class="q-gutter-md">-->
    <!--                <q-input-->
    <!--                  filled-->
    <!--                  v-model="user.email"-->
    <!--                  label="Your email *"-->
    <!--                  lazy-rules-->
    <!--                  :rules="[ val => val && val.length > 0 || 'Please type something']"-->
    <!--                />-->

    <!--                <q-input-->
    <!--                  filled-->
    <!--                  v-model="user.password"-->
    <!--                  label="Your password *"-->
    <!--                  lazy-rules-->
    <!--                  :rules="[ val => val && val.length > 0 || 'Please type something']"-->
    <!--                />-->
    <!--              </q-form>-->

    <!--              <q-card-actions class="bg-white text-teal">-->
    <!--                <q-btn flat label="Cancel" v-close-popup />-->
    <!--                <q-space />-->
    <!--                <q-btn label="Login" type="submit" color="primary" v-close-popup />-->
    <!--              </q-card-actions>-->
    <!--            </q-card>-->
    <!--          </q-dialog>-->

  </div>
</template>

<script>
  export default {
    name: "LogTest"
  }
</script>

<style scoped>

</style>
