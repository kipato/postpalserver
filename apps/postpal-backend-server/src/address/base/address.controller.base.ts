/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { AddressService } from "../address.service";
import { AddressCreateInput } from "./AddressCreateInput";
import { Address } from "./Address";
import { AddressFindManyArgs } from "./AddressFindManyArgs";
import { AddressWhereUniqueInput } from "./AddressWhereUniqueInput";
import { AddressUpdateInput } from "./AddressUpdateInput";
import { UserFindManyArgs } from "../../user/base/UserFindManyArgs";
import { User } from "../../user/base/User";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";

export class AddressControllerBase {
  constructor(protected readonly service: AddressService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Address })
  async createAddress(
    @common.Body() data: AddressCreateInput
  ): Promise<Address> {
    return await this.service.createAddress({
      data: data,
      select: {
        city: true,
        country: true,
        createdAt: true,
        id: true,
        state: true,
        street: true,
        updatedAt: true,
        zipCode: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [Address] })
  @ApiNestedQuery(AddressFindManyArgs)
  async addresses(@common.Req() request: Request): Promise<Address[]> {
    const args = plainToClass(AddressFindManyArgs, request.query);
    return this.service.addresses({
      ...args,
      select: {
        city: true,
        country: true,
        createdAt: true,
        id: true,
        state: true,
        street: true,
        updatedAt: true,
        zipCode: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Address })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async address(
    @common.Param() params: AddressWhereUniqueInput
  ): Promise<Address | null> {
    const result = await this.service.address({
      where: params,
      select: {
        city: true,
        country: true,
        createdAt: true,
        id: true,
        state: true,
        street: true,
        updatedAt: true,
        zipCode: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Address })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async updateAddress(
    @common.Param() params: AddressWhereUniqueInput,
    @common.Body() data: AddressUpdateInput
  ): Promise<Address | null> {
    try {
      return await this.service.updateAddress({
        where: params,
        data: data,
        select: {
          city: true,
          country: true,
          createdAt: true,
          id: true,
          state: true,
          street: true,
          updatedAt: true,
          zipCode: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Address })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async deleteAddress(
    @common.Param() params: AddressWhereUniqueInput
  ): Promise<Address | null> {
    try {
      return await this.service.deleteAddress({
        where: params,
        select: {
          city: true,
          country: true,
          createdAt: true,
          id: true,
          state: true,
          street: true,
          updatedAt: true,
          zipCode: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Get("/:id/users")
  @ApiNestedQuery(UserFindManyArgs)
  async findUsers(
    @common.Req() request: Request,
    @common.Param() params: AddressWhereUniqueInput
  ): Promise<User[]> {
    const query = plainToClass(UserFindManyArgs, request.query);
    const results = await this.service.findUsers(params.id, {
      ...query,
      select: {
        address: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        email: true,
        id: true,
        password: true,
        updatedAt: true,
        username: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/users")
  async connectUsers(
    @common.Param() params: AddressWhereUniqueInput,
    @common.Body() body: UserWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      users: {
        connect: body,
      },
    };
    await this.service.updateAddress({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/users")
  async updateUsers(
    @common.Param() params: AddressWhereUniqueInput,
    @common.Body() body: UserWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      users: {
        set: body,
      },
    };
    await this.service.updateAddress({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/users")
  async disconnectUsers(
    @common.Param() params: AddressWhereUniqueInput,
    @common.Body() body: UserWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      users: {
        disconnect: body,
      },
    };
    await this.service.updateAddress({
      where: params,
      data,
      select: { id: true },
    });
  }
}
