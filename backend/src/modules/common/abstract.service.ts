import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Quote } from 'entities/quote.entity';
import { User } from 'entities/user.entity';
import { Vote } from 'entities/vote.entity';
import {
  PaginatedResult,
  PaginatedResultLiked,
  PaginatedResultRecent,
} from 'interfaces/paginated-result.interface';
import Logging from 'library/Logging';
import { SelectQueryBuilder } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class AbstractService {
  constructor(protected readonly repository: Repository<any>) {}

  async findAll(relations: []): Promise<any> {
    try {
      return this.repository.find({ relations });
    } catch (error) {
      Logging.error(error);
      throw new InternalServerErrorException(
        'Something went wrong while searching for elements',
      );
    }
  }

  async findBy(condition, relations = []): Promise<any> {
    try {
      return this.repository.findOne({
        where: condition,
        relations,
      });
    } catch (error) {
      Logging.error(error);
      throw new InternalServerErrorException(
        'Element search with condition failed :O',
      );
    }
  }

  async findById(id: string, relations = []): Promise<any> {
    try {
      const element = await this.repository.findOne({
        where: { id },
        relations,
      });

      if (!element) {
        throw new BadRequestException(`Cannot find element with id: ${id}`);
      }
      return element;
    } catch (error) {
      Logging.error(error);
      throw new InternalServerErrorException(
        'Element search with id failed :O',
      );
    }
  }
  async findRand(): Promise<any> {
    try {
      const [quote, totalCount] = await this.repository.query(
        `SELECT q.*, u.* FROM "quote" q INNER JOIN "user" u ON q.user_id = u.id ORDER BY RANDOM() LIMIT 1`,
      );

      if (totalCount === 0) {
        throw new BadRequestException('No quotes found');
      }

      return quote;
    } catch (error) {
      Logging.error(error);
      throw new InternalServerErrorException(
        'Failed to retrieve a random quote',
      );
    }
  }

  async remove(id: string): Promise<any> {
    const element = await this.findById(id);
    try {
      return this.repository.remove(element);
    } catch (error) {
      Logging.error(error);
      throw new InternalServerErrorException(
        "Element wasn't deleted successfully",
      );
    }
  }

  async paginate(page = 1, relations = []): Promise<PaginatedResult> {
    const take = 12;
    try {
      const [data, total] = await this.repository.findAndCount({
        take,
        skip: (page - 1) * take,
        relations: ['user', ...relations],
        order: { votes: 'DESC' },
      });

      const quotesWithUser = data.map((quote) => {
        const { user, ...quoteData } = quote;
        return {
          ...quoteData,
          user: user as User,
        };
      });
      return {
        data: quotesWithUser,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / take),
        },
      };
    } catch (error) {
      Logging.error(error);
      throw new InternalServerErrorException(
        'Paginated search result unsuccessful',
      );
    }
  }

  async paginateRecent(
    page = 1,
    relations = [],
  ): Promise<PaginatedResultRecent> {
    const take = 12;
    try {
      const [data, total] = await this.repository.findAndCount({
        take,
        skip: (page - 1) * take,
        relations: ['user', ...relations],
        order: { created_at: 'DESC' },
      });

      const quotesWithUser = data.map((quote) => {
        const { user, ...quoteData } = quote;
        return {
          ...quoteData,
          user: user as User,
        };
      });
      return {
        data: quotesWithUser,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / take),
        },
      };
    } catch (error) {
      Logging.error(error);
      throw new InternalServerErrorException(
        'Paginated search result unsuccessful',
      );
    }
  }

  async paginateProfileUpvoted(
    userId: string,
    page = 1,
    relations = [],
  ): Promise<PaginatedResult> {
    const take = 4;
    try {
      const [data, total] = await this.repository.findAndCount({
        take,
        skip: (page - 1) * take,
        where: { user: { id: userId } },
        relations: ['user', ...relations],
        order: { votes: 'DESC' },
      });

      const quotesWithUser = data.map((quote) => {
        const { user, ...quoteData } = quote;
        return {
          ...quoteData,
          user: user as User,
        };
      });
      return {
        data: quotesWithUser,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / take),
        },
      };
    } catch (error) {
      Logging.error(error);
      throw new InternalServerErrorException(
        'Paginated search result unsuccessful',
      );
    }
  }

  async paginateProfileRecent(
    userId: string,
    page = 1,
    relations = [],
  ): Promise<PaginatedResultRecent> {
    const take = 4;
    try {
      const [data, total] = await this.repository.findAndCount({
        take,
        skip: (page - 1) * take,
        where: { user: { id: userId } },
        relations: ['user', ...relations],
        order: { created_at: 'DESC' },
      });

      const quotesWithUser = data.map((quote) => {
        const { user, ...quoteData } = quote;
        return {
          ...quoteData,
          user: user as User,
        };
      });
      console.log(quotesWithUser);

      return {
        data: quotesWithUser,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / take),
        },
      };
    } catch (error) {
      Logging.error(error);
      throw new InternalServerErrorException(
        'Paginated search result unsuccessful',
      );
    }
  }

  // Assuming you have defined your entities and repository classes

  async paginateProfileLiked(
    userId: string,
    page: number,
  ): Promise<PaginatedResultLiked[]> {
    const take = 4;
    const skippedItems = (page - 1) * take;

    const queryBuilder = this.repository.createQueryBuilder('quote');
    queryBuilder.select('quote', 'quote');
    queryBuilder.addSelect('user', 'user');
    queryBuilder.innerJoin(Vote, 'vote', 'quote.id = vote.quote_id');
    queryBuilder.innerJoin(User, 'user', 'user.id = vote.user_id');
    queryBuilder.where('vote.decision = :decision', { decision: 1 });
    queryBuilder.andWhere('vote.user_id = :userId', { userId });
    queryBuilder.skip(skippedItems);
    queryBuilder.take(take);
    //console.log(await queryBuilder.getRawMany());
    const results = await queryBuilder.getRawMany();

    const transformedResults = results.map((result: any) => {
      return {
        id: result.quote_id,
        created_at: result.quote_created_at,
        updated_at: result.quote_updated_at,
        quote: result.quote_quote,
        votes: result.quote_votes,
        user: {
          id: result.user_id,
          created_at: result.user_created_at,
          updated_at: result.user_updated_at,
          email: result.user_email,
          first_name: result.user_first_name,
          last_name: result.user_last_name,
          avatar: result.user_avatar,
          password: result.user_password,
        },
      };
    });
    console.log(transformedResults);
    //TODO query ne dela, napiš novga s tem:
    //IZPIši vse quote, ki jih je lajku user tim. poleg quota izpiši tudi userja ki je uploadu quote
    return results;
  }

  /*
  async paginateProfileLiked(
    userId: string,
    page = 1,
    relations = [],
  ): Promise<PaginatedResultLiked> {
    const take = 4;
    try {
      const [data, total] = await this.repository.query(`
      SELECT q.id as qid, q.* as quote, u.* as user
      FROM "quote" q
      INNER JOIN "vote" v ON q.id = v.quote_id
      INNER JOIN "user" u ON u.id = v.user_id
      WHERE v.decision = 1
      AND v.user_id = '${userId}'
      `);

      const quote = {
        id: data.qid as string,
        quote: data.quote as string,
        votes: data.votes as number,
        user_id: data.user_id as string,
      };
      const user2 = data.user;
      console.log(user2);

      const user = {
        id: data.id as string,
        first_name: data.first_name as string,
        last_name: data.last_name as string,
        avatar: data.avatar as string,
      };

      const quotesWithUser = {
        quote,
        user,
      };

      console.log(quotesWithUser);
      return {
        data: quote,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / take),
        },
      };
    } catch (error) {
      Logging.error(error);
      throw new InternalServerErrorException(
        'Paginated search result unsuccessful',
      );
    }
  }
*/
  async CountQuotesByUserId(userId: string, relations = []): Promise<number> {
    try {
      const quotesCount = await this.repository.count({
        where: { user: { id: userId } },
        relations: ['user', ...relations],
      });

      return quotesCount;
    } catch (error) {
      Logging.error(error);
      throw new InternalServerErrorException('Failed to count quotes');
    }
  }

  async CountUserVotes(userId: string): Promise<any> {
    try {
      const query = `
        SELECT SUM(q.votes)
        FROM quote q
        INNER JOIN "user" u ON q.user_id = u.id
        WHERE u.id = $1;
      `;

      const [totalVotes] = await this.repository.query(query, [userId]);

      return totalVotes;
    } catch (error) {
      Logging.error(error);
      throw new InternalServerErrorException('Failed to count karma');
    }
  }
}
