import { FormProvider, useForm } from 'react-hook-form';
import Joi from 'joi';
import classNames from 'classnames';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './index.module.scss';
import { trimObjStrValues } from '../../../../infrastructure/testing/tasks';
import {
  useAddWordMutation,
  useCreateWordMutation,
  useGetWordsAllQuery,
  useGetWordsCategoriesQuery,
} from '../../../../infrastructure/api/redux/apiSlice';
import CategoriesSelector from '../../../category/components';

export default function AddWordForm({ onClose, className, isCreating }) {
  const defaultValues = {
    en: '',
    ua: '',
    category: '',
    verbType: 'Regular',
  };

  const schema = Joi.object({
    en: Joi.string()
      .pattern(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid English word',
      }),
    ua: Joi.string()
      .pattern(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u)
      .required()
      .messages({
        'string.pattern.base': 'Invalid Ukrainian word',
      }),
    category: Joi.string().required().messages({
      'any.required': 'Please select a category',
    }),
    verbType: Joi.string().valid('Regular', 'Irregular').optional(),
  });

  const methods = useForm({
    defaultValues,
    resolver: joiResolver(schema),
  });

  const { errors } = methods.formState;
  const { data: categories = [], isLoading, isError } = useGetWordsCategoriesQuery();
  const { data } = useGetWordsAllQuery();
  const { results: words = [] } = data || [];

  const [createWord] = useCreateWordMutation();
  const [addWord] = useAddWordMutation();

  const onSubmit = async data => {
    const trimmedData = trimObjStrValues(data);
    const existingWord = words.find(
      word => word.en === trimmedData.en || word.ua === trimmedData.ua
    );

    if (existingWord) {
      const message =
        existingWord.en === trimmedData.en ? 'Word already exists' : 'Word already exists';
      methods.setError(existingWord.en === trimmedData.en ? 'en' : 'ua', {
        type: 'manual',
        message,
      });
      return;
    }

    try {
      isCreating ? await createWord(data).unwrap() : await addWord(data).unwrap();
      methods.reset();
      onClose();
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  const handleCategoryChange = category => {
    methods.setValue('category', category);
    if (category !== 'verb') {
      methods.setValue('verbType', 'Regular');
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
              <CategoriesSelector
                selectedCategory={methods.watch('category')}
                selectedVerbType={methods.watch('verbType')}
                onCategoryChange={handleCategoryChange}
                onVerbTypeChange={verbType => methods.setValue('verbType', verbType)}
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
