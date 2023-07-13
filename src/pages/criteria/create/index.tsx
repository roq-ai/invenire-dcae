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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCriteria } from 'apiSdk/criteria';
import { Error } from 'components/error';
import { criteriaValidationSchema } from 'validationSchema/criteria';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { AnalystInterface } from 'interfaces/analyst';
import { getAnalysts } from 'apiSdk/analysts';
import { CriteriaInterface } from 'interfaces/criteria';

function CriteriaCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CriteriaInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCriteria(values);
      resetForm();
      router.push('/criteria');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CriteriaInterface>({
    initialValues: {
      criteria: '',
      analyst_id: (router.query.analyst_id as string) ?? null,
    },
    validationSchema: criteriaValidationSchema,
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
            Create Criteria
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="criteria" mb="4" isInvalid={!!formik.errors?.criteria}>
            <FormLabel>Criteria</FormLabel>
            <Input type="text" name="criteria" value={formik.values?.criteria} onChange={formik.handleChange} />
            {formik.errors.criteria && <FormErrorMessage>{formik.errors?.criteria}</FormErrorMessage>}
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
    entity: 'criteria',
    operation: AccessOperationEnum.CREATE,
  }),
)(CriteriaCreatePage);
