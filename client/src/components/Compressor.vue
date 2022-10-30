<template>
  <header>
    <div id="logo_header_border">
    <Resize id="logo_header"/>
    </div>
    <div id="title_header">URLCompressor</div>
  </header>
  <div class="background_comp">
    <div class="component">
      <form id="form" @submit.prevent="submitToCompress">
        <label for="url_in">URL TO COMPRESS</label>
        <input id="url_in" v-model="input_url" type="url" placeholder="Enter URL to compress ..." required>
        <label for="expire">EXPIRE AFTER</label>
        <select id="expire" v-model="expire_selected">
          <option v-for="time in expires" :key="time.value" :value="time.value">
            {{time.name}}
          </option>
        </select>
        <label for="times">MAX NUMBER OF USES</label>
        <select id="times" v-model="times_selected">
          <option v-for="num in times" :key="num.value" :value="num.value">
            {{num.name}}
          </option>
        </select>
        <button id="submit" type="submit">Compress URL!</button>
      </form>
      <div>
        <label for="url_out">COMPRESSED URL</label>
        <div id="output">
          <input
              id="url_out"
              v-model="output_url"
              type="url"
              placeholder="<- Your compressed URL here ->"
              readonly
              v-on:focus="$event.target.select()"
          >
          <button id="copy" @click="copyOutput" :disabled="output_url === ''">   Copy!  </button>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <p>Github: <a href="https://github.com/HACC2022/Orangehill">HACC2022/Orangehill</a></p>
  </footer>
</template>

<script>
import URLDataService from "../services/URLDataService"
import Resize from "vue-entypo-icons/lib/Resize100Percent"
const config = require("../config/config")

// in case the user tried to access a broken link ...
const errorQuery = new URL(location.href).searchParams.get('e')
if( errorQuery === "404"){
  // let them know
  alert("The requested link is unavailable.")
  // and redirect back to compress page
  location.href = location.origin
}

export default {
  name: 'URLCompressor',
  components: {
    Resize
  },
  props: {
    msg: String
  },
  data() {
    return {
      input_url: "",
      expire_selected: 12*60*60,
      expires: [
        {value: 1*60*60, name: "1 hour"},
        {value: 6*60*60, name: "6 hours"},
        {value: 12*60*60, name: "12 hours"},
        {value: 1*24*60*60, name: "1 day"},
        {value: 7*24*60*60, name: "7 days"},
        {value: null, name: "Never"}
      ],
      times_selected: null,
      times: [
        {value: null, name: "No limit"},
        {value: 1, name: "1"},
        {value: 5, name: "5"},
        {value: 10, name: "10"},
        {value: 25, name: "25"},
        {value: 50, name: "50"},
        {value: 100, name: "100"},
      ],
      output_url: ""
    }
  },
  methods: {
    copyOutput() {
      // copy text to clipboard
      navigator.clipboard.writeText(this.output_url)
      const copyButton = document.getElementById("copy")
      copyButton.textContent = "Copied!"
      setTimeout(function() {
        copyButton.textContent = "   Copy!  "
      }, 2000)
    },
    submitToCompress() {
      // collect necessary data
      const data = {
        url: this.input_url,
        expire: this.expire_selected,
        times: this.times_selected
      }
      // send it to the server
      URLDataService.create(data).then(res => {
        // and put the resulting url into the designated field
        this.output_url = config.serverURL + "/" + res.data.short
      })
    }
  }
}
</script>

<style>
@media (max-width: 600px) {
  #app{
    width: 100%;
  }
  body {
    overflow: hidden;
  }
  header {
    background-color: #308b98;
    width: 100%;
    top: 0;
    position: absolute;
    height: 45px;
  }
  .component {
    width: 100%;
    background-color: white;
    border-radius: 15px;
    border: 2px solid #555555;
    z-index: 1;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    margin: auto;
  }
  .background_comp {
    width: 100%;
    position: absolute;
    background-color: white;
    z-index: -1;
    top: 45px;
    display: flex;
    height: calc(100% - 90px);
  }
  footer {
    background-color: #555555;
    width: 100%;
    text-align: center;
    height: 45px;
    position: absolute;
    bottom: 0;
  }

  input, select, #submit, #copy {
    display: block;
    width: 90%;
    padding: 12px 20px;
    margin: 0.5em auto;
    box-sizing: border-box;
  }
  label {
    margin: 1em auto 0;
    width: 90%;
    display: block;
  }
  a {
    color: #308b98;
  }
  #submit {
    margin-top: 1em;
    cursor: pointer;
  }
  #output {
    margin: auto;
    width: 90%;
  }
  #copy {
    width: 30%;
    display: inline-block;
  }
  #url_out {
    display: inline-block;
    width: 70%;
  }
  #logo_header {
    width: 40px;
    height: 40px;
    margin: 0.25em;
  }
  #logo_header_border {
    margin: 5px;
    width: 2em;
    height: 2em;
    float: left;
    border: 2px solid #555555;
    border-radius: 5px;
  }
  #title_header {
    float: left;
    font-size: 2em;
    padding: 5px;
  }
}
@media (min-width: 600px) and (max-height: 600px) {
  body {
    background-image: url("../assets/island.jpg");
    overflow: hidden;
  }
  header {
    background-color: #308b98;
    width: 80%;
    position: absolute;
    top: 0;
    left: 10%;
    height: 60px;
  }

  .component {
    width: 60%;
    background-color: white;
    border-radius: 15px;
    border: 2px solid #555555;
    margin: 2em auto;
    z-index: 1;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    height: 400px;
  }
  .background_comp {
    width: 80%;
    background-color: white;
    height: calc(100% - 100px);
    position: absolute;
    left: 10%;
    top: 60px;
    z-index: -1;
    overflow-y: scroll;
  }
  footer {
    background-color: #555555;
    width: 80%;
    position: absolute;
    bottom: 0;
    height: 40px;
    left: 10%;
    text-align: center;
  }
  input, select, #submit, #copy {
    display: block;
    width: 90%;
    padding: 12px 20px;
    margin: 0.5em auto;
    box-sizing: border-box;
  }
  label {
    margin: 1em auto 0;
    width: 90%;
    display: block;
  }
  a {
    color: #308b98;
  }
  #submit {
    margin-top: 1em;
    cursor: pointer;
  }
  #output {
    margin: auto;
    width: 90%;
  }
  #copy {
    width: 30%;
    display: inline-block;
  }
  #url_out {
    display: inline-block;
    width: 70%;
  }
  #logo_header {
    width: 60px;
    height: 60px;
    margin: 0.25em;
  }
  #logo_header_border {
    margin: 5px;
    width: 3em;
    height: 3em;
    float: left;
    border: 2px solid #555555;
    border-radius: 5px;
  }
  #title_header {
    float: left;
    font-size: 3em;
    padding: 5px;
  }
}
@media (min-width: 600px) and (min-height: 600px){
  body {
    background-image: url("../assets/island.jpg");
    overflow: hidden;
  }
  header {
    background-color: #308b98;
    width: 80%;
    position: absolute;
    top: 0;
    left: 10%;
    height: 10%;
  }

  .component {
    width: 60%;
    background-color: white;
    border-radius: 15px;
    border: 2px solid #555555;
    margin: 50vh auto 0;
    transform: translateY(-50%);
    z-index: 1;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  .background_comp {
    width: 80%;
    background-color: white;
    height: 100%;
    position: absolute;
    left: 10%;
    z-index: -1;
  }

  footer {
    background-color: #555555;
    width: 80%;
    position: absolute;
    bottom: 0;
    left: 10%;
    text-align: center;
  }

  input, select, #submit, #copy {
    display: block;
    width: 90%;
    padding: 12px 20px;
    margin: 0.5em auto;
    box-sizing: border-box;
  }

  label {
    margin: 1em auto 0;
    width: 90%;
    display: block;
  }

  a {
    color: #308b98;
  }

  #submit {
    margin-top: 1em;
    cursor: pointer;
  }

  #output {
    margin: auto;
    width: 90%;
  }

  #copy {
    width: 30%;
    display: inline-block;
  }

  #url_out {
    display: inline-block;
    width: 70%;
  }

  #logo_header {
    width: 60px;
    height: 60px;
    margin: 0.25em;
  }

  #logo_header_border {
    margin: 5px;
    width: 3em;
    height: 3em;
    float: left;
    border: 2px solid #555555;
    border-radius: 5px;
  }

  #title_header {
    float: left;
    font-size: 3em;
    padding: 5px;
  }
}
</style>
