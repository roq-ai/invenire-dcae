import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getProductById, updateProductById } from 'apiSdk/products';
import { Error } from 'components/error';
import { productValidationSchema } from 'validationSchema/products';
import { ProductInterface } from 'interfaces/product';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { AnalystInterface } from 'interfaces/analyst';
import { getAnalysts } from 'apiSdk/analysts';

function ProductEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ProductInterface>(
    () => (id ? `/products/${id}` : null),
    () => getProductById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ProductInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateProductById(id, values);
      mutate(updated);
      resetForm();
      router.push('/products');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ProductInterface>({
    initialValues: data,
    validationSchema: productValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Product
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="product_name" mb="4" isInvalid={!!formik.errors?.product_name}>
              <FormLabel>Product Name</FormLabel>
              <Input
                type="text"
                name="product_name"
                value={formik.values?.product_name}
                onChange={formik.handleChange}
              />
              {formik.errors.product_name && <FormErrorMessage>{formik.errors?.product_name}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<AnalystInterface>
              formik={formik}
              name={'analyst_id'}
              label={'Select Analyst'}
              placeholder={'Select Analyst'}
              fetcher={getAnalysts}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'product',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ProductEditPage);
