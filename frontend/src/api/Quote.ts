import { apiRoutes } from 'constants/apiConstants';
import { CreateUpdateQuoteFields } from 'hooks/react-hook-form/useCreateUpdateQuote';
import { QuoteType } from 'models/quote';

import { apiRequest } from './Api';

export const fetchQuote = async (id: string) =>
  apiRequest<undefined, QuoteType[]>('get', `${apiRoutes.QUOTES_PREFIX}/${id}`);

export const fetchRandQuote = async () =>
  apiRequest<undefined, QuoteType[]>('get', `${apiRoutes.QUOTES_PREFIX}/rand`);

export const fetchQuotes = async (pageNumber: number) =>
  apiRequest<undefined, QuoteType[]>(
    'get',
    `${apiRoutes.QUOTES_PREFIX}?page=${pageNumber}`
  );

export const fetchRecentQuotes = async (pageNumber: number) =>
  apiRequest<undefined, QuoteType[]>(
    'get',
    `${apiRoutes.QUOTES_PREFIX}/recent?page=${pageNumber}`
  );

  export const fetchQuoteCount = async (id: string) =>
  apiRequest<undefined, number>('get', `${apiRoutes.QUOTES_PREFIX}/count/${id}`);


export const createQuote = async (data: CreateUpdateQuoteFields) =>
  apiRequest<CreateUpdateQuoteFields, QuoteType>(
    'post',
    `${apiRoutes.QUOTES_PREFIX}/myquote`,
    data
  );

export const updateQuote = async (data: CreateUpdateQuoteFields, id: string) =>
  apiRequest<CreateUpdateQuoteFields, QuoteType>(
    'patch',
    `${apiRoutes.QUOTES_PREFIX}/myquote/${id}`,
    data
  );

export const upQuote = async (id: string) =>
  apiRequest<string, QuoteType>(
    'patch',
    `${apiRoutes.QUOTES_PREFIX}/${id}/upvote`
  );

export const downQuote = async (id: string) =>
  apiRequest<string, QuoteType>(
    'patch',
    `${apiRoutes.QUOTES_PREFIX}/${id}/downvote`
  );

export const deleteQuote = async (id: string) =>
  apiRequest<string, QuoteType>('delete', `${apiRoutes.QUOTES_PREFIX}/${id}`);
