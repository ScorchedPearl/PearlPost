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
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../ clients/db");
const jwt_1 = __importDefault(require("./jwt"));
class UserSevice {
    static verifyGoogleAuthToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const googletoken = token;
            const googleoauthurl = new URL('https://www.googleapis.com/oauth2/v3/userinfo');
            const { data } = yield axios_1.default.get(googleoauthurl.toString(), {
                headers: {
                    Authorization: `Bearer ${googletoken}`,
                },
                responseType: "json"
            });
            const user = yield db_1.prismaClient.user.findUnique({
                where: { email: data.email },
            });
            if (!user) {
                yield db_1.prismaClient.user.create({
                    data: {
                        email: data.email,
                        username: data.name,
                        name: data.given_name,
                        profileImageURL: data.picture,
                    },
                });
            }
            const userInDb = yield db_1.prismaClient.user.findUnique({
                where: { email: data.email },
            });
            if (!userInDb)
                throw Error("User.email not found");
            const session = yield jwt_1.default.generateTokenForUser(userInDb);
            return session;
        });
    }
    static followUser(from, to) {
        return db_1.prismaClient.follows.create({
            data: {
                follower: { connect: { id: from } },
                following: { connect: { id: to } },
            }
        });
    }
    static unfollowUser(from, to) {
        return db_1.prismaClient.follows.delete({
            where: {
                followerid_followingid: {
                    followerid: from,
                    followingid: to,
                }
            }
        });
    }
    static likePost(user, post) {
        return db_1.prismaClient.like.create({
            data: {
                user: { connect: { id: user } },
                post: { connect: { id: post } },
            }
        });
    }
    static UnlikePost(user, post) {
        return db_1.prismaClient.like.delete({
            where: {
                unique_user_post_like: {
                    userId: user,
                    postId: post,
                }
            }
        });
    }
}
exports.default = UserSevice;
