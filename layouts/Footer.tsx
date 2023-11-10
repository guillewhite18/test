import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers, FormikValues } from "formik";
import * as Yup from 'yup';
import { FormControl, Input, FormErrorMessage, Button } from "@chakra-ui/react";
import styles from '@/styles/Home.module.scss';
import Swal from 'sweetalert2';
import axios from 'axios';

interface YourFormValuesType extends FormikValues {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: number | null;
}
const initialValues: YourFormValuesType = {
  firstname: "",
  lastname: "",
  email: "",
  phone: null, 
};
const validationSchema = Yup.object({
  firstname: Yup.string()
    .required("El nombre es obligatorio")
    .test('no-numbers', 'No se permiten números en el nombre', (value) => {
      return !/\d/.test(value);
    }),
  lastname: Yup.string()
    .required("El apellido es obligatorio")
    .test('no-numbers', 'No se permiten números en el apellido', (value) => {
      return !/\d/.test(value);
    }),
  email: Yup.string()
    .required("El correo es obligatorio")
    .email("Ingrese una dirección de correo válida"),
    phone: Yup.string()
    .nullable()
    .required("El teléfono es obligatorio")
    .test('no-letters', 'No se permiten letras en el teléfono', (value) => {
      return !/[a-zA-Z]/.test(value || ""); 
    }),
});

const Footer = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (values: YourFormValuesType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const response = await axios.post('/api/contact', values);
  
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });
      }
      
      setSubmitting(false);
    } catch (error: any) { 
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error al enviar los datos: ${JSON.stringify(error.response.data)}`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al enviar los datos: Hubo un problema en la solicitud',
        });
      }
      setSubmitting(false);
    }
  };

  return (
    <footer>
      <div className={styles.label}>
        <div className={styles.textwrapper}>Contáctanos</div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            
            <div className={styles.lastname} > 
    <label htmlFor="lastname"><b className={styles.textlabel}>apellido</b></label>
    </div>
    <div className={styles.inputtexto}>  
            <Field name="lastname">
            {({ field, form }: { field: any, form: any }) => (
                <FormControl isInvalid={form.errors.lastname && form.touched.lastname}>
                  <Input {...field} placeholder="Apellido" className={styles.inputtextoChild} />
                  <FormErrorMessage className={styles.textlabel1}>{form.errors.lastname}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            </div>

            <div className={styles.phone} > 
    <label htmlFor="phone"><b className={styles.textlabel}>teléfono</b></label> {}
    </div>

    <div className={styles.inputtexto1}> 
            <Field name="phone">
            {({ field, form }: { field: any, form: any }) => (
                <FormControl isInvalid={form.errors.phone && form.touched.phone}>
                  <Input type="number" {...field} placeholder="Teléfono" className={styles.inputtextoChild} />
                  <FormErrorMessage className={styles.textlabel1}>{form.errors.phone}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            </div>

            <div className={styles.name} > 
    <label htmlFor="firstname"><b className={styles.textlabel}>nombre</b></label>
    </div>
    
    <div className={styles.inputtexto3}>
            <Field name="firstname">
            {({ field, form }: { field: any, form: any }) => (
                <FormControl isInvalid={form.errors.firstname && form.touched.firstname}>
                  <Input {...field} placeholder="Nombre" className={styles.inputtextoChild} />
                  <FormErrorMessage className={styles.textlabel1}>{form.errors.firstname}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            </div>

            <div className={styles.mail} > 
    <label htmlFor="email"><b className={styles.textlabel}>mail</b></label>
    </div>
    <div className={styles.inputtexto2}> 
            <Field name="email">
            {({ field, form }: { field: any, form: any }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <Input {...field} placeholder="Correo" className={styles.inputtextoChild} />
                  <FormErrorMessage className={styles.textlabel1}>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            </div>

            <div className={styles.ejercicioFrontEndInner}>
        <div className={styles.rectangleParent3}>
        <Button
  className={`${styles.groupChild8} ${isSubmitting ? styles.buttonLoading : ''}`}
  isLoading={isSubmitting}
  type="submit"
  disabled={isSubmitting} 
>
  {isSubmitting ? 'Enviando...' : 'Enviar'}
</Button>
            </div>
    </div>
          </Form>
        )}
      </Formik>
    </footer>
  );
};

export default Footer
