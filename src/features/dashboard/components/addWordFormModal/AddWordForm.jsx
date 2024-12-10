import { FormProvider, useForm } from 'react-hook-form';
import Joi from 'joi';
import classNames from 'classnames';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './index.module.scss';
import {
  useCreateWordMutation,
  useGetWordsCategoriesQuery,
} from '../../../../infrastructure/api/redux/apiSlice';
import CategoryAndVerbTypeSelector from '../../../category/components';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../../store/notificationSlice';

export default function AddWordForm({ onClose, className, refetchTable }) {
  const dispatch = useDispatch();

  const defaultValues = {
    en: '',
    ua: '',
    category: '',
    verbType: undefined,
  };

  const schema = Joi.object({
    en: Joi.string()
      .pattern(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/)
      .trim()
      .required()
      .messages({
        'string.pattern.base': 'Invalid English word',
      }),
    ua: Joi.string()
      .pattern(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u)
      .trim()
      .required()
      .messages({
        'string.pattern.base': 'Invalid Ukrainian word',
      }),
    category: Joi.string().required().messages({
      'any.required': 'Please select a category',
    }),
    verbType: Joi.string()
      .valid('Regular', 'Irregular')
      .when('category', {
        is: 'verb',
        then: Joi.required().messages({
          'any.required': 'Please select verb type (Regular or Irregular)',
        }),
        otherwise: Joi.optional(),
      }),
  });

  const methods = useForm({
    defaultValues,
    resolver: joiResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const { errors } = methods.formState;
  const { data: categories = [], isLoading, isError } = useGetWordsCategoriesQuery();

  const [createWord] = useCreateWordMutation();

  const handleCategoryChange = useCallback(
    category => {
      methods.setValue('category', category);
      if (category !== 'verb') {
        methods.setValue('verbType', 'Regular');
      }
    },
    [methods]
  );

  const handleVerbTypeChange = useCallback(
    verbType => {
      methods.setValue('verbType', verbType);
    },
    [methods]
  );
  const onSubmit = async data => {
    const { category, verbType, ...restData } = data;

    if (category === 'verb') {
      restData.isIrregular = verbType === 'Irregular';
    }
    try {
      await createWord(restData).unwrap();
      methods.reset();
      onClose?.();
      refetchTable?.();
    } catch (error) {
      console.error('Error adding word:', error);
      dispatch(showNotification({ message: 'Error adding word: ' + error.message, type: 'error' }));
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={classNames(styles.form, className)}
      >
        {isLoading ? (
          <p>Loading categories...</p>
        ) : isError ? (
          <p>Failed to load categories. Please try again later.</p>
        ) : (
          categories.length > 0 && (
            <div>
              <CategoryAndVerbTypeSelector
                selectedCategory={methods.watch('category')}
                isIrregular={methods.watch('verbType')}
                onCategoryChange={handleCategoryChange}
                onVerbTypeChange={handleVerbTypeChange}
                className={styles.selector}
                variant="modal"
              />
              {errors.category && (
                <span className={styles.errorMessage}>{errors.category.message}</span>
              )}
            </div>
          )
        )}

        <input
          type="text"
          {...methods.register('en')}
          placeholder="English word"
          className={classNames(styles.input, { [styles.error]: errors.en })}
        />
        {errors.en && <span className={styles.errorMessage}>{errors.en.message}</span>}

        <input
          type="text"
          {...methods.register('ua')}
          placeholder="Ukrainian word"
          className={classNames(styles.input, { [styles.error]: errors.ua })}
        />
        {errors.ua && <span className={styles.errorMessage}>{errors.ua.message}</span>}

        <div className={styles.formBtn}>
          <button type="submit" className={styles.submitBtn}>
            Add
          </button>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={() => {
              methods.reset();
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
