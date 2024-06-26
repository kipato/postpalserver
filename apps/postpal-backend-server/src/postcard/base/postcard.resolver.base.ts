/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { Postcard } from "./Postcard";
import { PostcardCountArgs } from "./PostcardCountArgs";
import { PostcardFindManyArgs } from "./PostcardFindManyArgs";
import { PostcardFindUniqueArgs } from "./PostcardFindUniqueArgs";
import { CreatePostcardArgs } from "./CreatePostcardArgs";
import { UpdatePostcardArgs } from "./UpdatePostcardArgs";
import { DeletePostcardArgs } from "./DeletePostcardArgs";
import { PostcardService } from "../postcard.service";
@graphql.Resolver(() => Postcard)
export class PostcardResolverBase {
  constructor(protected readonly service: PostcardService) {}

  async _postcardsMeta(
    @graphql.Args() args: PostcardCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @graphql.Query(() => [Postcard])
  async postcards(
    @graphql.Args() args: PostcardFindManyArgs
  ): Promise<Postcard[]> {
    return this.service.postcards(args);
  }

  @graphql.Query(() => Postcard, { nullable: true })
  async postcard(
    @graphql.Args() args: PostcardFindUniqueArgs
  ): Promise<Postcard | null> {
    const result = await this.service.postcard(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => Postcard)
  async createPostcard(
    @graphql.Args() args: CreatePostcardArgs
  ): Promise<Postcard> {
    return await this.service.createPostcard({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Postcard)
  async updatePostcard(
    @graphql.Args() args: UpdatePostcardArgs
  ): Promise<Postcard | null> {
    try {
      return await this.service.updatePostcard({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Postcard)
  async deletePostcard(
    @graphql.Args() args: DeletePostcardArgs
  ): Promise<Postcard | null> {
    try {
      return await this.service.deletePostcard(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
