<template>
  <q-page padding>
    <div class="q-pa-md">
    <q-table
      title="Usuários"
      :rows="users"
      :columns="fields"
      row-key="name"
    >
    <template v-slot:top>
      <span class="text-h5">Usuários</span>
      <q-space/>
      <q-btn color="primary" :disable="loading" label="Novo usuário" :to="{ name: 'formUsuario'}" />
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props" class="q-gutter-sm">
        <q-btn icon="edit" color="info" dense @click="editarUsuario(props.row.id)"/>
        <q-btn icon="delete" color="negative" dense @click="deletarUsar(props.row.id)"/>
      </q-td>
    </template>
    </q-table>
  </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { userService } from '../service/userService.js'
import { Notify, Dialog } from 'quasar'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      users: [],
      fields: [
        {
          label: 'Nome',
          sortable: true,
          name: 'nome',
          field: 'nome',
          align: 'left'
        },
        {
          label: 'Cargo',
          sortable: true,
          name: 'cargo',
          field: 'cargo',
          align: 'left'
        },
        {
          label: 'Nível',
          sortable: true,
          name: 'nivel',
          field: 'nivel',
          align: 'left'
        },
        {
          label: 'Ações',
          name: 'actions',
          field: 'actions',
          align: 'right'
        }
      ]
    }
  },
  methods: {
    async getUsers () {
      try {
        const { data } = await userService.getUsers()
        this.users = data
      } catch (error) {
        throw new Error(error)
      }
    },
    async deletarUsar (id) {
      try {
        Dialog.create({
          title: 'Excluir',
          message: 'Tem certeza que deseja excluir esse usuário?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await userService.deleteUser(id)
          Notify.create({
            message: 'Exclusão efetuada!',
            icon: 'check',
            color: 'positive'
          })
          await this.getUsers()
        })
      } catch (error) {
        Notify.create({
          message: 'Erro ao excluir usuário',
          type: 'negative'
        })
      }
    },
    editarUsuario (id) {
      this.$router.push({ name: 'formUsuario', params: { id } })
    }
  },
  mounted () {
    this.getUsers()
  }
})
</script>
