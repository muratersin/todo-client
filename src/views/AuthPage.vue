<template>
  <div class="auth-page">
    <v-row align="center" justify="center">
      <v-col xs="12" sm="6" md="8" lg="4">
        <div class="text-center mx-2 py-4">
          <AppLogo />
        </div>
        <v-card class="px-4 py-4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field :rules="emailRules" label="Email" v-model="email"></v-text-field>
            <v-text-field :rules="nameRules" v-if="formTypeIsRegister" label="First Name" v-model="firstName"></v-text-field>
            <v-text-field :rules="nameRules" v-if="formTypeIsRegister" label="Last Name" v-model="lastName"></v-text-field>
            <v-text-field :rules="passwordRules" label="Password" v-model="password" type="password"></v-text-field>
            <v-text-field :rules="passwordRules" v-if="formTypeIsRegister" label="Password Configm" v-model="passwordConfirm" type="password"></v-text-field>
            <v-btn class="mt-4" v-text="submitText" block color="primary" @click="submit" :loading="loading"></v-btn>
            <v-btn class="mt-4" text small v-text="switchFormText" @click="toggleFormType"></v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AppLogo from '../components/AppLogo.vue';

const FORM_TYPES = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default {
  name: 'AuthPage',
  components: { AppLogo },
  data() {
    return {
      loading: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      valid: false,
      formType: FORM_TYPES.LOGIN,
      emailRules: [(v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      nameRules: [(v) => (v && v.length >= 2 && v.length <= 50) || 'Name and Last Name must be between 2-50 characters long'],
      passwordRules: [(v) => (v && v.length >= 6 && v.length <= 10) || 'Passwords must be between 6-10 characters long'],
    };
  },
  computed: {
    submitText() {
      return this.formTypeIsRegister ? 'Register' : 'Login';
    },
    switchFormText() {
      return this.formTypeIsRegister ? 'Login' : 'Register';
    },
    formTypeIsRegister() {
      return this.formType === FORM_TYPES.REGISTER;
    },
  },
  methods: {
    ...mapActions(['login', 'register']),
    validateForm() {
      return this.$refs.form.validate();
    },
    resetForm() {
      return this.$refs.form.reset();
    },
    toggleFormType() {
      this.formType = this.formTypeIsRegister ? FORM_TYPES.LOGIN : FORM_TYPES.REGISTER;
    },
    async submit() {
      try {
        if (!this.validateForm()) {
          return;
        }
        this.loading = true;
        const payload = {
          email: this.email,
          password: this.password,
        };
        if (this.formTypeIsRegister) {
          payload.firstName = this.firstName;
          payload.lastName = this.lastName;
          await this.register(payload);
          this.$root.notification.success('User successfully registered');
          this.resetForm();
          this.formType = FORM_TYPES.LOGIN;
        } else {
          await this.login(payload);
          this.$router.push('/actives');
        }
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.$root.notification.error(err?.response?.data?.message);
      }
    },
  },
};
</script>

<style lang="scss">
.auth-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
