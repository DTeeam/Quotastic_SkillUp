import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'entities/user.entity';
import {
  PaginatedResult,
  PaginatedResultRecent,
  PaginatedResultUpvoted,
} from 'interfaces/paginated-result.interface';
import Logging from 'library/Logging';
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
  ): Promise<PaginatedResultUpvoted> {
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
