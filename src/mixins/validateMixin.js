import Ajv from 'ajv';

export const validateMixin = {
    data() {
        return {
            validationResult: null,
        };
    },
    methods: {
        validateDataAgainstSchema(data, schema) {
            const ajv = new Ajv();
            const validate = ajv.compile(schema);
            const valid = validate(data);
            this.validationResult = valid
                ? 'Data is valid against the schema.'
                : 'Data is invalid against the schema: ' + ajv.errorsText(validate.errors);
        },
    },
};
