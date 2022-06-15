import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        authorizer: "iam",
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {

      "POST /projects": "functions/create.main",
      "GET /projects/{id}": "functions/get.main",
      "GET /projects": "functions/list.main",
      "PUT /projects/{id}": "functions/update.main",
      "DELETE /projects/{id}": "functions/delete.main",
    },
  });

  // Show the API endpoint in the output

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}