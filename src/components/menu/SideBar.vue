<template>
  <div class="sidebar">
    <div
      class="sidebar-backdrop"
      @click="closeSidebarPanel"
      :class="{ 'show-backdrop': isPanelOpen }"
    ></div>
    <div :class="{ open: isPanelOpen }" class="sidebar-panel">
      <div class="sidebar-panel-nav">
        
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
