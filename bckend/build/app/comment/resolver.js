"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = require("../../ clients/db");
const mutations = {
    createComment: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { payload }, ctx) {
        if (!ctx.user) {
            throw new Error("You must be logged in to create a post");
        }
        const date = payload.date ? new Date(payload.date) : new Date();
        const tags = payload.tags ? payload.tags.map((tag) => tag.trim()) : [];
        const tagConnections = yield Promise.all(tags.map((tag) => __awaiter(void 0, void 0, void 0, function* () {
            let existingTag = yield db_1.prismaClient.tag.findUnique({
                where: { title: tag },
            });
            if (!existingTag) {
                existingTag = yield db_1.prismaClient.tag.create({
                    data: { title: tag },
                });
            }
            return { id: existingTag.id };
        })));
        const comment = yield db_1.prismaClient.comment.create({
            data: {
                content: payload.content,
                imageUrl: payload.imageUrl,
                date: date,
                public: payload.public,
                tags: {
                    connect: tagConnections,
                },
                author: {
                    connect: { id: ctx.user.id },
                },
                post: {
                    connect: { id: payload.postid }
                },
            },
        });
        return comment;
    }),
};
const queries = {
    getCommentByPostId: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { id }, ctx) {
        if (!ctx.user) {
            throw new Error("You must be logged in to create a post");
        }
        const comment = yield db_1.prismaClient.comment.findMany({
            where: {
                postId: id
            },
            include: { author: true }
        });
        return comment;
    })
};
exports.resolvers = { mutations, queries };
