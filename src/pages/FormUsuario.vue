<template>
    <q-page padding>
      <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="row q-col-gutter-sm">

        <q-input
          outlined
          v-model="formulario.nome"
          label="Nome"
          lazy-rules
          class="col-4"
          :rules="[val => val && val.length > 0 || 'Preencha o campo']"
        />

        <q-input
          outlined
          v-model="formulario.cargo"
          label="Cargo"
          lazy-rules
          class="col-4"
          :rules="[val => val && val.length > 0 || 'Preencha o campo']"
        />

        <q-select
          outlined
          v-model="formulario.nivel"
          :options="opcaoNivel"
          label="Nível"
          class="col-4"
          :rules="[val => val && val.length > 0 || 'Selecione um nível']"
        />
        <div class="col-12 q-gutter-sm">
            <q-btn
                label="Salvar"
                color="primary"
                class="float-right"
                icon="save"
                type="submit"/>
            <q-btn
                label="Cancelar"
                color="white"
                class="float-right"
                text-color="primary"
                :to="{ name: 'home' }"
            />
        </div>
      </q-form>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { userService } from 'src/service/userService'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'FormUsuario',
  data () {
    return {
      id: null,
      formulario: {
        nome: '',
        cargo: '',
        nivel: ''
      },
      opcaoNivel: [
        'Estagiário',
        'Trainee',
        'Júnior',
        'Pleno',
        'Sênior',
        'Especialista',
        'Arquiteto'
      ]
    }
  },
  methods: {
    async onSubmit () {
      try {
        if (this.id) {
          userService.updateUser(this.id, this.formulario)
        } else {
          userService.saveUser(this.formulario)
        }
        Notify.create({
          message: 'Usuário salvo com sucesso!',
          icon: 'check',
          color: 'positive'
        })
        this.$router.push({ name: 'home' })
      } catch (error) {
        Notify.create({
          message: 'Erro ao salvar usuário',
          type: 'negative'
        })
      }
    }
  },
  async mounted () {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      const response = await userService.getById(this.id)
      this.formulario = { ...response.data }
    }
  }
})
</script>

<style>

</style>
