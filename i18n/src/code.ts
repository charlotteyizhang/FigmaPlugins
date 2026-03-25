import {
  handleI18nMessage,
  I18N_MESSAGE_TYPES,
  type I18nMessage,
} from "./i18n";
import { handleReactMessage, type ReactMessage } from "./reactCode";

figma.showUI(__html__, { width: 500, height: 680 });

type Message = I18nMessage | ReactMessage;

figma.ui.onmessage = async (msg: Message) => {
  if (I18N_MESSAGE_TYPES.has(msg.type)) {
    await handleI18nMessage(msg as I18nMessage);
  } else {
    await handleReactMessage(msg as ReactMessage);
  }
};
