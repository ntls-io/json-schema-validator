<template>
  <div>
    <label for="dataFileInput">Data file:</label>
    <input type="file" id="dataFileInput" ref="dataFileInput" @change="uploadDataFile"/>
    <label for="schemaFileInput">Schema file:</label>
    <input type="file" id="schemaFileInput" ref="schemaFileInput" @change="uploadSchemaFile"/>
    <button @click="validateDataAgainstSchema">Validate</button>
    <p v-if="validationResult">{{ validationResult }}</p>
  </div>
</template>

<script>
import Ajv from 'ajv';

export default {
  data() {
    return {
      data: null,
      schema: null,
      validationResult: null,
    };
  },
  methods: {
    async uploadDataFile() {
      const input = this.$refs.dataFileInput;
      const file = input.files[0];

      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = event => {
        this.data = JSON.parse(event.target.result);
      };
    },
    async uploadSchemaFile() {
      const input = this.$refs.schemaFileInput;
      const file = input.files[0];

      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = event => {
        this.schema = JSON.parse(event.target.result);
      };
    },
    async validateDataAgainstSchema() {
      const ajv = new Ajv();
      const validate = ajv.compile(this.schema);
      const valid = validate(this.data);
      this.validationResult = valid
          ? 'Data is valid against the schema.'
          : 'Data is invalid against the schema: ' + ajv.errorsText(validate.errors);
    },
  },
};
</script>

<style>
div {
  display: inline-flex;
  flex-direction: column;
}

label {
  font-size: 16px;
  margin: 10px 0;
}

input[type="file"] {
  margin: 5px 0;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

p {
  margin-top: 10px;
  font-size: 16px;
}
</style>
