import * as Border from "../codebase/border";
import { createNumberToken } from "../common";
export const borderToVariables = (
  localCollections: Array<VariableCollection>
) => {
  createNumberToken(Border.borderRadius, "borderRadius", localCollections);
  createNumberToken(Border.borderWidth, "borderWidth", localCollections);
};
