import { Formik, Field, Form } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import css from './Filter.module.css';

const FilterSchema = yup.object().shape({
  filter: yup.string().required(),
});

const Filter = ({ onChangeFilter }) => {
  return (
    <>
      <Formik initialValues={{ filter: '' }} validationSchema={FilterSchema}>
        {({ values, handleChange }) => (
          <Form autoComplete="off">
            <label className={css.label}>
              Find contacts by name
              <Field
                name="filter"
                type="search"
                value={values.filter}
                onChange={evt => {
                  handleChange(evt);
                  onChangeFilter(evt);
                }}
                className={css['filter-input']}
              />
            </label>
          </Form>
        )}
      </Formik>
    </>
  );
};

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
