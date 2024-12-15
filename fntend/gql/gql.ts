/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "#graphql\n  mutation CreateComment($payload: CreateCommentData!) {\n    createComment(payload: $payload) {\n      id\n    }\n}\n": types.CreateCommentDocument,
    "#graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n}\n": types.CreatePostDocument,
    "#graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowUserDocument,
    "#graphql\n  mutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n": types.UnfollowUserDocument,
    "#graphql\n  mutation LikePost($likePostId: ID!) {\n    likePost(id: $likePostId)\n  }\n": types.LikePostDocument,
    "#graphql\n  mutation UnlikePost($unlikePostId: ID!) {\n    unlikePost(id: $unlikePostId)\n  }\n": types.UnlikePostDocument,
    "#graphql\n  query GetCommentByPostId($getCommentByPostIdId: ID!) {\n    getCommentByPostId(id: $getCommentByPostIdId) {\n        content\n        date\n        imageUrl\n        author {\n            username\n            name\n            profileImageURL\n        }\n    }\n  }\n": types.GetCommentByPostIdDocument,
    "#graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      content\n      title\n      imageURL\n      createdAt\n      updatedAt\n      likes {\n        postId\n        userId\n        createdAt\n      }\n      author {\n        name\n        profileImageURL\n        username\n        id\n      }\n    }\n  }\n": types.GetAllPostsDocument,
    "#graphql\n  query GetPostCount($username: String!) {\n    getPostCount(username: $username)\n  }\n": types.GetPostCountDocument,
    "#graphql\n  query GetPostsByUsername($username: String!) {\n    getPostByUsername(username: $username) {\n      id\n      content\n      title\n      imageURL\n      author {\n        name\n        profileImageURL\n      }\n    }\n  }\n": types.GetPostsByUsernameDocument,
    "#graphql\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n  getSignedUrlForPostImage(imageName: $imageName, imageType: $imageType)\n}\n": types.GetSignedUrlDocument,
    "#graphql\n  query VerifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n": types.VerifyUserGoogleTokenDocument,
    "#graphql\n  query GetCurrentUser {\n    getCurrentUser {\n    id\n    email\n    name\n    username\n    recommendedUsers {\n      id\n      username\n      profileImageURL\n      name\n    }\n    followers {\n      name\n      profileImageURL\n      username\n    }\n    likes {\n      createdAt\n      userId\n      postId\n    }\n    following {\n      name\n      profileImageURL\n      username\n    }\n    profileImageURL\n    posts {\n      content\n      imageURL\n      title\n    }\n    }\n  }\n": types.GetCurrentUserDocument,
    "#graphql¸\n  query GetUserInfoById($getUserInfoByIdId: ID!) {\n  getUserInfoById(id: $getUserInfoByIdId) {\n    posts {\n      content\n      imageURL\n      title\n      id\n    }\n    followers {\n      name\n      profileImageURL\n      username\n    }\n    following {\n      name\n      profileImageURL\n      username\n    }\n    email\n    id\n    name\n    username\n    profileImageURL\n  }\n}\n": types.GetUserInfoByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation CreateComment($payload: CreateCommentData!) {\n    createComment(payload: $payload) {\n      id\n    }\n}\n"): (typeof documents)["#graphql\n  mutation CreateComment($payload: CreateCommentData!) {\n    createComment(payload: $payload) {\n      id\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n}\n"): (typeof documents)["#graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["#graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n"): (typeof documents)["#graphql\n  mutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation LikePost($likePostId: ID!) {\n    likePost(id: $likePostId)\n  }\n"): (typeof documents)["#graphql\n  mutation LikePost($likePostId: ID!) {\n    likePost(id: $likePostId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation UnlikePost($unlikePostId: ID!) {\n    unlikePost(id: $unlikePostId)\n  }\n"): (typeof documents)["#graphql\n  mutation UnlikePost($unlikePostId: ID!) {\n    unlikePost(id: $unlikePostId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetCommentByPostId($getCommentByPostIdId: ID!) {\n    getCommentByPostId(id: $getCommentByPostIdId) {\n        content\n        date\n        imageUrl\n        author {\n            username\n            name\n            profileImageURL\n        }\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetCommentByPostId($getCommentByPostIdId: ID!) {\n    getCommentByPostId(id: $getCommentByPostIdId) {\n        content\n        date\n        imageUrl\n        author {\n            username\n            name\n            profileImageURL\n        }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      content\n      title\n      imageURL\n      createdAt\n      updatedAt\n      likes {\n        postId\n        userId\n        createdAt\n      }\n      author {\n        name\n        profileImageURL\n        username\n        id\n      }\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      content\n      title\n      imageURL\n      createdAt\n      updatedAt\n      likes {\n        postId\n        userId\n        createdAt\n      }\n      author {\n        name\n        profileImageURL\n        username\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetPostCount($username: String!) {\n    getPostCount(username: $username)\n  }\n"): (typeof documents)["#graphql\n  query GetPostCount($username: String!) {\n    getPostCount(username: $username)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetPostsByUsername($username: String!) {\n    getPostByUsername(username: $username) {\n      id\n      content\n      title\n      imageURL\n      author {\n        name\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetPostsByUsername($username: String!) {\n    getPostByUsername(username: $username) {\n      id\n      content\n      title\n      imageURL\n      author {\n        name\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n  getSignedUrlForPostImage(imageName: $imageName, imageType: $imageType)\n}\n"): (typeof documents)["#graphql\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n  getSignedUrlForPostImage(imageName: $imageName, imageType: $imageType)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query VerifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"): (typeof documents)["#graphql\n  query VerifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetCurrentUser {\n    getCurrentUser {\n    id\n    email\n    name\n    username\n    recommendedUsers {\n      id\n      username\n      profileImageURL\n      name\n    }\n    followers {\n      name\n      profileImageURL\n      username\n    }\n    likes {\n      createdAt\n      userId\n      postId\n    }\n    following {\n      name\n      profileImageURL\n      username\n    }\n    profileImageURL\n    posts {\n      content\n      imageURL\n      title\n    }\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetCurrentUser {\n    getCurrentUser {\n    id\n    email\n    name\n    username\n    recommendedUsers {\n      id\n      username\n      profileImageURL\n      name\n    }\n    followers {\n      name\n      profileImageURL\n      username\n    }\n    likes {\n      createdAt\n      userId\n      postId\n    }\n    following {\n      name\n      profileImageURL\n      username\n    }\n    profileImageURL\n    posts {\n      content\n      imageURL\n      title\n    }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql¸\n  query GetUserInfoById($getUserInfoByIdId: ID!) {\n  getUserInfoById(id: $getUserInfoByIdId) {\n    posts {\n      content\n      imageURL\n      title\n      id\n    }\n    followers {\n      name\n      profileImageURL\n      username\n    }\n    following {\n      name\n      profileImageURL\n      username\n    }\n    email\n    id\n    name\n    username\n    profileImageURL\n  }\n}\n"): (typeof documents)["#graphql¸\n  query GetUserInfoById($getUserInfoByIdId: ID!) {\n  getUserInfoById(id: $getUserInfoByIdId) {\n    posts {\n      content\n      imageURL\n      title\n      id\n    }\n    followers {\n      name\n      profileImageURL\n      username\n    }\n    following {\n      name\n      profileImageURL\n      username\n    }\n    email\n    id\n    name\n    username\n    profileImageURL\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;