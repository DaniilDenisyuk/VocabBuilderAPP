import { FormProvider, useForm } from 'react-hook-form';
import Joi from 'joi';
import classNames from 'classnames';
import { joiResolver } from '@hookform/resolvers/joi';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.scss';
import VerbTypeSwitch from '../../../category/components/VerbTypeSwitch';
import CategoriesSelector from '../../../category/components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '../../../category/redux/categoriesSlice';
import { trimObjStrValues } from '../../../../infrastructure/testing/tasks';
import { addWord } from '../../../dictionary/redux/wordsOperations';
import { selectWords } from '../../../dictionary/redux/wordsSlice';
import { selectCategories } from '../../../category/redux/categoriesSelectors';

export default function AddWordForm({ onClose, className }) {
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
  const categories = useSelector(selectCategories);

  const selectedCategory = methods.watch('category');
  const selectedVerbType = methods.watch('verbType');

  const dispatch = useDispatch();
  const words = useSelector(selectWords);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onSubmit = async data => {
    const trimmedData = trimObjStrValues(data);

    const existingWord = words.find(word => word.en === data.en);
    if (existingWord) {
      methods.setError('en', {
        type: 'manual',
        message: 'Word already exists',
      });
      return;
    }

    try {
      await dispatch(
        addWord({
          ...trimmedData,
          id: uuidv4(),
          progress: 0,
          verbType: selectedCategory === 'Verb' ? selectedVerbType : undefined,
        })
      );
      methods.reset();
      onClose();
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={classNames(styles.form, className)}
      >
        {categories.length > 0 ? (
          <div>
            <CategoriesSelector
              name="category"
              onChange={e => methods.setValue('category', e.target.value)}
              error={errors.category}
            />
            {errors.category && (
              <span className={styles.errorMessage}>{errors.category.message}</span>
            )}
          </div>
        ) : (
          <p>No categories available</p>
        )}

        {selectedCategory === 'Verb' && (
          <VerbTypeSwitch
            selectedVerbType={selectedVerbType}
            onChange={e => methods.setValue('verbType', e.target.value)}
            className={classNames(styles.radioBtnContainer)}
            variant="modal"
          />
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
