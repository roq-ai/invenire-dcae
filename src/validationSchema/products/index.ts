import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  product_name: yup.string().required(),
  analyst_id: yup.string().nullable(),
});
