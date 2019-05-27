<template>
  <div id="app">
      <div v-if="!signedIn">
         <amplify-authenticator></amplify-authenticator>
      </div>
      <div v-if="signedIn">
        <header>
          <h1>Welcome {{user.username}}</h1>
          <amplify-sign-out class="signout"></amplify-sign-out>
          <div class="listPortfolios">
            <amplify-connect :query="listPortfolios">
              <template slot-scope="{loading, data, errors}">
                <div v-if="loading">Loading...</div>
                <div v-else-if="errors.length > 0">{{ errors }}</div>
                <div v-else-if="data">
                  <PortfolioList :items="data.listPortfolios.items"></PortfolioList>
                </div>
              </template>
            </amplify-connect>
          </div>
        </header>
        <div class="form">
          <amplify-connect :mutation="createPortfolio"
              @done="onCreateFinished">
            <template slot-scope="{ loading, mutate, errors }">
              <input v-model="name" placeholder="item name" />
              <button :disabled="loading" @click="mutate">Create Portfolio</button>
            </template>
          </amplify-connect>
        </div>
      </div>
  </div>
</template>

<script>
import { components } from 'aws-amplify-vue'
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'

import PortfolioList from './components/PortfolioList'

import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';


export default {
  name: 'app',
  components: {
    PortfolioList,
    ...components
  },
  async beforeCreate() {
    try {
      this.user = await Auth.currentAuthenticatedUser()
      this.signedIn = true
    } catch (err) {
      this.signedIn = false
    }
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.signedIn = true
      } else {
        this.signedIn = false
      }
    });
  },
  data () {
    return {
      name: '',
      user: null,
      signedIn: false
    }
  },
  computed: {
    listPortfolios() {
      return this.$Amplify.graphqlOperation(queries.listPortfolios)
    },
    createPortfolio() {
      const newPortfolio = { name: this.name }
      return this.$Amplify.graphqlOperation(mutations.createPortfolio,
        { input: newPortfolio }
      );
    }
  },
  methods: {
    onCreateFinished() {
      console.log('Portfolio created!');
      // TODO: update list
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.listPortfolios {
  float: left;
  width: 300px;
}
</style>
