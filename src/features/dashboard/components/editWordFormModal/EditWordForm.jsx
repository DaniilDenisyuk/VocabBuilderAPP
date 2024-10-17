import { useForm, FormProvider } from 'react-hook-form';
import styles from './index.module.scss';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useWords } from '../../WordProvider';

const schema = Joi.object({
  en: Joi.string().required().messages({ 'string.base': 'Invalid English word' }),
  ua: Joi.string().required().messages({ 'string.base': 'Invalid Ukrainian word' }),
});

export default function EditWordForm({ wordData, onClose }) {
  const methods = useForm({
    defaultValues: { en: wordData.en || '', ua: wordData.ua || '' },
    resolver: joiResolver(schema),
  });

  const { errors } = methods.formState;
  const { editWord } = useWords();

  const onSubmit = async data => {
    console.log('Submitting data:', data);

    try {
      if (data.en !== wordData.en || data.ua !== wordData.ua) {
        await editWord({ ...wordData, ...data });
      }
      onClose();
    } catch (error) {
      console.error('Error updating word:', error);
    }
  };

  console.log('Form errors:', errors);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.input}>
          <input
            {...methods.register('ua')}
            placeholder="Ukrainian word"
            className={`${styles.input} ${errors.ua ? styles.error : ''}`}
          />
          {errors.ua && <p className={styles.errorMessage}>{errors.ua.message}</p>}
        </div>
        <div className={styles.input}>
          <input
            {...methods.register('en')}
            placeholder="English word"
            className={`${styles.input} ${errors.en ? styles.error : ''}`}
          />
          {errors.en && <p className={styles.errorMessage}>{errors.en.message}</p>}
        </div>
        <div className={styles.formBtn}>
          <button type="submit" className={`${styles.submitBtn} ${styles.save}`}>
            Save
          </button>
          <button
            type="button"
            className={`${styles.submitBtn} ${styles.cancel}`}
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
