<template>
  <div class="auth-page">
    <v-row align="center" justify="center">
      <v-col xs="12" sm="6" md="8" lg="4">
        <v-card class="px-4 py-4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field :rules="emailRules" label="Email" v-model="email"></v-text-field>
            <v-text-field :rules="nameRules" v-if="formTypeIsRegister" label="First Name" v-model="firstName"></v-text-field>
            <v-text-field :rules="nameRules" v-if="formTypeIsRegister" label="Last Name" v-model="lastName"></v-text-field>
            <v-text-field :rules="passwordRules" label="Password" v-model="password" type="password"></v-text-field>
            <v-text-field :rules="passwordRules" v-if="formTypeIsRegister" label="Password Configm" v-model="passwordConfirm" type="password"></v-text-field>
            <v-btn class="mt-4" v-text="submitText" block color="primary" @click="submit"></v-btn>
            <v-btn class="mt-4" text small v-text="switchFormText" @click="toggleFormType"></v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

const FORM_TYPES = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default {
  name: 'AuthPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      valid: false,
      formType: FORM_TYPES.LOGIN,
      emailRules: [(v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      nameRules: [
        (v) => (v && v.length >= 2) || 'Name and Last Name must be at least 2 characters',
        (v) => (v && v.length <= 50) || 'Name and Last Name must be less than 50 characters',
      ],
      passwordRules: [
        (v) => (v && v.length >= 6) || 'Passwords must be at least 6 characters',
        (v) => (v && v.length <= 10) || 'Passwords must be less than 10 characters',
      ],
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
          this.$router.push('/active');
        }
      } catch (err) {
        this.$root.notification.error(err?.response?.data?.message || 'Something went wrong');
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

  .form {
  }
}
</style>
