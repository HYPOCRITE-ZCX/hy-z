<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      animated
      active-color="deep-orange"
      done-color="secondary">
      <q-step
        :name="1"
        title="Select campaign settings"
        icon="settings"
        :done="step > 1">
        <q-card class="bg-white text-teal q-pa-md" style="width: 400px">
          <q-form @submit="onSubmit"
                  class="q-gutter-md">

            <q-input filled
                     v-model="userLoginInfo.email"
                     label="Your email *"
                     lazy-rules
                     :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input outlined bottom-slots
                     v-model="userRegisterInfo.verificationCode"
                     :rules="[ val => val && val.length > 0 || 'Please type something']"
                     label="Your email *"
                     counter
                     maxlength="12">
              <template v-slot:hint>
                输入验证码
              </template>
              <template v-slot:after>
                <q-btn dense flat label="发送验证码" />
              </template>
            </q-input>

            <q-input outlined bottom-slots
                     v-model="userRegisterInfo.verificationCode"
                     :rules="[ val => val && val.length > 0 || 'Please type something']"
                     label="Verification code"
                     counter
                     maxlength="12">
              <template v-slot:after>
                <q-btn dense flat label="验证" />
              </template>
            </q-input>
          </q-form>
        </q-card>
      </q-step>

      <q-step
        :name="2"
        title="Create an ad group"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2">
        An ad group contains one or more ads which target a shared set of keywords.
      </q-step>

      <q-step
        :name="3"
        title="Create an ad"
        icon="add_comment">
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" color="deep-orange" :label="step === 3 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="deep-orange" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data () {
      return {
        step: 1
      }
    }
  }
</script>

<style scoped>

</style>
