import { DiscoveryServiceExternal } from "./DiscoveryServiceExternal";
import { ExtendedGroupEndpoints } from "../../../../../cdk-ts-common/types";
import { App } from "../../../../../cdk-ts-common/deployment/node_modules/aws-cdk-lib";
import * as fs from "fs";
export const extendedGroupEndpoints: ExtendedGroupEndpoints = JSON.parse(fs.readFileSync("../2_CodeProducer/outputs/discoveryService/inputs/inputs.json", "utf-8"));

const app = new App();

export function main() {
  for (const [deploymentGroup, deploymentGroupObj] of Object.entries(extendedGroupEndpoints)) {
    const gatewayName = Object.keys(deploymentGroupObj)[0];
    const { stage } = deploymentGroupObj[gatewayName];
    const discoveryServiceExternal = new DiscoveryServiceExternal(app, `${deploymentGroup}-${stage}`, deploymentGroupObj);
    discoveryServiceExternal.doDeployment();
  }
}
