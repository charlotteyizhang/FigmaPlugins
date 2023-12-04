import { createNumberToken } from "../common";
import * as Spacings from "../codebase/spacings";
export const spacingsToVariables = (
  localCollections: Array<VariableCollection>
) => {
  createNumberToken(Spacings.spacing, "spacing", localCollections);
};
