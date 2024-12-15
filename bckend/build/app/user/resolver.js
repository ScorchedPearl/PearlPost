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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = require("../../ clients/db");
const userservice_1 = __importDefault(require("../../services/userservice"));
const queries = {
    verifyGoogleToken: (parent_1, _a) => __awaiter(void 0, [parent_1, _a], void 0, function* (parent, { token }) {
        const session = yield userservice_1.default.verifyGoogleAuthToken(token);
        return session;
    }),
    getCurrentUser: (parent, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const id = (_a = ctx.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!id)
            return null;
        const user = yield db_1.prismaClient.user.findUnique({ where: { id }, include: {
                likes: {
                    include: {
                        user: true,
                    },
                },
            }, });
        console.log(user);
        return user;
    }),
    getUserInfoById: (parent_1, _a) => __awaiter(void 0, [parent_1, _a], void 0, function* (parent, { id }) {
        if (!id)
            return null;
        const user = yield db_1.prismaClient.user.findUnique({ where: { id } });
        return user;
    })
};
const PostResolvers = {
    User: {
        posts: (parent) => {
            return db_1.prismaClient.post.findMany({ where: { authorId: parent.id } });
        },
        followers: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield db_1.prismaClient.follows.findMany({
                where: { following: { id: parent.id } },
                include: {
                    follower: true,
                    following: true,
                }
            });
            return result.map(el => el.follower);
        }),
        following: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield db_1.prismaClient.follows.findMany({
                where: { follower: { id: parent.id } },
                include: {
                    follower: true,
                    following: true,
                }
            });
            return result.map(el => el.following);
        })
    }
};
const mutations = {
    followUser: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { to }, ctx) {
        if (!ctx.user || !ctx.user.id)
            throw new Error("User not authenticated");
        yield userservice_1.default.followUser(ctx.user.id, to);
        return true;
    }),
    unfollowUser: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { to }, ctx) {
        if (!ctx.user || !ctx.user.id)
            throw new Error("User not authenticated");
        yield userservice_1.default.unfollowUser(ctx.user.id, to);
        return true;
    }),
    likePost: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { id }, ctx) {
        if (!ctx.user || !ctx.user.id)
            throw new Error("User not authenticated");
        yield userservice_1.default.likePost(ctx.user.id, id);
        return true;
    }),
    unlikePost: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { id }, ctx) {
        if (!ctx.user || !ctx.user.id)
            throw new Error("User not authenticated");
        yield userservice_1.default.UnlikePost(ctx.user.id, id);
        return true;
    })
};
exports.resolvers = { queries, PostResolvers, mutations };
