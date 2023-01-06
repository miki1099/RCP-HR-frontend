<template>
  <div class="sidebar">
    <div
      class="sidebar-backdrop"
      @click="closeSidebarPanel"
      :class="{ 'show-backdrop': isPanelOpen }"
    ></div>
    <div :class="{ open: isPanelOpen }" class="sidebar-panel">
      <div class="sidebar-panel-nav">
        
        <div>
          <router-link class="hov-green" to="/registerWork" id="home" @click="closeSidebarPanel">
                        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg height="114" width="114" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
              viewBox="0 0 280.027 280.027" xml:space="preserve">
            <g>
              <path style="fill:#3E4E5C;" d="M140.014,69.884c57.834,0,105.01,48.313,105.01,105.78c0,57.476-47.176,104.363-105.01,104.363
                c-57.843,0-105.01-47.447-105.01-104.923C35.002,117.62,82.17,69.884,140.014,69.884z"/>
              <path style="fill:#EBEBEB;" d="M140.014,94.693c44.192,0,80.21,36.902,80.21,80.805c0,43.912-36.019,79.703-80.21,79.703
                c-44.183,0-80.21-36.246-80.21-80.14C59.802,131.158,95.83,94.693,140.014,94.693z"/>
              <path style="fill:#324D5B;" d="M105.053,34.96c0-19.296,15.673-34.96,34.986-34.96c19.322,0,34.986,15.664,34.986,34.968
                c0,16.312-11.227,29.893-26.349,33.752v10.037h-17.283V68.712C116.289,64.853,105.053,51.271,105.053,34.96z M131.411,59.795
                V43.649h17.274v16.145c10.317-3.57,17.764-13.231,17.764-24.712c0-14.5-11.831-26.253-26.419-26.253
                c-14.579,0-26.401,11.761-26.401,26.253C113.638,46.555,121.093,56.215,131.411,59.795z"/>
              <path style="fill:#E2574C;" d="M233.035,73.306l8.418,8.375c4.638,4.62,4.638,12.129,0,16.749l-2.8,2.8
                c-4.638,4.62-12.181,4.62-16.819,0l-8.41-8.383c-4.647-4.629-4.647-12.12,0-16.749l2.792-2.792
                C220.854,68.685,228.389,68.685,233.035,73.306z"/>
              <path style="fill:#51BBA8;" d="M46.886,73.306l-8.34,8.375c-4.603,4.62-4.603,12.129,0,16.749l2.774,2.8
                c4.603,4.62,12.076,4.62,16.679,0l8.331-8.383c4.603-4.629,4.603-12.12,0-16.749l-2.765-2.792
                C58.953,68.685,51.498,68.685,46.886,73.306z"/>
              <path style="fill:#E2574C;" d="M183.768,166.266h-35.003v-43.754c0-4.83-3.912-8.751-8.751-8.751s-8.751,3.92-8.751,8.751v52.505
                c0,4.839,3.912,8.751,8.751,8.751h43.754c4.839,0,8.751-3.912,8.751-8.751S188.606,166.266,183.768,166.266z"/>
            </g>
            </svg>
            Register work
          </router-link>
        </div>
        <div>
          <br />
        </div>
        <div>
          <router-link class="hov-yellow" to="/registerCustomWork" @click="closeSidebarPanel">
                        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg height="62px" width="62px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 280.03 280.03" xml:space="preserve" fill="#000000" stroke="#000000" stroke-width="0.0028002800000000005"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#E4E7E7;" d="M17.502,0h245.024c9.661,0,17.502,7.832,17.502,17.502v245.024c0,9.661-7.841,17.502-17.502,17.502 H17.502C7.841,280.027,0,272.187,0,262.526V17.502C0,7.832,7.841,0,17.502,0z"></path> <path style="fill:#E2574C;" d="M262.526,0H17.502C7.841,0,0,7.832,0,17.502v43.754h280.027V17.502 C280.027,7.832,272.187,0,262.526,0z"></path> <path style="fill:#324D5B;" d="M189.701,148.292c-3.08,0-6.283,0.534-8.795,1.575l-0.28-0.263 c4.603-6.143,13.678-14.518,19.261-20.923c1.671-1.969,2.932-3.535,2.932-5.364c0-4.708-6.012-9.547-9.906-9.547 c-1.129,0-2.66,0-4.192,0.919c-1.671,1.05-3.352,2.091-4.472,3.133c-14.098,12.295-35.458,40.035-35.458,59.777 c0,17.397,13.538,32.439,35.038,32.439c20.652,0,35.03-15.428,35.03-32.439C218.868,162.153,206.45,148.292,189.701,148.292z M183.838,191.189c-8.375,0-13.266-6.274-13.266-13.608c0-7.71,5.303-13.59,13.266-13.59c8.795,0,13.266,6.668,13.266,13.59 C197.095,185.177,191.784,191.189,183.838,191.189z M120,192.423H93.547c12.286-14.229,34.697-32.597,34.697-51.07 c0-16.898-14.308-27.67-32.089-27.67s-33.971,13.433-33.971,30.19c0,5.18,3.605,9.705,10.545,9.705 c13.879,0,5.933-21.545,22.56-21.545c5.924,0,10.405,4.787,10.405,10.238c0,4.787-2.459,8.908-5.058,12.374 c-10.991,14.631-24.004,26.594-36.001,39.764c-1.444,1.601-3.325,3.99-3.325,6.782c0,6.126,4.918,8.777,11.28,8.777h48.287 c5.487,0,10.405-2.652,10.405-8.777C131.28,195.074,126.354,192.423,120,192.423z"></path> <path style="fill:#BF392C;" d="M0,52.505h280.027v17.502H0V52.505z"></path> <path style="fill:#BF392C;" d="M140.014,17.502c4.839,0,8.751,3.92,8.751,8.751s-3.912,8.751-8.751,8.751s-8.751-3.92-8.751-8.751 S135.174,17.502,140.014,17.502z"></path> <path style="fill:#C2C5C5;" d="M262.526,262.526H17.502C7.841,262.526,0,254.685,0,245.024v17.502 c0,9.661,7.841,17.502,17.502,17.502h245.024c9.661,0,17.502-7.841,17.502-17.502v-17.502 C280.027,254.685,272.187,262.526,262.526,262.526z"></path> </g> </g></svg>
            Register custom work log
          </router-link>
        </div>
        <div>
          <br />
        </div>
      <!-- TODO other spaces -->

      <div  @click="closeSidebarPanel" class="exit-button hov-red">
        <svg
          width="25"
          height="25"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0)">
            <path
              d="M28.3976 24.0401L47.0878 5.34931C48.3041 4.13355 48.3041 2.16783 47.0878 0.952073C45.8721 -0.263687 43.9063 -0.263687 42.6906 0.952073L23.9997 19.6429L5.30949 0.952073C4.09316 -0.263687 2.12801 -0.263687 0.912248 0.952073C-0.304083 2.16783 -0.304083 4.13355 0.912248 5.34931L19.6025 24.0401L0.912248 42.7309C-0.304083 43.9467 -0.304083 45.9124 0.912248 47.1282C1.51814 47.7346 2.31479 48.0393 3.11087 48.0393C3.90695 48.0393 4.70303 47.7346 5.30949 47.1282L23.9997 28.4374L42.6906 47.1282C43.297 47.7346 44.0931 48.0393 44.8892 48.0393C45.6853 48.0393 46.4814 47.7346 47.0878 47.1282C48.3041 45.9124 48.3041 43.9467 47.0878 42.7309L28.3976 24.0401Z"
              
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    closeSidebarPanel() {
      this.$store.commit('toggleNav');
    },
  },
  computed: {
    isPanelOpen() {
      return this.$store.state.isNavOpen;
    },
  },
};
</script>
<style scoped>
.sidebar-backdrop {
  background-color: rgba(31, 12, 6, 0.4);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  opacity: 0;
  transition: opacity 300ms ease-in-out 0s;
  transform: translateX(-100%);
}

#footer a{
  text-decoration: none;
  color: #CC00FF;
}

.show-backdrop {
  opacity: 1;
  transform: translateX(0%);
}

.sidebar-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  background-color: #222222;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 3px 20px 20px 20px;
  width: 300px;
  transform: translateX(-100%);
  transition: all 300ms ease-in-out 0s;
}

.open {
  transform: translateX(0%);
}

.hov-red:hover, .hov-red:hover svg{
  color: #ff073a;
  fill: #ff073a;
}

.hov-yellow:hover, .hov-yellow:hover svg{
  color: #FFFF33;
  fill: #FFFF33;
}

.hov-blue:hover, .hov-blue:hover svg{
  color: #00FFFF;
  fill: #00FFFF;
}

.hov-green:hover, .hov-green:hover svg{
  color: #00FF66;
  fill: #00FF66;
}

.hov-purple:hover, .hov-purple:hover svg{
  color: #CC00FF;
  fill: #CC00FF;
}

svg {
  fill: #e9e9e9;
}

@media (max-width: 600px) {
  .exit-button svg {
    width: 30px;
    height: 30px;
  }
}

@media (min-height: 1000px) {
  #footer {
    position: absolute;
    bottom: 30px;
  }
}

@media (max-width: 340px) {
  .exit-button {
    width: 30px;
    height: 30px;
    left: 15px;
  }
}

.exit-button {
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
}

.sidebar {
  position: relative;
}
</style>
