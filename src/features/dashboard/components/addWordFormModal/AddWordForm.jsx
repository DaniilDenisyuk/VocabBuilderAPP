import { FormProvider, useForm } from 'react-hook-form';
import Joi from 'joi';
import classNames from 'classnames';
import { joiResolver } from '@hookform/resolvers/joi';
import { v4 as uuidv4 } from 'uuid';
import { useWords } from '../../WordProvider';
import styles from './index.module.scss';
import VerbTypeSwitch from '../../../category/components/VerbTypeSwitch';
import CategoriesSelector from '../../../category/components';
import { useCategory } from '../../../category/components/CategoryProvider';

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

  const { addWord, words } = useWords();
  const { errors } = methods.formState;
  const {
    categories,
    selectedCategory,
    selectedVerbType,
    handleCategoryChange,
    handleVerbTypeChange,
  } = useCategory();

  const onSubmit = data => {
    const existingWord = words.find(word => word.en === data.en);
    if (existingWord) {
      methods.setError('en', {
        type: 'manual',
        message: 'Word already exists',
      });
      return;
    }

    try {
      addWord({
        ...data,
        id: uuidv4(),
        progress: 0,
        verbType: selectedCategory === 'Verb' ? selectedVerbType : undefined,
      });
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
              categories={categories}
              onChange={handleCategoryChange}
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
            onChange={handleVerbTypeChange}
            // selectedVerbType={methods.watch('verbType')}
            // onChange={e => methods.setValue('verbType', e.target.value)}
            className={classNames(styles.radioBtnContainer)}
            selectStyleName="modal"
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
