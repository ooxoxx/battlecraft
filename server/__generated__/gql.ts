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
    "\n  query characterRanking(\n    $id: Int = 12660\n    $className: String!\n    $specName: String!\n  ) {\n    worldData {\n      encounter(id: $id) {\n        name\n        characterRankings(\n          page: 1\n          className: $className\n          specName: $specName\n          metric: playerscore\n          leaderboard: LogsOnly\n        )\n      }\n    }\n  }\n": types.CharacterRankingDocument,
    "\n  query ReportSummary($code: String!, $fight: Int!) {\n    reportData {\n      report(code: $code) {\n        fights(fightIDs: [$fight]) {\n          id\n          encounterID\n        }\n        code\n        table(fightIDs: [$fight], dataType: Summary)\n      }\n    }\n}": types.ReportSummaryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query characterRanking(\n    $id: Int = 12660\n    $className: String!\n    $specName: String!\n  ) {\n    worldData {\n      encounter(id: $id) {\n        name\n        characterRankings(\n          page: 1\n          className: $className\n          specName: $specName\n          metric: playerscore\n          leaderboard: LogsOnly\n        )\n      }\n    }\n  }\n"): (typeof documents)["\n  query characterRanking(\n    $id: Int = 12660\n    $className: String!\n    $specName: String!\n  ) {\n    worldData {\n      encounter(id: $id) {\n        name\n        characterRankings(\n          page: 1\n          className: $className\n          specName: $specName\n          metric: playerscore\n          leaderboard: LogsOnly\n        )\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ReportSummary($code: String!, $fight: Int!) {\n    reportData {\n      report(code: $code) {\n        fights(fightIDs: [$fight]) {\n          id\n          encounterID\n        }\n        code\n        table(fightIDs: [$fight], dataType: Summary)\n      }\n    }\n}"): (typeof documents)["\n  query ReportSummary($code: String!, $fight: Int!) {\n    reportData {\n      report(code: $code) {\n        fights(fightIDs: [$fight]) {\n          id\n          encounterID\n        }\n        code\n        table(fightIDs: [$fight], dataType: Summary)\n      }\n    }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;