# Amplify Stock App
===================

Demonstration of using [AWS Amplify](https://aws-amplify.github.io/) and [VueJS](https://vuejs.org/) to create a serverless application to display stock data and news.

-------------------

AWS Amplify has added Vue components to enable applications to quickly leverage AWS systems like Authentication, GraphQL, and Storage. The demo app will utilize these components to allow a user to create an account, add stock symbols, and display real-time grapahs and news feeds of their portfolio.

## Tech Stack
* https://aws-amplify.github.io/docs/js/vue - Amplify and VueJS
* https://www.alphavantage.co/ - Stock Data
* https://stocknewsapi.com/ - Stock News

## Walkthrough

### Install

```
npm install -g @vue/cli

npm install -g @aws-amplify/cli
```

### Create Vue Project
```
vue create amplify-stock-app
# Preset (babel, eslint)
# NPM

cd amplify-stock-app

npm install --save aws-amplify aws-amplify-vue
```

#### Amplify Configuration
```
amplify configure

# In browser, Sign in to AWS with 

# Press Enter to continue
# Select a region
# Enter new IAM user name

# In browser
  1. Click Next:Permissions
  2. Click Next:Tags
  3. Click Next:Review
  4. Click Create User
  5. Copy Access Key and Secret to safe location
  5. Click Close


# Press Enter to Continue
# Enter Access Key
# Enter Secret
# Enter Profile Name

amplify init

# Enter Project Name
# Enter Environment Name
# Select Text Editor
# Select Type of App: javascript
# Choose Framework: vue
# Enter Source Directory Pathj: src
# Enter Distribution Directory Path: dist
# Enter Build Command
# Enter Start Command
# Do you want to use an AWS profile: Y
# Choose profile: default
```

### Add Amplify to VueJS

Edit src/main.js
```javascript
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

Vue.use(AmplifyPlugin, AmplifyModules);
```

Edit App.vue
```html
<script>
import { components } from 'aws-amplify-vue'
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  name: 'app',
  components: {
    ...components
  }
}
</script>
```


### Add authentication
[https://aws-amplify.github.io/docs/js/authentication]

```
amplify add auth

# Choose security provider: Default configuration
# Choose sign in with: username
# Choose attributes: email

amplify 

# Enter Y
```

Edit App.vue
```html
<template>
  <div id="app">
    ...
      <div v-if="!signedIn">
         <amplify-authenticator></amplify-authenticator>
      </div>
      <div v-if="signedIn">
        <amplify-sign-out class="signout"></amplify-sign-out>
        <h1>Welcome {{user.username}}</h1>
      </div>
    ...
  </div>
</template>
<script>
...
import { Auth } from 'aws-amplify'

export default {
  name: 'app',
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
      user: null,
      signedIn: false
    }
  }
}
...
</script>
```

Test
```
npm run serve

# Open browser
# Create account
# Confirm email
```

Verify account at [https://console.aws.amazon.com/cognito]

### Add API
[https://aws-amplify.github.io/docs/js/api]

```
amplify add api

# Choose GraphQL
# Enter API Name
# Choose authorization type: Amazon Cognito User Pool
# Annotated GraphQL Schema: N
# Guided Schema Creation: Y
# Choose One-to-many relationship
# Edit now: Y
```

schema.graphql
```
type Portfolio @model {
  id: ID!
  name: String!
  positions: [Position] @connection(name: "PortfolioPositions")
}
type Position @model {
  id: ID!
  symbol: String!
  portfolio: Portfolio @connection(name: "PortfolioPositions")
}
```

```
amplify push

# Generate code: Y
# Code type: javascript
# Enter file name pattern
# Update all possible GraphQL operations: Y
# Enter maximum statement depth: 2
```

Verify API at (https://console.aws.amazon.com/appsync/home)

#### Create PortfolioList
```
<template>
Portfolios:
<ul>
</ul>
</template>
```



Edit App.vue
```html
<template>
...
          <amplify-connect :mutation="createPortfolio"
              @done="onCreateFinished">
            <template slot-scope="{ loading, mutate, errors }">
              <input v-model="name" placeholder="item name" />
              <button :disabled="loading" @click="mutate">Create Portfolio</button>
            </template>
          </amplify-connect>
          <amplify-connect :query="listPortfolios">
            <template slot-scope="{loading, data, errors}">
              <div v-if="loading">Loading...</div>

              <div v-else-if="errors.length > 0">{{ errors }}</div>

              <div v-else-if="data">
                <PortfolioList :items="data.listPortfolios.items"></PortfolioList>
              </div>
            </template>
          </amplify-connect>
...
</template
```

```javascript
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

...
export default {
  ...
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
      // TODO: Update List
    }
  }
  ...
}
...
```

### Publish

```
amplify publish
```


### Lamn=bda
[https://aws-amplify.github.io/docs/cli/graphql]

```
amplify add function

# Friendly Resource Name
# Function Name
# Template: Hello World
# 

amplify function build
amplify function invoke functionTest
amplify push

```


### Chart.js
```
npm install --save chart.js vue-chartjs
```



### Hosting

```
amplify hosting add

# DEV
# Name
# index doc

```
