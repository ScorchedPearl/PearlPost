"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const types_1 = require("./types");
const query_1 = require("./query");
const mutation_1 = require("./mutation");
const resolver_1 = require("./resolver");
exports.User = { types: types_1.types, query: query_1.query, resolvers: resolver_1.resolvers, mutations: mutation_1.mutations };
