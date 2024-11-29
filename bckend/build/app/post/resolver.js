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
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3Client = new client_s3_1.S3Client({
    region: "ap-south-1",
    credentials: { accessKeyId: "AKIASFUIRQYBXL6GGTPH", secretAccessKey: "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" }
});
const queries = {
    getAllPosts: () => db_1.prismaClient.post.findMany({ orderBy: { createdAt: "desc" } }),
    getPostCount: (parent_1, _a, context_1, info_1) => __awaiter(void 0, [parent_1, _a, context_1, info_1], void 0, function* (parent, { username }, context, info) {
        if (username === "lol") {
            return 0;
        }
        return yield db_1.prismaClient.post.count({ where: { author: { username } } });
    }),
    getPostByUsername: (parent_1, _a) => __awaiter(void 0, [parent_1, _a], void 0, function* (parent, { username }) {
        if (username === "lol") {
            return [];
        }
        const post = yield db_1.prismaClient.post.findMany({
            where: {
                author: {
                    username
                }
            }
        });
        return post;
    }),
    getSignedUrlForPostImage: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { imageType, imageName }, ctx) {
        if (!ctx.user || !ctx.user.id) {
            throw new Error("You must be logged in to create a post");
        }
        const allowedImagetype = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
        if (!allowedImagetype.includes(imageType)) {
            throw new Error("Invalid image type");
        }
        const putObjectCommand = new client_s3_1.PutObjectCommand({
            Bucket: 'pearlpost',
            Key: `upload/${ctx.user.id}/post/${imageName}-${Date.now()}.${imageType}}`,
        });
        const signedURL = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, putObjectCommand);
        return signedURL;
    })
};
const mutations = {
    createPost: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { payload }, ctx) {
        if (!ctx.user) {
            throw new Error("You must be logged in to create a post");
        }
        console.log('Received payload:', payload);
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
        const post = yield db_1.prismaClient.post.create({
            data: {
                title: payload.title,
                content: payload.content,
                imageURL: payload.imageUrl,
                tags: {
                    connect: tagConnections,
                },
                author: {
                    connect: {
                        id: ctx.user.id
                    }
                }
            }
        });
        return post;
    }),
};
const authorResolvers = {
    Post: {
        author: (parent) => {
            return db_1.prismaClient.user.findUnique({
                where: {
                    id: parent.authorId
                }
            });
        }
    }
};
exports.resolvers = { mutations, authorResolvers, queries };
