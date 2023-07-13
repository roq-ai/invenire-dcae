import * as yup from 'yup';

export const criteriaValidationSchema = yup.object().shape({
  criteria: yup.string().required(),
  analyst_id: yup.string().nullable(),
});
