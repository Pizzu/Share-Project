<template>
  <main>
    <section>
    <v-parallax :src="require('../assets/hero.jpeg')" height="700">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <h1 class="heading-primary mb-2 display-xs-3 text-xs-center text-uppercase">Share Projects</h1>
            <div class="title mb-3 text-xs-center">Find here your ideas</div>
            <v-btn
              class="primary mt-4"
              dark
              large
              to="/projects"
            >
              Discover Projects
            </v-btn>
          </v-layout>
        </v-parallax>
  </section>

  <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-4">
            <div class="text-xs-center">
              <h2 class="heading-secondary text-uppercase font-weight-bold">Explore a world of ideas and projects</h2>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="transparent" flat>
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="secondary--text">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <h3 class="heading-tertiary primaryDark--text text-xs-center text-uppercase">Develop your ideas</h3>
                    </v-card-title>
                    <v-card-text class="paragraph-text primaryDark--text">
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="transparent" flat>
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="secondary--text">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <h3 class="heading-tertiary primaryDark--text text-xs-center text-uppercase">Fast development</h3>
                    </v-card-title>
                    <v-card-text class="paragraph-text primaryDark--text">
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="transparent" flat>
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="secondary--text">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <h3 class="heading-tertiary primaryDark--text text-xs-center text-uppercase">Completely Open Sourced</h3>
                    </v-card-title>
                    <v-card-text class="paragraph-text primaryDark--text">
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="require('../assets/section.jpeg')" height="380">
          <v-layout column align-center justify-center>
            <div class="display-1 white--text mb-3 text-uppercase text-xs-center">Develop your project and share it with the world</div>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4 offset-sm1>
              <v-card flat class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <h3 class="heading-tertiary primaryDark--text text-uppercase">Contact us</h3>
                </v-card-title>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="paragraph-text primaryDark--text">Milan, IT</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="paragraph-text primaryDark--text">lucaloforte3@gmail.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
  </main>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss">
.heading-primary {
  color: white;
  font-size: 4.3rem;
  font-weight: 400;
  letter-spacing: 1.1rem;
}
.heading-secondary {
  font-size: 2.5rem;
  line-height: 40px;
  display: inline-block;
  background-image: linear-gradient(to right, #0099CC, #66CCFF);
  -webkit-background-clip: text;
  color: transparent;
  transition: all .2s;
  letter-spacing: .2rem;

  &:hover {
    transform: skewY(2deg) skewX(15deg) scale(1.1);
    text-shadow: .5rem 1rem 2rem rgba(black, 0.2);
  }
}

.heading-tertiary {
  font-size: 1.3rem;
  letter-spacing: .2rem;
}

.paragraph-text {
  font-size: 1.3rem;
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .heading-primary {
     font-size: 3.3rem;
  }

  .heading-secondary {
    font-size: 2.0rem;
  }

}
</style>

