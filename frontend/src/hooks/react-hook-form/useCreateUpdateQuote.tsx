import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { QuoteType } from 'models/quote';

export interface CreateUpdateQuoteFields {
  quote: string;
}

interface Props {
  defaultValues?: QuoteType;
}

export const useCreateUpdateQuoteForm = ({ defaultValues }: Props) => {
  const CreateUpdateQuoteSchema = Yup.object().shape({
    quote: Yup.string().required('Quote is required'),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      quote: '',
      ...defaultValues,
    },
    mode: 'onSubmit',
    resolver: yupResolver(CreateUpdateQuoteSchema),
  });

  return {
    handleSubmit,
    errors,
    control,
  };
};

export type CreateUpdateQuoteForm = ReturnType<typeof useCreateUpdateQuoteForm>;
